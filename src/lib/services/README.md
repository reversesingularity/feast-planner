# Trip Database Service Documentation

## Overview

The `tripDb.ts` service provides a complete interface for managing trip data in DynamoDB with Amplify Auth integration. It handles user authentication, AWS credentials, and all CRUD operations with proper error handling.

## Features

✅ **User Isolation** - Each user can only access their own trips (enforced by IAM)  
✅ **Automatic Credentials** - Gets AWS credentials from Amplify Auth session  
✅ **Type Safety** - Full TypeScript support with Trip interfaces  
✅ **Error Handling** - Comprehensive error messages for better UX  
✅ **Filtering** - Built-in support for filtering trips by status, location, organization  
✅ **Validation** - Ensures trips exist before updating/deleting  

---

## Installation

The AWS SDK packages are already installed:
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

---

## Quick Start

### Import the Service

```typescript
import { createTrip, getTrips, getTrip, updateTrip, deleteTrip } from '$lib/services/tripDb';
```

### Create a Trip

```typescript
import { createTrip } from '$lib/services/tripDb';

try {
  const newTrip = await createTrip({
    siteName: 'Daytona Beach, FL',
    siteSlug: 'daytona-beach-fl',
    location: 'United States',
    organization: 'COGWA',
    dates: 'October 15-22, 2025',
    attendees: 4,
    accommodationType: 'Hotel',
    transportationMode: 'Flying',
    budgetRange: '$2000-$3000',
    notes: 'Looking forward to the Feast!',
    status: 'planned'
  });
  
  console.log('Trip created:', newTrip.tripId);
} catch (error) {
  console.error('Failed to create trip:', error.message);
}
```

### Get All Trips

```typescript
import { getTrips } from '$lib/services/tripDb';

try {
  // Get all trips
  const allTrips = await getTrips();
  
  // Or filter by status
  const confirmedTrips = await getTrips({ status: 'confirmed' });
  
  // Or filter by location
  const usTrips = await getTrips({ location: 'United States' });
  
  console.log(`Found ${allTrips.length} trips`);
} catch (error) {
  console.error('Failed to load trips:', error.message);
}
```

### Get a Single Trip

```typescript
import { getTrip } from '$lib/services/tripDb';

try {
  const trip = await getTrip('trip-id-here');
  
  if (trip) {
    console.log('Trip found:', trip.siteName);
  } else {
    console.log('Trip not found');
  }
} catch (error) {
  console.error('Failed to load trip:', error.message);
}
```

### Update a Trip

```typescript
import { updateTrip } from '$lib/services/tripDb';

try {
  const updatedTrip = await updateTrip({
    tripId: 'trip-id-here',
    status: 'confirmed',
    accommodationType: 'Resort',
    notes: 'Upgraded to resort with ocean view!'
  });
  
  console.log('Trip updated:', updatedTrip.updatedAt);
} catch (error) {
  console.error('Failed to update trip:', error.message);
}
```

### Delete a Trip

```typescript
import { deleteTrip } from '$lib/services/tripDb';

try {
  await deleteTrip('trip-id-here');
  console.log('Trip deleted successfully');
} catch (error) {
  console.error('Failed to delete trip:', error.message);
}
```

---

## API Reference

### `createTrip(input: CreateTripInput): Promise<Trip>`

Creates a new trip for the authenticated user.

**Parameters:**
- `siteName` (required) - Name of the site (e.g., "Daytona Beach, FL")
- `siteSlug` (required) - URL-friendly slug (e.g., "daytona-beach-fl")
- `location` (required) - Location/country (e.g., "United States")
- `dates` (required) - Date range (e.g., "October 15-22, 2025")
- `attendees` (required) - Number of people attending
- `organization` (optional) - Organization name (e.g., "COGWA")
- `accommodationType` (optional) - Type of accommodation
- `transportationMode` (optional) - How traveling (e.g., "Flying")
- `budgetRange` (optional) - Budget estimate (e.g., "$2000-$3000")
- `notes` (optional) - User notes
- `status` (optional) - Trip status (default: 'planned')

