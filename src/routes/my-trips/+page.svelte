<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated, isLoading, user } from '$lib/stores/auth';
	import { getTrips, deleteTrip, type Trip } from '$lib/services/tripDb';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Toast from '$lib/components/Toast.svelte';
	
	// State
	let trips = $state<Trip[]>([]);
	let loading = $state(true);
	let error = $state('');
	let toastMessage = $state('');
	let toastType = $state<'success' | 'error' | 'info' | 'warning'>('info');
	let showToast = $state(false);
	let deletingTripId = $state<string | null>(null);
	
	// Load trips when component mounts
	onMount(async () => {
		await loadTrips();
	});
	
	async function loadTrips() {
		loading = true;
		error = '';
		
		try {
			trips = await getTrips();
			console.log(`Loaded ${trips.length} trips from database`);
		} catch (err: any) {
			console.error('Failed to load trips:', err);
			error = err.message || 'Failed to load trips. Please try again.';
			showToastMessage(error, 'error');
		} finally {
			loading = false;
		}
	}
	
	async function handleDeleteTrip(tripId: string, tripName: string) {
		if (!confirm(`Are you sure you want to delete "${tripName}"? This cannot be undone.`)) {
			return;
		}
		
		deletingTripId = tripId;
		
		try {
			await deleteTrip(tripId);
			showToastMessage('Trip deleted successfully!', 'success');
			
			// Remove from UI
			trips = trips.filter(t => t.tripId !== tripId);
		} catch (err: any) {
			console.error('Failed to delete trip:', err);
			showToastMessage(err.message || 'Failed to delete trip', 'error');
		} finally {
			deletingTripId = null;
		}
	}
	
	function showToastMessage(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
		toastMessage = message;
		toastType = type;
		showToast = true;
	}
	
	// Calculate days until feast
	function daysUntil(dateString: string): number {
		const today = new Date();
		const feastDate = new Date(dateString);
		const diffTime = feastDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}
	
	function getStatusColor(status: string) {
		switch (status) {
			case 'confirmed':
				return 'green' as const;
			case 'planned':
				return 'blue' as const;
			case 'cancelled':
				return 'zinc' as const;
			default:
				return 'blue' as const;
		}
	}
	
	function getStatusText(status: string) {
		switch (status) {
			case 'confirmed':
				return 'Confirmed';
			case 'planned':
				return 'Planned';
			case 'cancelled':
				return 'Cancelled';
			default:
				return 'Unknown';
		}
	}
	
	// Get default trip image based on location
	function getTripImage(location: string): string {
		if (location.includes('Beach')) {
			return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400';
		} else if (location.includes('Mountain') || location.includes('Ozarks')) {
			return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';
		} else {
			return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400';
		}
	}
</script>

