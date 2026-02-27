/**
 * COGWA NZ Feast Registration Types
 * Feast of Tabernacles - Tauranga
 */

// ─── Status ─────────────────────────────────────────────────────────────────

export type RegistrationStatus = 'draft' | 'submitted' | 'confirmed' | 'cancelled';

// ─── Household ───────────────────────────────────────────────────────────────

export interface Household {
	// DynamoDB Keys
	userId: string;   // Cognito identity ID (PK)
	sk: 'HOUSEHOLD';  // Sort key

	// Head of Household
	headFirstName: string;
	headLastName: string;
	email: string;
	phone: string;

	// Address (NZ)
	streetAddress: string;
	suburb?: string;
	city: string;
	postcode: string;
	region: string;

	// Feast logistics
	attendingAllDays: boolean;
	arrivalDate?: string;    // ISO date, if partial attendance
	departureDate?: string;

	// Registration status
	status: RegistrationStatus;
	submittedAt?: string;    // ISO timestamp

	// Timestamps
	createdAt: string;
	updatedAt: string;
}

export interface CreateHouseholdInput {
	headFirstName: string;
	headLastName: string;
	email: string;
	phone: string;
	streetAddress: string;
	suburb?: string;
	city: string;
	postcode: string;
	region: string;
	attendingAllDays: boolean;
	arrivalDate?: string;
	departureDate?: string;
}

// ─── Family Members ───────────────────────────────────────────────────────────

export type MemberRelationship = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type DietaryRequirement = 'none' | 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-allergy' | 'other';

export interface FamilyMember {
	// DynamoDB Keys
	userId: string;             // Same as household PK
	sk: `MEMBER#${string}`;    // MEMBER#uuid

	memberId: string;           // UUID

	// Personal details
	firstName: string;
	lastName: string;
	dateOfBirth?: string;        // ISO date — for age-based activities (e.g. youth trip)
	isChild: boolean;            // Under 18

	// Logistics
	relationship: MemberRelationship;
	dietaryRequirements: DietaryRequirement;
	dietaryNotes?: string;
	accessibilityNeeds?: string;
	medicalNotes?: string;       // Encrypted/sensitive

	// Timestamps
	createdAt: string;
	updatedAt: string;
}

export interface CreateFamilyMemberInput {
	firstName: string;
	lastName: string;
	dateOfBirth?: string;
	isChild: boolean;
	relationship: MemberRelationship;
	dietaryRequirements: DietaryRequirement;
	dietaryNotes?: string;
	accessibilityNeeds?: string;
	medicalNotes?: string;
}

// ─── Volunteer Roles ─────────────────────────────────────────────────────────

export type VoicePart = 'soprano' | 'alto' | 'tenor' | 'bass';
export type AvailabilityDay =
	| 'day1' | 'day2' | 'day3' | 'day4'
	| 'day5' | 'day6' | 'day7' | 'day8';

export interface VolunteerPreferences {
	// DynamoDB Keys
	userId: string;
	sk: 'VOLUNTEER';

	// ── Music Ministry ──
	interestedInChoir: boolean;
	voicePart?: VoicePart;
	singsInChoir?: boolean;       // Experienced choir member

	interestedInSpecialMusic: boolean;
	specialMusicInstrument?: string;  // e.g. "Piano", "Guitar", "Violin"
	specialMusicDetails?: string;     // e.g. "Can perform a piano solo"

	interestedInSongLeading: boolean;
	songLeadingAvailability?: AvailabilityDay[];

	// ── Speaking Ministry ──
	interestedInSermonette: boolean;
	sermonetteTopicIdeas?: string;    // e.g. "The Millennium", "Lessons from the Feast"
	sermonetteAvailability?: AvailabilityDay[];
	previousSermonetteExperience?: boolean;

	// ── Logistics Ministry ──
	interestedInUsher: boolean;
	interestedInAvTech: boolean;
	interestedInSetupTakedown: boolean;
	interestedInChildrenProgram: boolean;  // Help with youth activities
	interestedInHospitality: boolean;      // Welcome team, information desk

	// General
	volunteerNotes?: string;
	availabilityNotes?: string;

	// Timestamps
	createdAt: string;
	updatedAt: string;
}

export interface CreateVolunteerInput {
	interestedInChoir: boolean;
	voicePart?: VoicePart;
	singsInChoir?: boolean;
	interestedInSpecialMusic: boolean;
	specialMusicInstrument?: string;
	specialMusicDetails?: string;
	interestedInSongLeading: boolean;
	songLeadingAvailability?: AvailabilityDay[];
	interestedInSermonette: boolean;
	sermonetteTopicIdeas?: string;
	sermonetteAvailability?: AvailabilityDay[];
	previousSermonetteExperience?: boolean;
	interestedInUsher: boolean;
	interestedInAvTech: boolean;
	interestedInSetupTakedown: boolean;
	interestedInChildrenProgram: boolean;
	interestedInHospitality: boolean;
	volunteerNotes?: string;
	availabilityNotes?: string;
}

// ─── Admin / Export ───────────────────────────────────────────────────────────

export interface RegistrationSummary {
	userId: string;
	email: string;
	headName: string;
	phone: string;
	city: string;
	totalMembers: number;       // Head + family members
	adultCount: number;
	childCount: number;
	status: RegistrationStatus;
	submittedAt?: string;
	volunteerRoles: string[];   // Human-readable list of volunteered roles
}

export interface FullRegistration {
	household: Household;
	members: FamilyMember[];
	volunteer: VolunteerPreferences | null;
}
