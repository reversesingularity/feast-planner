/**
 * Registration Database Service — COGWA NZ Feast of Tabernacles
 *
 * Single-table DynamoDB design:
 *   PK: userId  |  SK: "HOUSEHOLD"       → Household record
 *   PK: userId  |  SK: "MEMBER#uuid"     → Family member
 *   PK: userId  |  SK: "VOLUNTEER"       → Volunteer preferences
 *
 * Uses the same Amplify credential pattern as tripDb.ts
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
	DynamoDBDocumentClient,
	PutCommand,
	GetCommand,
	QueryCommand,
	UpdateCommand,
	DeleteCommand,
	ScanCommand,
	type PutCommandInput,
	type GetCommandInput,
	type QueryCommandInput,
	type UpdateCommandInput,
	type DeleteCommandInput,
	type ScanCommandInput
} from '@aws-sdk/lib-dynamodb';
import { fetchAuthSession } from 'aws-amplify/auth';
import type {
	Household,
	FamilyMember,
	VolunteerPreferences,
	CreateHouseholdInput,
	CreateFamilyMemberInput,
	CreateVolunteerInput,
	RegistrationStatus,
	FullRegistration,
	RegistrationSummary
} from '$lib/types/registration';

// ─── Config ──────────────────────────────────────────────────────────────────

const REGION = import.meta.env.VITE_AWS_REGION || 'ap-southeast-2';
const TABLE_NAME = import.meta.env.VITE_REGISTRATION_TABLE_NAME || 'feast-registration-nz';

// ─── DynamoDB Client ─────────────────────────────────────────────────────────

async function getClient(): Promise<DynamoDBDocumentClient> {
	const session = await fetchAuthSession();
	if (!session.credentials) throw new Error('No AWS credentials. Please sign in.');

	const raw = new DynamoDBClient({
		region: REGION,
		credentials: session.credentials
	});

	return DynamoDBDocumentClient.from(raw, {
		marshallOptions: { removeUndefinedValues: true, convertEmptyValues: false }
	});
}

async function getUserId(): Promise<string> {
	const session = await fetchAuthSession();
	if (!session.identityId) throw new Error('Unable to identify user. Please sign in again.');
	return session.identityId;
}

// ─── Household ───────────────────────────────────────────────────────────────

export async function saveHousehold(input: CreateHouseholdInput): Promise<Household> {
	const client = await getClient();
	const userId = await getUserId();
	const now = new Date().toISOString();

	// Check for existing record to preserve createdAt
	const existing = await getHousehold();

	const household: Household = {
		userId,
		sk: 'HOUSEHOLD',
		...input,
		status: existing?.status ?? 'draft',
		submittedAt: existing?.submittedAt,
		createdAt: existing?.createdAt ?? now,
		updatedAt: now
	};

	await client.send(new PutCommand({ TableName: TABLE_NAME, Item: household }));
	return household;
}

export async function getHousehold(): Promise<Household | null> {
	const client = await getClient();
	const userId = await getUserId();

	const result = await client.send(new GetCommand({
		TableName: TABLE_NAME,
		Key: { userId, sk: 'HOUSEHOLD' }
	}));

	return (result.Item as Household) ?? null;
}

export async function updateRegistrationStatus(status: RegistrationStatus): Promise<void> {
	const client = await getClient();
	const userId = await getUserId();
	const now = new Date().toISOString();

	await client.send(new UpdateCommand({
		TableName: TABLE_NAME,
		Key: { userId, sk: 'HOUSEHOLD' },
		UpdateExpression: 'SET #status = :status, #updatedAt = :now' +
			(status === 'submitted' ? ', #submittedAt = :now' : ''),
		ExpressionAttributeNames: {
			'#status': 'status',
			'#updatedAt': 'updatedAt',
			...(status === 'submitted' ? { '#submittedAt': 'submittedAt' } : {})
		},
		ExpressionAttributeValues: { ':status': status, ':now': now }
	}));
}

// ─── Family Members ───────────────────────────────────────────────────────────

export async function addFamilyMember(input: CreateFamilyMemberInput): Promise<FamilyMember> {
	const client = await getClient();
	const userId = await getUserId();
	const memberId = crypto.randomUUID();
	const now = new Date().toISOString();

	const member: FamilyMember = {
		userId,
		sk: `MEMBER#${memberId}`,
		memberId,
		...input,
		createdAt: now,
		updatedAt: now
	};

	await client.send(new PutCommand({ TableName: TABLE_NAME, Item: member }));
	return member;
}

export async function updateFamilyMember(
	memberId: string,
	input: Partial<CreateFamilyMemberInput>
): Promise<void> {
	const client = await getClient();
	const userId = await getUserId();
	const now = new Date().toISOString();

	const entries = Object.entries(input).filter(([, v]) => v !== undefined);
	if (!entries.length) return;

	const names: Record<string, string> = { '#updatedAt': 'updatedAt' };
	const vals: Record<string, unknown> = { ':now': now };
	const parts = ['#updatedAt = :now'];

	for (const [k, v] of entries) {
		names[`#${k}`] = k;
		vals[`:${k}`] = v;
		parts.push(`#${k} = :${k}`);
	}

	await client.send(new UpdateCommand({
		TableName: TABLE_NAME,
		Key: { userId, sk: `MEMBER#${memberId}` },
		UpdateExpression: `SET ${parts.join(', ')}`,
		ExpressionAttributeNames: names,
		ExpressionAttributeValues: vals
	}));
}

export async function deleteFamilyMember(memberId: string): Promise<void> {
	const client = await getClient();
	const userId = await getUserId();

	await client.send(new DeleteCommand({
		TableName: TABLE_NAME,
		Key: { userId, sk: `MEMBER#${memberId}` }
	}));
}

export async function getFamilyMembers(): Promise<FamilyMember[]> {
	const client = await getClient();
	const userId = await getUserId();

	const result = await client.send(new QueryCommand({
		TableName: TABLE_NAME,
		KeyConditionExpression: 'userId = :uid AND begins_with(sk, :prefix)',
		ExpressionAttributeValues: { ':uid': userId, ':prefix': 'MEMBER#' }
	}));

	return (result.Items ?? []) as FamilyMember[];
}

// ─── Volunteer Preferences ────────────────────────────────────────────────────

export async function saveVolunteerPreferences(input: CreateVolunteerInput): Promise<VolunteerPreferences> {
	const client = await getClient();
	const userId = await getUserId();
	const now = new Date().toISOString();

	const existing = await getVolunteerPreferences();

	const volunteer: VolunteerPreferences = {
		userId,
		sk: 'VOLUNTEER',
		...input,
		createdAt: existing?.createdAt ?? now,
		updatedAt: now
	};

	await client.send(new PutCommand({ TableName: TABLE_NAME, Item: volunteer }));
	return volunteer;
}

export async function getVolunteerPreferences(): Promise<VolunteerPreferences | null> {
	const client = await getClient();
	const userId = await getUserId();

	const result = await client.send(new GetCommand({
		TableName: TABLE_NAME,
		Key: { userId, sk: 'VOLUNTEER' }
	}));

	return (result.Item as VolunteerPreferences) ?? null;
}

// ─── Full Registration ────────────────────────────────────────────────────────

export async function getFullRegistration(): Promise<FullRegistration | null> {
	const client = await getClient();
	const userId = await getUserId();

	// Fetch all items for this user in one query
	const result = await client.send(new QueryCommand({
		TableName: TABLE_NAME,
		KeyConditionExpression: 'userId = :uid',
		ExpressionAttributeValues: { ':uid': userId }
	}));

	const items = result.Items ?? [];
	const household = items.find(i => i.sk === 'HOUSEHOLD') as Household | undefined;
	const members = items.filter(i => (i.sk as string).startsWith('MEMBER#')) as FamilyMember[];
	const volunteer = (items.find(i => i.sk === 'VOLUNTEER') as VolunteerPreferences) ?? null;

	if (!household) return null;

	return { household, members, volunteer };
}

// ─── Admin: Scan all registrations ────────────────────────────────────────────

/**
 * Returns all household records (admin only).
 * IMPORTANT: This uses a Scan — only suitable for small tables (~200 households).
 * In production, add a GSI on `sk` for efficient filtering.
 */