**Returns:** The created `Trip` object

**Throws:** Error if creation fails

---

### `getTrips(filters?: TripFilters): Promise<Trip[]>`

Gets all trips for the authenticated user with optional filtering.

**Parameters:**
- `filters` (optional) - Object with:
  - `status` - Filter by trip status ('planned', 'confirmed', 'cancelled')
  - `location` - Filter by location (case-insensitive partial match)
  - `organization` - Filter by organization (case-insensitive partial match)

**Returns:** Array of `Trip` objects (sorted by creation date, newest first)

**Throws:** Error if query fails

---

### `getTrip(tripId: string): Promise<Trip | null>`

Gets a single trip by ID.

**Parameters:**
- `tripId` - The trip ID to retrieve

**Returns:** The `Trip` object or `null` if not found

**Throws:** Error if query fails

---

### `updateTrip(input: UpdateTripInput): Promise<Trip>`

Updates an existing trip.

**Parameters:**
- `tripId` (required) - ID of the trip to update
- Any other trip fields to update (all optional)

**Returns:** The updated `Trip` object

**Throws:** Error if trip not found or update fails

---

### `deleteTrip(tripId: string): Promise<void>`

Deletes a trip.

**Parameters:**
- `tripId` - The trip ID to delete

**Returns:** Nothing (void)

**Throws:** Error if trip not found or deletion fails

---

### `getTripCount(status?: TripStatus): Promise<number>`

Gets the number of trips for the current user.

**Parameters:**
- `status` (optional) - Filter by status

**Returns:** Number of trips

---

### `hasTrips(): Promise<boolean>`

Checks if the user has any trips.

**Returns:** `true` if user has trips, `false` otherwise

---

## Data Model

### Trip Object Structure

```typescript
interface Trip {
  // DynamoDB Keys
  userId: string;        // Cognito user sub ID (auto-populated)
  tripId: string;        // UUID v4 (auto-generated)
  
  // Site Information
  siteName: string;      // e.g., "Daytona Beach, FL"
  siteSlug: string;      // e.g., "daytona-beach-fl"
  location: string;      // e.g., "United States"
  organization?: string; // e.g., "COGWA"
  
  // Trip Details
  dates: string;                  // e.g., "October 15-22, 2025"
  attendees: number;              // Number of people
  accommodationType?: string;     // e.g., "Hotel", "Resort"
  transportationMode?: string;    // e.g., "Flying", "Driving"
  budgetRange?: string;           // e.g., "$2000-$3000"
  notes?: string;                 // User notes
  
  // Status
  status: 'planned' | 'confirmed' | 'cancelled';
  
  // Timestamps
  createdAt: string;     // ISO 8601 timestamp (auto-populated)
  updatedAt: string;     // ISO 8601 timestamp (auto-updated)
}
```

---

## Error Handling

All functions throw user-friendly error messages. Always wrap calls in try-catch blocks:

```typescript
try {
  const trips = await getTrips();
  // Handle success
} catch (error) {
  // Show error to user
  alert(error.message);
}
```

**Common Error Messages:**
- "No AWS credentials found. Please sign in."
- "Unable to identify user. Please sign in again."
- "Failed to create trip. Please try again."
- "Failed to load trips. Please refresh the page."
- "Trip not found. It may have been deleted."
- "Failed to update trip. Please try again."
- "Failed to delete trip. Please try again."

---

## Security

### User Isolation

The service automatically:
1. Gets the current user ID from Amplify Auth
2. Uses it as the partition key for all DynamoDB operations
3. IAM policies enforce that users can only access their own data

**Result:** Users can NEVER see or modify other users' trips.

### AWS Credentials

