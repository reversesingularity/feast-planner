# Archive: Original Multi-Site Feast Planner
**Scrubbed:** February 2026  
**Reason:** App repurposed as exclusive COGWA NZ registration system  
**Rebuilt from:** This document

---

## What Was Removed & Why

The original scaffold was a **general Feast of Tabernacles multi-site trip planner** — designed to let any COG member browse feast sites worldwide, save trips, and plan logistics. It was replaced by a COGWA NZ exclusive registration system. The following routes, services, types and components were deleted to prevent interference, confusion, or unwanted DynamoDB reads from the new system.

---

## Deleted Files Inventory

| File | Route | Purpose |
|---|---|---|
| `src/routes/my-trips/+layout.svelte` | `/my-trips` | Protected layout wrapper (ProtectedRoute) |
| `src/routes/my-trips/+page.ts` | `/my-trips` | Server load stub |
| `src/routes/my-trips/+page.svelte` | `/my-trips` | Trip list — loads & displays user's saved trips |
| `src/routes/my-trips/new/+page.svelte` | `/my-trips/new` | Multi-step form to create a new trip |
| `src/routes/my-trips/[id]/+layout.svelte` | `/my-trips/:id` | Individual trip layout |
| `src/routes/my-trips/[id]/+page.svelte` | `/my-trips/:id` | Trip detail page with itinerary builder |
| `src/routes/sites/+page.svelte` | `/sites` | Multi-site search/browse with map & filters |
| `src/routes/sites/[slug]/+page.svelte` | `/sites/:slug` | Individual site detail page (full data for 10+ sites) |
| `src/routes/profile/+layout.svelte` | `/profile` | Profile layout |
| `src/routes/profile/+page.svelte` | `/profile` | User profile: name/email display, change password |
| `src/routes/utilities/+page.svelte` | `/utilities` | Dev demo page |
| `src/routes/buttons/+page.svelte` | `/buttons` | Dev demo page |
| `src/routes/components/+page.svelte` | `/components` | Component library demo |
| `src/routes/forms/+page.svelte` | `/forms` | Forms demo page |
| `src/lib/services/tripDb.ts` | — | DynamoDB trip CRUD service |
| `src/lib/types/trip.ts` | — | Trip TypeScript type definitions |
| `src/lib/components/MultiSiteMap.svelte` | — | Leaflet multi-marker map component |

---

## DynamoDB Table: `feast-planner-trips`

### Schema
```
Partition Key: userId  (String) — Cognito identityId
Sort Key:      tripId  (String) — UUID v4
```

### Region
`ap-southeast-2` (Sydney)

### Environment Variable
```
VITE_DYNAMODB_TABLE_NAME=feast-planner-trips-v2
VITE_AWS_REGION=ap-southeast-2
```

### Item Shape
```typescript
{
  userId: string;           // Cognito identity ID (PK)
  tripId: string;           // UUID v4 (SK)
  siteName: string;         // e.g. "Daytona Beach, FL"
  siteSlug: string;         // e.g. "daytona-beach-fl"
  location: string;         // e.g. "United States"
  organization?: string;    // e.g. "COGWA"
  dates: string;            // e.g. "October 15-22, 2025"
  attendees: number;
  accommodationType?: string; // "Hotel", "Resort", "Vacation Rental"
  transportationMode?: string; // "Flying", "Driving", "Train"
  budgetRange?: string;     // e.g. "$2000-$3000"
  notes?: string;
  status: 'planned' | 'confirmed' | 'cancelled';
  createdAt: string;        // ISO 8601
  updatedAt: string;        // ISO 8601
}
```

---

## Source Code

### `src/lib/types/trip.ts`
```typescript
export type TripStatus = 'planned' | 'confirmed' | 'cancelled';

export interface Trip {
  userId: string;
  tripId: string;
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
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
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
```

---

### `src/lib/services/tripDb.ts`
Full CRUD service using AWS DynamoDB Document Client + Amplify Auth.

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand, GetCommand, QueryCommand,
  UpdateCommand, DeleteCommand,
  type QueryCommandInput, type PutCommandInput,
  type GetCommandInput, type UpdateCommandInput, type DeleteCommandInput
} from '@aws-sdk/lib-dynamodb';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Trip, CreateTripInput, UpdateTripInput, TripFilters, TripStatus } from '$lib/types/trip';