export async function adminGetAllHouseholds(): Promise<Household[]> {
	const client = await getClient();

	const result = await client.send(new ScanCommand({
		TableName: TABLE_NAME,
		FilterExpression: 'sk = :sk',
		ExpressionAttributeValues: { ':sk': 'HOUSEHOLD' }
	}));

	return (result.Items ?? []) as Household[];
}

/**
 * Returns all family members for ALL households (admin only).
 */
export async function adminGetAllMembers(): Promise<FamilyMember[]> {
	const client = await getClient();

	const result = await client.send(new ScanCommand({
		TableName: TABLE_NAME,
		FilterExpression: 'begins_with(sk, :prefix)',
		ExpressionAttributeValues: { ':prefix': 'MEMBER#' }
	}));

	return (result.Items ?? []) as FamilyMember[];
}

/**
 * Returns all volunteer preference records (admin only).
 */
export async function adminGetAllVolunteers(): Promise<VolunteerPreferences[]> {
	const client = await getClient();

	const result = await client.send(new ScanCommand({
		TableName: TABLE_NAME,
		FilterExpression: 'sk = :sk',
		ExpressionAttributeValues: { ':sk': 'VOLUNTEER' }
	}));

	return (result.Items ?? []) as VolunteerPreferences[];
}

/**
 * Builds summarised registration list for the admin dashboard.
 */