Credentials are obtained from:
1. User signs in with Cognito User Pool
2. Cognito Identity Pool exchanges User Pool token for AWS credentials
3. Credentials have limited DynamoDB permissions (only user's own data)
4. Credentials expire and are automatically refreshed

---

## Performance

### Query Optimization

- Uses `Query` operations (not `Scan`) for efficiency
- Queries use partition key (`userId`) for fast lookups
- Results are sorted by creation date (newest first)
- Filters are applied client-side (after query)

### Best Practices

✅ **DO:** Use `getTrips()` to load all trips once, then filter in memory  
❌ **DON'T:** Call `getTrip()` multiple times in a loop  

✅ **DO:** Update only changed fields  
❌ **DON'T:** Update the entire trip object every time  

---

## Usage in Svelte Components

### With Loading States

```typescript
<script lang="ts">
  import { onMount } from 'svelte';
  import { getTrips, type Trip } from '$lib/services/tripDb';
  
  let trips: Trip[] = [];
  let loading = true;
  let error = '';
  
  onMount(async () => {
    try {
      trips = await getTrips();
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading trips...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if trips.length === 0}
  <p>No trips yet. Create your first trip!</p>
{:else}
  {#each trips as trip}
    <div>{trip.siteName} - {trip.dates}</div>
  {/each}
{/if}
```

### With Form Handling

```typescript
<script lang="ts">
  import { createTrip, type CreateTripInput } from '$lib/services/tripDb';
  
  let formData: CreateTripInput = {
    siteName: '',
    siteSlug: '',
    location: '',
    dates: '',
    attendees: 1
  };
  
  let saving = false;
  let successMessage = '';
  
  async function handleSubmit() {
    saving = true;
    successMessage = '';
    
    try {
      await createTrip(formData);
      successMessage = 'Trip created successfully!';
      // Reset form or redirect
    } catch (error) {
      alert(error.message);
    } finally {
      saving = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Form fields here -->
  
  <button type="submit" disabled={saving}>
    {saving ? 'Saving...' : 'Create Trip'}
  </button>
  
  {#if successMessage}
    <p class="success">{successMessage}</p>
  {/if}
</form>
```

---

## Testing

### Test Create Operation

```typescript
const testTrip = await createTrip({
  siteName: 'Test Site',
  siteSlug: 'test-site',
  location: 'Test Location',
  dates: 'October 1-8, 2025',
  attendees: 2
});

console.log('Created trip:', testTrip.tripId);
```

### Test Read Operation

```typescript
const trips = await getTrips();
console.log('Total trips:', trips.length);
```

### Test Update Operation

```typescript
const updated = await updateTrip({
  tripId: 'your-trip-id',
  status: 'confirmed'
});

console.log('Updated trip status:', updated.status);
```

### Test Delete Operation

```typescript
await deleteTrip('your-trip-id');
console.log('Trip deleted');
```

---

## Troubleshooting

### "No AWS credentials found"
**Solution:** User needs to sign in. Check that Amplify Auth is configured correctly.

### "Failed to connect to database"
**Solution:** 
1. Check that `.env.local` has correct values
2. Verify Identity Pool ID is correct
3. Check that IAM role has DynamoDB permissions

### "Trip not found"
**Solution:** The trip may have been deleted, or the tripId is incorrect.

### TypeScript errors
**Solution:** Ensure all required fields are provided when creating/updating trips.

---

## Next Steps

1. ✅ Database service created
2. ⏳ Update Trip Planner UI to use this service
3. ⏳ Add save/edit/delete buttons
4. ⏳ Add loading states and error handling
5. ⏳ Test with real data
6. ⏳ Deploy to production

---

## Related Files

- **Types:** `src/lib/types/trip.ts`
- **Config:** `src/lib/config/amplify.ts`
- **Environment:** `.env.local`
- **CloudFormation:** `cloudformation/feast-planner-infrastructure.yaml`

---

## Support

For issues or questions:
1. Check CloudWatch Logs for DynamoDB errors
2. Verify IAM permissions in AWS Console
3. Check browser console for detailed error messages
4. Review DynamoDB table in AWS Console

---

**Last Updated:** October 2025  
**Version:** 1.0.0
