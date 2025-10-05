/**
 * Trip Data Types for DynamoDB
 */

export type TripStatus = 'planned' | 'confirmed' | 'cancelled';

export interface Trip {
	// DynamoDB Keys
	userId: string; // Cognito user sub ID (partition key)
	tripId: string; // UUID v4 (sort key)

	// Site Information
	siteName: string; // e.g., "Daytona Beach, FL"
	siteSlug: string; // e.g., "daytona-beach-fl"
	location: string; // e.g., "United States"
	organization?: string; // e.g., "COGWA"

	// Trip Details
	dates: string; // e.g., "October 15-22, 2025"
	attendees: number; // Number of people attending
	accommodationType?: string; // e.g., "Hotel", "Resort", "Vacation Rental"
	transportationMode?: string; // e.g., "Flying", "Driving", "Train"
	budgetRange?: string; // e.g., "$2000-$3000", "$3000-$5000"
	notes?: string; // User notes about the trip

	// Status
	status: TripStatus; // planned, confirmed, or cancelled

	// Timestamps
	createdAt: string; // ISO 8601 timestamp
	updatedAt: string; // ISO 8601 timestamp
}

export interface CreateTripInput {
	siteName: string;
	siteSlug: string;
	location: string;
	organization?: string;
	dates: string;
	attendees: number;
	accommodationType?: string;
	transportationMode?: string;
	budgetRange?: string;
	notes?: string;
	status?: TripStatus;
}

export interface UpdateTripInput {
	tripId: string;
	siteName?: string;
	siteSlug?: string;
	location?: string;
	organization?: string;
	dates?: string;
	attendees?: number;
	accommodationType?: string;
	transportationMode?: string;
	budgetRange?: string;
	notes?: string;
	status?: TripStatus;
}

export interface TripFilters {
	status?: TripStatus;
	location?: string;
	organization?: string;
}