const REGION = import.meta.env.VITE_AWS_REGION || 'ap-southeast-2';
const TABLE_NAME = import.meta.env.VITE_DYNAMODB_TABLE_NAME || 'feast-planner-trips-v2';

async function getDynamoDBClient(): Promise<DynamoDBDocumentClient> {
  const session = await fetchAuthSession();
  if (!session.credentials) throw new Error('No AWS credentials found. Please sign in.');
  const client = new DynamoDBClient({
    region: REGION,
    credentials: session.credentials
  });
  return DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true, convertEmptyValues: false }
  });
}

async function getCurrentUserId(): Promise<string> {
  const session = await fetchAuthSession();
  const userId = session.identityId;
  if (!userId) throw new Error('No user ID found in session');
  return userId;
}

function generateTripId(): string {
  return crypto.randomUUID();
}

export async function createTrip(input: CreateTripInput): Promise<Trip> {
  const client = await getDynamoDBClient();
  const userId = await getCurrentUserId();
  const now = new Date().toISOString();
  const trip: Trip = {
    userId, tripId: generateTripId(),
    ...input,
    status: input.status || 'planned',
    createdAt: now, updatedAt: now
  };
  await client.send(new PutCommand({
    TableName: TABLE_NAME, Item: trip,
    ConditionExpression: 'attribute_not_exists(tripId)'
  }));
  return trip;
}

export async function getTrips(filters?: TripFilters): Promise<Trip[]> {
  const client = await getDynamoDBClient();
  const userId = await getCurrentUserId();
  const result = await client.send(new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: { ':userId': userId },
    ScanIndexForward: false
  }));
  let trips = (result.Items || []) as Trip[];
  if (filters?.status) trips = trips.filter(t => t.status === filters.status);
  if (filters?.location) trips = trips.filter(t => t.location.toLowerCase().includes(filters.location!.toLowerCase()));
  if (filters?.organization) trips = trips.filter(t => t.organization?.toLowerCase().includes(filters.organization!.toLowerCase()));
  return trips;
}

export async function getTrip(tripId: string): Promise<Trip | null> {
  const client = await getDynamoDBClient();
  const userId = await getCurrentUserId();
  const result = await client.send(new GetCommand({
    TableName: TABLE_NAME, Key: { userId, tripId }
  }));
  return result.Item ? result.Item as Trip : null;
}

export async function updateTrip(input: UpdateTripInput): Promise<Trip> {
  const client = await getDynamoDBClient();
  const userId = await getCurrentUserId();
  const now = new Date().toISOString();
  const updateExpressions: string[] = ['#updatedAt = :updatedAt'];
  const expressionAttributeNames: Record<string, string> = { '#updatedAt': 'updatedAt' };
  const expressionAttributeValues: Record<string, any> = { ':updatedAt': now };
  const fields = ['siteName','siteSlug','location','organization','dates','attendees',
    'accommodationType','transportationMode','budgetRange','notes','status'] as const;
  for (const field of fields) {
    if (input[field] !== undefined) {
      updateExpressions.push(`#${field} = :${field}`);
      expressionAttributeNames[`#${field}`] = field;
      expressionAttributeValues[`:${field}`] = input[field];
    }
  }
  const result = await client.send(new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { userId, tripId: input.tripId },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ConditionExpression: 'attribute_exists(tripId)',
    ReturnValues: 'ALL_NEW'
  }));
  return result.Attributes as Trip;
}

export async function deleteTrip(tripId: string): Promise<void> {
  const client = await getDynamoDBClient();
  const userId = await getCurrentUserId();
  await client.send(new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { userId, tripId },
    ConditionExpression: 'attribute_exists(tripId)'
  }));
}

export async function getTripCount(status?: TripStatus): Promise<number> {
  const trips = await getTrips(status ? { status } : undefined);
  return trips.length;
}

export async function hasTrips(): Promise<boolean> {
  return (await getTripCount()) > 0;
}

export type { Trip, CreateTripInput, UpdateTripInput, TripFilters } from '$lib/types/trip';
```

---

### `src/lib/components/MultiSiteMap.svelte`
Leaflet-based map displaying multiple feast sites with colour-coded status markers (green = available, yellow = limited, red = full). Accepts `sites[]` prop with `{ id, slug, name, lat, lng, organization, status }`. Markers have popups and link to `/sites/:slug`.

Key props:
```typescript
sites: MapSite[];
height?: string;      // default '500px'
zoom?: number;        // default 4
onMarkerClick?: (site: MapSite) => void;
```

Requires Leaflet CSS (loaded via `<svelte:head>`):
```
https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
```

---

### `src/routes/my-trips/+layout.svelte`
```svelte
<script lang="ts">
  import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
  let { children } = $props();
