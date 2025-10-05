/**
 * Trip Database Service
 * 
 * Handles all DynamoDB operations for trip data with Amplify Auth integration.
 * Provides CRUD operations with proper error handling and user isolation.
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
	DynamoDBDocumentClient,
	PutCommand,
	GetCommand,
	QueryCommand,
	UpdateCommand,
	DeleteCommand,
	type QueryCommandInput,
	type PutCommandInput,
	type GetCommandInput,
	type UpdateCommandInput,
	type DeleteCommandInput
} from '@aws-sdk/lib-dynamodb';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Trip, CreateTripInput, UpdateTripInput, TripFilters, TripStatus } from '$lib/types/trip';

// DynamoDB Configuration
const REGION = import.meta.env.VITE_AWS_REGION || 'ap-southeast-2';
const TABLE_NAME = import.meta.env.VITE_DYNAMODB_TABLE_NAME || 'feast-planner-trips-v2';

/**
 * Initialize DynamoDB Client with user credentials from Amplify Auth
 */
async function getDynamoDBClient(): Promise<DynamoDBDocumentClient> {
	try {
		// Get AWS credentials from Amplify Auth session
		const session = await fetchAuthSession();
		
		if (!session.credentials) {
			throw new Error('No AWS credentials found. Please sign in.');
		}

		// Create DynamoDB client with user credentials
		const client = new DynamoDBClient({
			region: REGION,
			credentials: session.credentials
		});

		// Create Document client for easier JSON operations
		return DynamoDBDocumentClient.from(client, {
			marshallOptions: {
				removeUndefinedValues: true, // Remove undefined values
				convertEmptyValues: false     // Don't convert empty strings to null
			}
		});
	} catch (error) {
		console.error('Failed to initialize DynamoDB client:', error);
		throw new Error('Failed to connect to database. Please sign in and try again.');
	}
}

/**
 * Get current authenticated user ID
 */
async function getCurrentUserId(): Promise<string> {
	try {
		const session = await fetchAuthSession();
		const userId = session.identityId;

		if (!userId) {
			throw new Error('No user ID found in session');
		}

		return userId;
	} catch (error) {
		console.error('Failed to get user ID:', error);
		throw new Error('Unable to identify user. Please sign in again.');
	}
}

/**
 * Generate a unique trip ID
 */
function generateTripId(): string {
	return crypto.randomUUID();
}

/**
 * Create a new trip
 */
export async function createTrip(input: CreateTripInput): Promise<Trip> {
	try {
		const client = await getDynamoDBClient();
		const userId = await getCurrentUserId();
		const now = new Date().toISOString();

		const trip: Trip = {
			userId,
			tripId: generateTripId(),
			siteName: input.siteName,
			siteSlug: input.siteSlug,
			location: input.location,
			organization: input.organization,
			dates: input.dates,
			attendees: input.attendees,
			accommodationType: input.accommodationType,
			transportationMode: input.transportationMode,
			budgetRange: input.budgetRange,
			notes: input.notes,
			status: input.status || 'planned',
			createdAt: now,
			updatedAt: now
		};

		const params: PutCommandInput = {
			TableName: TABLE_NAME,
			Item: trip,
			// Ensure we don't overwrite existing trips
			ConditionExpression: 'attribute_not_exists(tripId)'
		};

		await client.send(new PutCommand(params));

		console.log('✅ Trip created successfully:', trip.tripId);
		return trip;
	} catch (error: any) {
		console.error('❌ Failed to create trip:', error);
		
		if (error.name === 'ConditionalCheckFailedException') {
			throw new Error('A trip with this ID already exists. Please try again.');
		}
		
		throw new Error('Failed to create trip. Please try again.');
	}
}

/**
 * Get all trips for the current user
 */
export async function getTrips(filters?: TripFilters): Promise<Trip[]> {
	try {
		const client = await getDynamoDBClient();
		const userId = await getCurrentUserId();

		const params: QueryCommandInput = {
			TableName: TABLE_NAME,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': userId
			},
			// Sort by creation date (newest first)
			ScanIndexForward: false
		};

		const result = await client.send(new QueryCommand(params));
		let trips = (result.Items || []) as Trip[];

		// Apply filters if provided
		if (filters) {
			if (filters.status) {
				trips = trips.filter(trip => trip.status === filters.status);
			}
			if (filters.location) {
				trips = trips.filter(trip => 
					trip.location.toLowerCase().includes(filters.location!.toLowerCase())
				);
			}
			if (filters.organization) {
				trips = trips.filter(trip => 
					trip.organization?.toLowerCase().includes(filters.organization!.toLowerCase())
				);
			}
		}

		console.log(`✅ Retrieved ${trips.length} trips for user`);
		return trips;
	} catch (error) {
		console.error('❌ Failed to get trips:', error);
		throw new Error('Failed to load trips. Please refresh the page.');
	}
}

