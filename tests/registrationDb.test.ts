import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('aws-amplify/auth', () => ({
	fetchAuthSession: vi.fn(async () => ({
		credentials: { accessKeyId: 'test-key', secretAccessKey: 'test-secret' },
		identityId: 'user-123'
	}))
}));

import {
	adminGetRegistrationSummaries,
	getFullRegistration,
	getHousehold,
	saveHousehold,
	updateRegistrationStatus
} from '$lib/services/registrationDb';

const ddbMock = mockClient(DynamoDBDocumentClient);

const HOUSEHOLD_INPUT = {
	email: 'test@example.com',
	headFirstName: 'Alice',
	headLastName: 'Example',
	phone: '021 000 0000',
	city: 'Auckland'
};

beforeEach(() => {
	ddbMock.reset();
});

describe('saveHousehold', () => {
	it('creates a draft household with matching createdAt/updatedAt when none exists', async () => {
		ddbMock.on(GetCommand).resolves({});
		ddbMock.on(PutCommand).resolves({});

		const household = await saveHousehold(HOUSEHOLD_INPUT as never);

		expect(household.userId).toBe('user-123');
		expect(household.sk).toBe('HOUSEHOLD');
		expect(household.status).toBe('draft');
		expect(household.createdAt).toBe(household.updatedAt);

		const put = ddbMock.commandCalls(PutCommand)[0].args[0].input;
		expect(put.Item).toMatchObject({ userId: 'user-123', sk: 'HOUSEHOLD', status: 'draft' });
	});

	it('preserves status, createdAt, and submittedAt of an existing record', async () => {
		ddbMock.on(GetCommand).resolves({
			Item: {
				userId: 'user-123',
				sk: 'HOUSEHOLD',
				status: 'submitted',
				createdAt: '2026-01-01T00:00:00.000Z',
				submittedAt: '2026-02-01T00:00:00.000Z'
			}
		});
		ddbMock.on(PutCommand).resolves({});

		const household = await saveHousehold(HOUSEHOLD_INPUT as never);

		expect(household.status).toBe('submitted');
		expect(household.createdAt).toBe('2026-01-01T00:00:00.000Z');
		expect(household.submittedAt).toBe('2026-02-01T00:00:00.000Z');
		expect(household.updatedAt).not.toBe(household.createdAt);
	});
});

describe('getHousehold', () => {
	it('returns null when no record exists', async () => {
		ddbMock.on(GetCommand).resolves({});

		expect(await getHousehold()).toBeNull();
	});
});

describe('updateRegistrationStatus', () => {
	it('stamps submittedAt only when submitting', async () => {
		ddbMock.on(UpdateCommand).resolves({});

		await updateRegistrationStatus('submitted' as never);
		const submitted = ddbMock.commandCalls(UpdateCommand)[0].args[0].input;
		expect(submitted.UpdateExpression).toContain('#submittedAt');

		ddbMock.reset();
		ddbMock.on(UpdateCommand).resolves({});

		await updateRegistrationStatus('draft' as never);
		const draft = ddbMock.commandCalls(UpdateCommand)[0].args[0].input;
		expect(draft.UpdateExpression).not.toContain('#submittedAt');
	});
});

describe('getFullRegistration', () => {
	it('groups household, members, and volunteer records', async () => {
		ddbMock.on(QueryCommand).resolves({
			Items: [
				{ userId: 'user-123', sk: 'HOUSEHOLD', email: 'test@example.com' },
				{ userId: 'user-123', sk: 'MEMBER#1', firstName: 'Kid', isChild: true },
				{ userId: 'user-123', sk: 'MEMBER#2', firstName: 'Spouse', isChild: false },
				{ userId: 'user-123', sk: 'VOLUNTEER', interestedInChoir: true }
			]
		});

		const full = await getFullRegistration();

		expect(full).not.toBeNull();
		expect(full?.household.sk).toBe('HOUSEHOLD');
		expect(full?.members).toHaveLength(2);
		expect(full?.volunteer).toMatchObject({ sk: 'VOLUNTEER' });
	});

	it('returns null when the user has no household record', async () => {
		ddbMock.on(QueryCommand).resolves({ Items: [{ userId: 'user-123', sk: 'MEMBER#1' }] });

		expect(await getFullRegistration()).toBeNull();
	});
});

describe('adminGetRegistrationSummaries', () => {
	it('aggregates member counts and volunteer roles per household', async () => {
		ddbMock
			.on(ScanCommand, {
				FilterExpression: 'sk = :sk',
				ExpressionAttributeValues: { ':sk': 'HOUSEHOLD' }
			} as never)
			.resolves({
				Items: [
					{
						userId: 'user-123',
						sk: 'HOUSEHOLD',
						email: 'test@example.com',
						headFirstName: 'Alice',
						headLastName: 'Example',
						phone: '021 000 0000',
						city: 'Auckland',
						status: 'submitted',
						submittedAt: '2026-02-01T00:00:00.000Z'
					}
				]
			});
		ddbMock
			.on(ScanCommand, {
				FilterExpression: 'begins_with(sk, :prefix)',
				ExpressionAttributeValues: { ':prefix': 'MEMBER#' }
			} as never)
			.resolves({
				Items: [
					{ userId: 'user-123', sk: 'MEMBER#1', isChild: true },
					{ userId: 'user-123', sk: 'MEMBER#2', isChild: false }
				]
			});
		ddbMock
			.on(ScanCommand, {
				FilterExpression: 'sk = :sk',
				ExpressionAttributeValues: { ':sk': 'VOLUNTEER' }
			} as never)
			.resolves({
				Items: [
					{
						userId: 'user-123',
						sk: 'VOLUNTEER',
						interestedInChoir: true,
						voicePart: 'Tenor',
						interestedInUsher: true
					}
				]
			});

		const summaries = await adminGetRegistrationSummaries();

		expect(summaries).toHaveLength(1);
		expect(summaries[0]).toMatchObject({
			userId: 'user-123',
			headName: 'Alice Example',
			totalMembers: 3,
			adultCount: 2,
			childCount: 1,
			status: 'submitted'
		});
		expect(summaries[0].volunteerRoles).toEqual(['Choir (Tenor)', 'Usher']);
	});
});