<svelte:head>
	<title>My Trips - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
	<!-- Header -->
	<div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div>
					<Heading level={1} class="!text-white text-4xl mb-2">
						My Feast Trips
					</Heading>
					<Text class="text-blue-100">
						Plan and organize your Feast of Tabernacles experiences
					</Text>
				</div>
				<Button href="/my-trips/new" color="white" class="!text-blue-600 hover:bg-blue-50">
					➕ Create New Trip
				</Button>
			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		{#if loading}
			<!-- Loading State -->
			<Card class="text-center py-16">
				<div class="animate-spin text-6xl mb-4">⏳</div>
				<Heading level={2} class="mb-4">Loading Your Trips...</Heading>
				<Text class="text-gray-500">
					Fetching your trip data from the database
				</Text>
			</Card>
		{:else if error && trips.length === 0}
			<!-- Error State -->
			<Card class="text-center py-16">
				<div class="text-6xl mb-4">⚠️</div>
				<Heading level={2} class="mb-4">Unable to Load Trips</Heading>
				<Text class="mb-6 max-w-md mx-auto text-red-600">
					{error}
				</Text>
				<Button onclick={loadTrips} color="blue">
					Try Again
				</Button>
			</Card>
		{:else if trips.length === 0}
			<!-- Empty State -->
			<Card class="text-center py-16">
				<div class="text-6xl mb-4">🗺️</div>
				<Heading level={2} class="mb-4">No Trips Yet</Heading>
				<Text class="mb-6 max-w-md mx-auto">
					Start planning your Feast of Tabernacles experience! Create your first trip to organize flights, accommodations, and activities.
				</Text>
				<Button href="/my-trips/new" color="blue">
					Create Your First Trip
				</Button>
			</Card>
		{:else}
			<!-- Trips Grid -->
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each trips as trip (trip.tripId)}
					<Card class="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
						<!-- Image -->
						<div class="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
							<img
								src={getTripImage(trip.location)}
								alt={trip.siteName}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
							<div class="absolute top-3 right-3">
								<Badge color={getStatusColor(trip.status)}>
									{getStatusText(trip.status)}
								</Badge>
							</div>
							
							{#if trip.dates}
								{@const firstDate = trip.dates.split('-')[0]?.trim() || ''}
								{@const year = new Date().getFullYear()}
								{@const parsedDate = new Date(`${firstDate}, ${year}`)}
								{#if !isNaN(parsedDate.getTime())}
									{@const days = daysUntil(parsedDate.toISOString().split('T')[0])}
									{#if days > 0 && days < 90}
										<div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
											<Text class="text-sm font-semibold" style="color: #111827;">
												{days} days until feast
											</Text>
										</div>
									{/if}
								{/if}
							{/if}
						</div>

						<!-- Content -->
						<div class="space-y-3">
							<div>
								<Heading level={3} class="text-xl font-bold mb-1">
									{trip.siteName}
								</Heading>
								<Text variant="secondary" class="text-sm">
									📍 {trip.location}
								</Text>
								<Text variant="secondary" class="text-sm">
									{#if trip.organization}
										{trip.organization} •
									{/if}
									{trip.dates}
								</Text>
							</div>

							<!-- Trip Stats -->
							<div class="flex flex-wrap gap-2">
								<div class="flex items-center gap-1 text-sm">
									<span>�</span>
									<Text variant="secondary">{trip.attendees} {trip.attendees === 1 ? 'person' : 'people'}</Text>
								</div>
								{#if trip.accommodationType}
									<div class="flex items-center gap-1 text-sm">
										<span>🏨</span>
										<Text variant="secondary">{trip.accommodationType}</Text>
									</div>
								{/if}
								{#if trip.transportationMode}
									<div class="flex items-center gap-1 text-sm">
										<span>
											{#if trip.transportationMode === 'Flying'}✈️
											{:else if trip.transportationMode === 'Driving'}🚗
											{:else if trip.transportationMode === 'Train'}🚆
											{:else}🚌
											{/if}
										</span>
										<Text variant="secondary">{trip.transportationMode}</Text>
									</div>
								{/if}
							</div>

							<!-- Actions -->
							<div class="flex gap-2 pt-2">
								<Button 
									href="/my-trips/{trip.tripId}" 
									color="blue"
									class="flex-1"
								>
									View Trip
								</Button>
								<Button 
									outline 
									onclick={() => handleDeleteTrip(trip.tripId, trip.siteName)}
									disabled={deletingTripId === trip.tripId}
									class="px-3"
								>
									{#if deletingTripId === trip.tripId}
										⏳
									{:else}
										🗑️
									{/if}
								</Button>
							</div>
						</div>
					</Card>
				{/each}
			</div>

			<!-- Quick Stats -->
			<div class="mt-12 grid md:grid-cols-3 gap-6">
				<Card>
					<div class="text-center">
						<div class="text-4xl font-bold text-blue-600 mb-2">
							{trips.length}
						</div>
						<Text variant="secondary">Total Trips</Text>
					</div>
				</Card>
				<Card>
					<div class="text-center">
						<div class="text-4xl font-bold text-green-600 mb-2">
							{trips.filter(t => t.status === 'confirmed').length}
						</div>
						<Text variant="secondary">Confirmed</Text>
					</div>
				</Card>
				<Card>
					<div class="text-center">
						<div class="text-4xl font-bold text-blue-600 mb-2">
							{trips.filter(t => t.status === 'planned').length}
						</div>
						<Text variant="secondary">Planned</Text>
					</div>
				</Card>
			</div>
		{/if}

		<!-- Back to Home -->
		<div class="mt-12 text-center">
			<Button href="/" color="dark/zinc">
				← Back to Home
			</Button>
		</div>
	</div>
</div>

<!-- Toast Notifications -->
{#if showToast}
	<Toast 
		message={toastMessage} 
		type={toastType}
		onClose={() => showToast = false}
	/>
{/if}