/**
 * Get a single trip by ID
 */
export async function getTrip(tripId: string): Promise<Trip | null> {
	try {
		const client = await getDynamoDBClient();
		const userId = await getCurrentUserId();

		const params: GetCommandInput = {
			TableName: TABLE_NAME,
			Key: {
				userId,
				tripId
			}
		};

		const result = await client.send(new GetCommand(params));

		if (!result.Item) {
			console.log('⚠️ Trip not found:', tripId);
			return null;
		}

		console.log('✅ Retrieved trip:', tripId);
		return result.Item as Trip;
	} catch (error) {
		console.error('❌ Failed to get trip:', error);
		throw new Error('Failed to load trip. Please try again.');
	}
}

/**
 * Update an existing trip
 */
export async function updateTrip(input: UpdateTripInput): Promise<Trip> {
	try {
		const client = await getDynamoDBClient();
		const userId = await getCurrentUserId();
		const now = new Date().toISOString();

		// Build update expression dynamically
		const updateExpressions: string[] = [];
		const expressionAttributeNames: Record<string, string> = {};
		const expressionAttributeValues: Record<string, any> = {};

		// Always update the updatedAt timestamp
		updateExpressions.push('#updatedAt = :updatedAt');
		expressionAttributeNames['#updatedAt'] = 'updatedAt';
		expressionAttributeValues[':updatedAt'] = now;

		// Add each field that's being updated
		const fields = [
			'siteName', 'siteSlug', 'location', 'organization',
			'dates', 'attendees', 'accommodationType',
			'transportationMode', 'budgetRange', 'notes', 'status'
		] as const;

		for (const field of fields) {
			if (input[field] !== undefined) {
				updateExpressions.push(`#${field} = :${field}`);
				expressionAttributeNames[`#${field}`] = field;
				expressionAttributeValues[`:${field}`] = input[field];
			}
		}

		const params: UpdateCommandInput = {
			TableName: TABLE_NAME,
			Key: {
				userId,
				tripId: input.tripId
			},
			UpdateExpression: `SET ${updateExpressions.join(', ')}`,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
			// Ensure the trip exists before updating
			ConditionExpression: 'attribute_exists(tripId)',
			ReturnValues: 'ALL_NEW'
		};

		const result = await client.send(new UpdateCommand(params));

		if (!result.Attributes) {
			throw new Error('Update did not return trip data');
		}

		console.log('✅ Trip updated successfully:', input.tripId);
		return result.Attributes as Trip;
	} catch (error: any) {
		console.error('❌ Failed to update trip:', error);
		
		if (error.name === 'ConditionalCheckFailedException') {
			throw new Error('Trip not found. It may have been deleted.');
		}
		
		throw new Error('Failed to update trip. Please try again.');
	}
}

/**
 * Delete a trip
 */
export async function deleteTrip(tripId: string): Promise<void> {
	try {
		const client = await getDynamoDBClient();
		const userId = await getCurrentUserId();

		const params: DeleteCommandInput = {
			TableName: TABLE_NAME,
			Key: {
				userId,
				tripId
			},
			// Ensure the trip exists before deleting
			ConditionExpression: 'attribute_exists(tripId)'
		};

		await client.send(new DeleteCommand(params));

		console.log('✅ Trip deleted successfully:', tripId);
	} catch (error: any) {
		console.error('❌ Failed to delete trip:', error);
		
		if (error.name === 'ConditionalCheckFailedException') {
			throw new Error('Trip not found. It may have already been deleted.');
		}
		
		throw new Error('Failed to delete trip. Please try again.');
	}
}

/**
 * Get trip count for the current user
 */
export async function getTripCount(status?: TripStatus): Promise<number> {
	try {
		const trips = await getTrips(status ? { status } : undefined);
		return trips.length;
	} catch (error) {
		console.error('❌ Failed to get trip count:', error);
		return 0;
	}
}

/**
 * Check if user has any trips
 */
export async function hasTrips(): Promise<boolean> {
	try {
		const count = await getTripCount();
		return count > 0;
	} catch (error) {
		console.error('❌ Failed to check for trips:', error);
		return false;
	}
}

// Export types for convenience
export type { Trip, CreateTripInput, UpdateTripInput, TripFilters } from '$lib/types/trip';
