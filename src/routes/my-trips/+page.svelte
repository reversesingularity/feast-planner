<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	
	// Mock trips data (will be replaced with user's actual trips from database)
	const trips = $state([
		{
			id: '1',
			name: 'Daytona Beach 2025',
			site: 'Daytona Beach, FL',
			organization: 'COGWA',
			dates: 'October 15-23, 2025',
			startDate: '2025-10-15',
			endDate: '2025-10-23',
			status: 'planned',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
			itemCount: 12,
			hasFlights: true,
			hasHotel: true
		},
		{
			id: '2',
			name: 'Panama City Beach 2025',
			site: 'Panama City Beach, FL',
			organization: 'UCG',
			dates: 'October 15-23, 2025',
			startDate: '2025-10-15',
			endDate: '2025-10-23',
			status: 'draft',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
			itemCount: 5,
			hasFlights: false,
			hasHotel: true
		}
	]);
	
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
			case 'planned':
				return 'green' as const;
			case 'draft':
				return 'yellow' as const;
			case 'past':
				return 'zinc' as const;
			default:
				return 'blue' as const;
		}
	}
	
	function getStatusText(status: string) {
		switch (status) {
			case 'planned':
				return 'Ready';
			case 'draft':
				return 'In Progress';
			case 'past':
				return 'Completed';
			default:
				return 'Unknown';
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
		{#if trips.length === 0}
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
				{#each trips as trip (trip.id)}
					<Card class="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
						<!-- Image -->
						<div class="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
							<img
								src={trip.image}
								alt={trip.site}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
							<div class="absolute top-3 right-3">
								<Badge color={getStatusColor(trip.status)}>
									{getStatusText(trip.status)}
								</Badge>
							</div>
							
							{#if daysUntil(trip.startDate) > 0 && daysUntil(trip.startDate) < 90}
								<div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
									<Text class="text-sm font-semibold" style="color: #111827;">
										{daysUntil(trip.startDate)} days until feast
									</Text>
								</div>
							{/if}
						</div>

						<!-- Content -->
						<div class="space-y-3">
							<div>
								<Heading level={3} class="text-xl font-bold mb-1">
									{trip.name}
								</Heading>
								<Text variant="secondary" class="text-sm">
									📍 {trip.site}
								</Text>
								<Text variant="secondary" class="text-sm">
									{trip.organization} • {trip.dates}
								</Text>
							</div>

							<!-- Trip Stats -->
							<div class="flex flex-wrap gap-2">
								<div class="flex items-center gap-1 text-sm">
									<span>📋</span>
									<Text variant="secondary">{trip.itemCount} items</Text>
								</div>
								{#if trip.hasFlights}
									<div class="flex items-center gap-1 text-sm">
										<span>✈️</span>
										<Text variant="secondary">Flights added</Text>
									</div>
								{/if}
								{#if trip.hasHotel}
									<div class="flex items-center gap-1 text-sm">
										<span>🏨</span>
										<Text variant="secondary">Hotel booked</Text>
									</div>
								{/if}
							</div>

							<!-- Actions -->
							<div class="flex gap-2 pt-2">
								<Button 
									href="/my-trips/{trip.id}" 
									color="blue"
									class="flex-1"
								>
									View Trip
								</Button>
								<Button outline>
									⋮
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
							{trips.filter(t => t.status === 'planned').length}
						</div>
						<Text variant="secondary">Ready to Go</Text>
					</div>
				</Card>
				<Card>
					<div class="text-center">
						<div class="text-4xl font-bold text-yellow-600 mb-2">
							{trips.filter(t => t.status === 'draft').length}
						</div>
						<Text variant="secondary">In Progress</Text>
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