export async function adminGetRegistrationSummaries(): Promise<RegistrationSummary[]> {
	const [households, allMembers, allVolunteers] = await Promise.all([
		adminGetAllHouseholds(),
		adminGetAllMembers(),
		adminGetAllVolunteers()
	]);

	const membersByUser = allMembers.reduce<Record<string, FamilyMember[]>>((acc, m) => {
		(acc[m.userId] ??= []).push(m);
		return acc;
	}, {});

	const volunteerByUser = allVolunteers.reduce<Record<string, VolunteerPreferences>>(
		(acc, v) => ({ ...acc, [v.userId]: v }),
		{}
	);

	return households.map(h => {
		const members = membersByUser[h.userId] ?? [];
		const vol = volunteerByUser[h.userId];
		const roles: string[] = [];

		if (vol) {
			if (vol.interestedInChoir) roles.push(`Choir (${vol.voicePart ?? 'TBD'})`);
			if (vol.interestedInSpecialMusic) roles.push('Special Music');
			if (vol.interestedInSongLeading) roles.push('Song Leading');
			if (vol.interestedInSermonette) roles.push('Sermonette');
			if (vol.interestedInUsher) roles.push('Usher');
			if (vol.interestedInAvTech) roles.push('AV Tech');
			if (vol.interestedInSetupTakedown) roles.push('Setup/Takedown');
			if (vol.interestedInChildrenProgram) roles.push("Children's Program");
			if (vol.interestedInHospitality) roles.push('Hospitality');
		}

		const adultCount = 1 + members.filter(m => !m.isChild).length;
		const childCount = members.filter(m => m.isChild).length;

		return {
			userId: h.userId,
			email: h.email,
			headName: `${h.headFirstName} ${h.headLastName}`,
			phone: h.phone,
			city: h.city,
			totalMembers: 1 + members.length,
			adultCount,
			childCount,
			status: h.status,
			submittedAt: h.submittedAt,
			volunteerRoles: roles
		};
	});
}