</script>
<ProtectedRoute>
  {@render children?.()}
</ProtectedRoute>
```

---

### `src/routes/my-trips/+page.ts`
```typescript
import type { PageLoad } from './';
export const load: PageLoad = async ({ parent }) => {
  return {};
};
```

---

### `src/routes/my-trips/+page.svelte` — Trip List
- Loads trips via `getTrips()` from `tripDb.ts` on mount
- Displays trip cards in a responsive grid with image, status badge, site name, location, dates, attendees, transport type
- "Days until feast" countdown badge (shows if < 90 days away)
- Delete trip with confirmation dialog
- Toast notifications for success/error
- Empty state, loading state, error state
- Stats row at bottom: Total Trips / Confirmed / Planned
- `ProtectedRoute` wrapper via `+layout.svelte`

---

### `src/routes/my-trips/new/+page.svelte` — Create Trip (3-step form)
**Step 1 — Site Selection:**
- Trip name (free text)
- Site dropdown (10 hardcoded sites: Daytona Beach FL, Panama City Beach FL, Lake of the Ozarks MO, Branson MO, Wisconsin Dells WI, Jekyll Island GA, Victoria BC, Tucson AZ, Bacolod Philippines, Taupō NZ)
- Year selector (2025)

**Step 2 — Travel Details:**
- Attendees (number)
- Accommodation type (Hotel/Resort/Vacation Rental/Camping/Other)
- Transportation (Flying/Driving/Train/Bus/Other)
- Budget range ($1000-$2000 / $2000-$3000 / $3000-$5000 / $5000+)

**Step 3 — Notes & Confirmation:**
- Free text notes
- Review summary
- Submit calls `createTrip()` then redirects to `/my-trips`

---

### `src/routes/my-trips/[id]/+page.svelte` — Trip Detail
Full itinerary planner for a single trip. Features:
- Trip header with hero image, site name, dates, status badge
- Edit mode toggle for trip details
- Itinerary builder: mixed-type items (service/flight/hotel/activity/meal/custom)
- Predefined service schedule auto-populated (First Holy Day services, daily, Sabbath, Last Great Day)
- Add/remove/edit custom itinerary entries
- Budget tracker placeholder
- Links to site detail page (`/sites/:siteSlug`)
- Back navigation to `/my-trips`

Note: Uses **mock data** (hardcoded Daytona Beach 2025 trip) — was never wired to DynamoDB for the individual detail view.

---

### `src/routes/sites/+page.svelte` — Multi-Site Browser
Full-featured site search page listing 10 feast sites worldwide:

**Sites included:**
1. Panama City Beach, FL (UCG)
2. Daytona Beach, FL (COGWA)
3. Lake of the Ozarks, MO (LCG)
4. Branson, MO (Church of the Great God)
5. Wisconsin Dells, WI (CGI)
6. Jekyll Island, GA (Restored Church of God)
7. Victoria, BC (UCG)
8. Tucson, AZ (Philadelphia Church of God)
9. Taupō, New Zealand (COGWA)
10. Bacolod, Philippines (COGWA)

**Features:**
- Text search (name, location)
- Filter by Location (US/Canada/NZ/Philippines)
- Filter by Status (available/limited/full)
- Filter by Organization (COGWA/UCG/LCG/CGI/etc.)
- Toggle map view (Leaflet via `MultiSiteMap.svelte`)
- Site cards with image, badge, attendee count, hotel count, activities list
- Link to `/sites/:slug` detail page

---

### `src/routes/sites/[slug]/+page.svelte` — Site Detail
Massive single-file component with full data for all 10 sites hardcoded in a `siteData` record keyed by slug.

**Data per site includes:**
- name, shortName, location, country, organization
- coordinates `{ lat, lng }`
- rating, reviewCount, attendees
- image (Unsplash URL)
- description, highlights[]
- services[] `{ day, time, type }`
- weather `{ avgHigh, avgLow, description }`
- reviews[] `{ author, avatar, rating, date, text }`
- costEstimate `{ accommodations, meals, activities, travel }` (all with min/max/note)
- nearbyAttractions[]

**NZ-specific data (Taupō):**
- Hotel Armitage mentioned (historical note — later moved to Tauranga for 2026)
- Services: First Holy Day, Daily Morning, Fellowship Evening, Sabbath, Educational Seminars, Last Great Day
- Coordinates: `{ lat: -38.653957, lng: 176.087980 }`
- Weather: avg high 64°F, avg low 43°F

**UI sections:**
- Hero with image, rating, breadcrumb
- Service schedule table
- Highlights grid
- Leaflet single-site map (`Map.svelte`)
- Cost estimator
- Reviews carousel
- "Add to My Trips" button → `/my-trips/new?site=:slug`
- Back to Sites link

---

### `src/routes/profile/+page.svelte` — User Profile
- Displays: name, email, userId (Cognito sub)
- Change password form (calls AWS Amplify `updatePassword` — **was a TODO stub, never fully implemented**)
- Sign Out button
- "My Trips" button linking to `/my-trips`
- "Edit Registration" link (was future feature)

---

### `src/routes/utilities/+page.svelte` — Dev Demo
Utility/helper component showcase. Dev use only.

### `src/routes/buttons/+page.svelte` — Dev Demo
Button variants showcase. Dev use only.

### `src/routes/components/+page.svelte` — Component Library Demo
Full showcase of Badge, Input, Card, Button, Heading, Text components with sample data (feast site cards).

### `src/routes/forms/+page.svelte` — Dev Demo
Form component demo page. Dev use only.

---

## How to Rebuild the Trip Planner

To restore the original multi-site trip planner alongside or instead of the COGWA NZ system:

### 1. Restore the DynamoDB table
Create table `feast-planner-trips-v2` in `ap-southeast-2`:
- PK: `userId` (String)
- SK: `tripId` (String)
- Billing: On-demand

Add IAM policy to the Cognito authenticated role:
```json
{
  "Effect": "Allow",
  "Action": ["dynamodb:PutItem","dynamodb:GetItem","dynamodb:UpdateItem","dynamodb:DeleteItem","dynamodb:Query"],
  "Resource": "arn:aws:dynamodb:ap-southeast-2:YOUR_ACCOUNT_ID:table/feast-planner-trips-v2",
  "Condition": {
    "ForAllValues:StringEquals": {
      "dynamodb:LeadingKeys": ["${cognito-identity.amazonaws.com:sub}"]
    }
  }
}
```

### 2. Restore environment variables (`.env.local`)
```
VITE_DYNAMODB_TABLE_NAME=feast-planner-trips-v2
VITE_AWS_REGION=ap-southeast-2
```

### 3. Restore files
Copy source code from the sections above back into these paths:
```
src/lib/types/trip.ts
src/lib/services/tripDb.ts
src/lib/components/MultiSiteMap.svelte
src/routes/my-trips/+layout.svelte
src/routes/my-trips/+page.ts
src/routes/my-trips/+page.svelte
src/routes/my-trips/new/+page.svelte
src/routes/my-trips/[id]/+layout.svelte  (copy of my-trips/+layout.svelte)
src/routes/my-trips/[id]/+page.svelte
src/routes/sites/+page.svelte
src/routes/sites/[slug]/+page.svelte
src/routes/profile/+layout.svelte
src/routes/profile/+page.svelte
```

### 4. Install Leaflet (if not already in package.json)
```bash
npm install leaflet
npm install -D @types/leaflet
```

### 5. Remove any redirect hooks
Delete or update `src/hooks.server.ts` to remove the old-route redirects.

---

## Notes for Future Rebuild
- The `[id]` trip detail page used **mock data** and was never connected to DynamoDB for reads — would need wiring to `getTrip(id)` from `tripDb.ts`
- The profile password change was a **stub** — `updatePassword` from `aws-amplify/auth` was imported but never called
- The site data in `/sites/[slug]/+page.svelte` is **fully hardcoded** — for a production rebuild, move this to DynamoDB or a CMS
- `MultiSiteMap.svelte` uses **Leaflet** loaded dynamically (client-side only) to avoid SSR issues; keep this pattern
- The `ProtectedRoute` component handles auth-gating; it redirects unauthenticated users to `/auth/signin`
