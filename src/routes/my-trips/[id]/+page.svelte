<script lang="ts">
	import { page } from '$app/stores';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Badge from '$lib/components/Badge.svelte';
	
	const tripId = $derived($page.params.id);
	
	// Mock trip data (would come from database)
	const trip = $state({
		id: tripId,
		name: 'Daytona Beach 2025',
		site: 'Daytona Beach, FL',
		siteSlug: 'daytona-beach-fl',
		organization: 'COGWA',
		dates: 'October 15-23, 2025',
		startDate: '2025-10-15',
		endDate: '2025-10-23',
		status: 'planned',
		image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
	});
	
	// Itinerary items (automatically includes service schedule + user-added items)
	const itineraryItems = $state([
		{
			id: '1',
			type: 'service',
			title: 'First Holy Day - Morning Service',
			date: '2025-10-15',
			time: '10:00 AM',
			location: 'Ocean Center',
			icon: '⛪',
			editable: false
		},
		{
			id: '2',
			type: 'service',
			title: 'First Holy Day - Afternoon Service',
			date: '2025-10-15',
			time: '2:30 PM',
			location: 'Ocean Center',
			icon: '⛪',
			editable: false
		},
		{
			id: '3',
			type: 'flight',
			title: 'Flight to Daytona Beach',
			date: '2025-10-15',
			time: '8:00 AM',
			details: 'Delta 1234 • ATL → DAB',
			confirmation: 'ABC123',
			icon: '✈️',
			editable: true
		},
		{
			id: '4',
			type: 'hotel',
			title: 'Hilton Daytona Beach Oceanfront',
			date: '2025-10-15',
			time: '3:00 PM',
			details: 'Check-in • 8 nights',
			confirmation: 'HTL456789',
			icon: '🏨',
			editable: true
		},
		{
			id: '5',
			type: 'activity',
			title: 'Welcome Dinner',
			date: '2025-10-15',
			time: '6:00 PM',
			details: 'Ocean Deck Restaurant',
			icon: '🍽️',
			editable: true
		}
	]);
	
	// Modal states
	let showAddFlightModal = $state(false);
	let showAddHotelModal = $state(false);
	let showAddActivityModal = $state(false);
	
	// Form states for adding items
	let newFlight = $state({
		airline: '',
		flightNumber: '',
		date: trip.startDate,
		time: '',
		from: '',
		to: '',
		confirmation: ''
	});
	
	let newHotel = $state({
		name: '',
		checkIn: trip.startDate,
		checkOut: trip.endDate,
		confirmation: '',
		address: ''
	});
	
	let newActivity = $state({
		title: '',
		date: trip.startDate,
		time: '',
		location: '',
		notes: ''
	});
	
	// Sort items chronologically
	const sortedItems = $derived(
		[...itineraryItems].sort((a, b) => {
			const dateA = new Date(`${a.date} ${a.time || '00:00'}`);
			const dateB = new Date(`${b.date} ${b.time || '00:00'}`);
			return dateA.getTime() - dateB.getTime();
		})
	);
	
	// Group items by date
	const groupedItems = $derived(() => {
		const groups: Record<string, typeof itineraryItems> = {};
		sortedItems.forEach(item => {
			if (!groups[item.date]) {
				groups[item.date] = [];
			}
			groups[item.date].push(item);
		});
		return groups;
	});
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			weekday: 'long', 
			month: 'long', 
			day: 'numeric',
			year: 'numeric'
		});
	}
	
	function addFlight() {
		const newItem = {
			id: Date.now().toString(),
			type: 'flight' as const,
			title: `Flight ${newFlight.from} → ${newFlight.to}`,
			date: newFlight.date,
			time: newFlight.time,
			details: `${newFlight.airline} ${newFlight.flightNumber}`,
			confirmation: newFlight.confirmation,
			icon: '✈️',
			editable: true
		};
		itineraryItems.push(newItem);
		showAddFlightModal = false;
		// Reset form
		newFlight = {
			airline: '',
			flightNumber: '',
			date: trip.startDate,
			time: '',
			from: '',
			to: '',
			confirmation: ''
		};
	}
	
	function addHotel() {
		const newItem = {
			id: Date.now().toString(),
			type: 'hotel' as const,
			title: newHotel.name,
			date: newHotel.checkIn,
			time: '3:00 PM',
			details: `Check-in • Through ${new Date(newHotel.checkOut).toLocaleDateString()}`,
			confirmation: newHotel.confirmation,
			icon: '🏨',
			editable: true
		};
		itineraryItems.push(newItem);
		showAddHotelModal = false;
		// Reset form
		newHotel = {
			name: '',
			checkIn: trip.startDate,
			checkOut: trip.endDate,
			confirmation: '',
			address: ''
		};
	}
	
	function addActivity() {
		const newItem = {
			id: Date.now().toString(),
			type: 'activity' as const,
			title: newActivity.title,
			date: newActivity.date,
			time: newActivity.time,
			details: newActivity.location,
			icon: '🎯',
			editable: true
		};
		itineraryItems.push(newItem);
		showAddActivityModal = false;
		// Reset form
		newActivity = {
			title: '',
			date: trip.startDate,
			time: '',
			location: '',
			notes: ''
		};
	}
	
	function deleteItem(id: string) {
		const index = itineraryItems.findIndex(item => item.id === id);
		if (index !== -1) {
			itineraryItems.splice(index, 1);
		}
	}
</script>

<svelte:head>
	<title>{trip.name} - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
	<!-- Hero Header -->
	<div class="relative h-64 bg-cover bg-center" style="background-image: url('{trip.image}');">
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
		<div class="absolute inset-0 flex flex-col justify-end p-6">
			<div class="max-w-7xl mx-auto w-full">
				<Heading level={1} class="!text-white text-3xl md:text-4xl mb-2">
					{trip.name}
				</Heading>
				<div class="flex flex-wrap items-center gap-3 text-white/90">
					<span>📍 {trip.site}</span>
					<span>•</span>
					<span>📅 {trip.dates}</span>
					<span>•</span>
					<span>⛪ {trip.organization}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Main Content - Itinerary -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Quick Actions -->
				<Card>
					<Heading level={2} variant="subheading" class="mb-4">Add to Itinerary</Heading>
					<div class="grid md:grid-cols-3 gap-3">
						<Button 
							color="blue" 
							class="w-full"
							onclick={() => showAddFlightModal = true}
						>
							✈️ Add Flight
						</Button>
						<Button 
							color="blue" 
							class="w-full"
							onclick={() => showAddHotelModal = true}
						>
							🏨 Add Hotel
						</Button>
						<Button 
							color="blue" 
							class="w-full"
							onclick={() => showAddActivityModal = true}
						>
							🎯 Add Activity
						</Button>
					</div>
				</Card>

				<!-- Itinerary Timeline -->
				<Card>
					<Heading level={2} variant="subheading" class="mb-6">Your Itinerary</Heading>
					
					<div class="space-y-8">
						{#each Object.entries(groupedItems()) as [date, items]}
							<div>
								<div class="sticky top-0 bg-white py-2 mb-4 border-b border-gray-200">
									<Text class="font-semibold text-lg" style="color: #111827;">
										{formatDate(date)}
									</Text>
								</div>
								
								<div class="space-y-3">
									{#each items as item}
										<div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
											<div class="text-3xl flex-shrink-0">
												{item.icon}
											</div>
											<div class="flex-1 min-w-0">
												<div class="flex items-start justify-between gap-2">
													<div class="flex-1">
														<Text class="font-semibold" style="color: #111827;">
															{item.title}
														</Text>
														<Text variant="secondary" class="text-sm">
															{item.time}
															{#if item.location}
																• {item.location}
															{/if}
														</Text>
														{#if item.details}
															<Text variant="secondary" class="text-sm mt-1">
																{item.details}
															</Text>
														{/if}
														{#if item.confirmation}
															<div class="mt-2">
																<Badge color="zinc">
																	Conf: {item.confirmation}
																</Badge>
															</div>
														{/if}
													</div>
													{#if item.editable}
														<Button 
															plain 
															class="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
															onclick={() => deleteItem(item.id)}
														>
															🗑️
														</Button>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</Card>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Trip Summary -->
				<Card>
					<Heading level={3} class="text-lg font-semibold mb-4">Trip Summary</Heading>
					<div class="space-y-3">
						<div class="flex justify-between">
							<Text variant="secondary">Total Items:</Text>
							<Text class="font-semibold" style="color: #111827;">{itineraryItems.length}</Text>
						</div>
						<div class="flex justify-between">
							<Text variant="secondary">Services:</Text>
							<Text class="font-semibold" style="color: #111827;">
								{itineraryItems.filter(i => i.type === 'service').length}
							</Text>
						</div>
						<div class="flex justify-between">
							<Text variant="secondary">Flights:</Text>
							<Text class="font-semibold" style="color: #111827;">
								{itineraryItems.filter(i => i.type === 'flight').length}
							</Text>
						</div>
						<div class="flex justify-between">
							<Text variant="secondary">Hotels:</Text>
							<Text class="font-semibold" style="color: #111827;">
								{itineraryItems.filter(i => i.type === 'hotel').length}
							</Text>
						</div>
						<div class="flex justify-between">
							<Text variant="secondary">Activities:</Text>
							<Text class="font-semibold" style="color: #111827;">
								{itineraryItems.filter(i => i.type === 'activity').length}
							</Text>
						</div>
					</div>
				</Card>

				<!-- Quick Links -->
				<Card>
					<Heading level={3} class="text-lg font-semibold mb-4">Quick Links</Heading>
					<div class="space-y-2">
						<Button href="/sites/{trip.siteSlug}" outline class="w-full">
							📍 View Site Details
						</Button>
						<Button outline class="w-full">
							📤 Share Trip
						</Button>
						<Button outline class="w-full">
							📄 Export PDF
						</Button>
						<Button outline class="w-full text-red-600 hover:bg-red-50">
							🗑️ Delete Trip
						</Button>
					</div>
				</Card>

				<!-- Tips -->
				<Card>
					<Heading level={3} class="text-lg font-semibold mb-4">💡 Planning Tips</Heading>
					<div class="space-y-2 text-sm">
						<Text variant="secondary">
							• Book flights early for best prices
						</Text>
						<Text variant="secondary">
							• Check hotel group rates
						</Text>
						<Text variant="secondary">
							• Service schedule auto-updates
						</Text>
						<Text variant="secondary">
							• Add custom notes for each day
						</Text>
					</div>
				</Card>
			</div>
		</div>

		<!-- Back Button -->
		<div class="mt-8 text-center">
			<Button href="/my-trips" color="dark/zinc">
				← Back to All Trips
			</Button>
		</div>
	</div>
</div>

<!-- Add Flight Modal -->
{#if showAddFlightModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onclick={() => showAddFlightModal = false}>
		<Card class="max-w-lg w-full" onclick={(e) => e.stopPropagation()}>
			{#snippet header()}
				<Heading level={2} variant="subheading">Add Flight</Heading>
			{/snippet}
			
			<div class="space-y-4">
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Airline</Text>
						</label>
						<Input type="text" bind:value={newFlight.airline} placeholder="Delta" />
					</div>
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Flight Number</Text>
						</label>
						<Input type="text" bind:value={newFlight.flightNumber} placeholder="1234" />
					</div>
				</div>
				
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">From</Text>
						</label>
						<Input type="text" bind:value={newFlight.from} placeholder="ATL" />
					</div>
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">To</Text>
						</label>
						<Input type="text" bind:value={newFlight.to} placeholder="DAB" />
					</div>
				</div>
				
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Date</Text>
						</label>
						<Input type="date" bind:value={newFlight.date} />
					</div>
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Time</Text>
						</label>
						<Input type="time" bind:value={newFlight.time} />
					</div>
				</div>
				
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Confirmation Number</Text>
					</label>
					<Input type="text" bind:value={newFlight.confirmation} placeholder="ABC123" />
				</div>
			</div>
			
			{#snippet footer()}
				<div class="flex gap-2 justify-end">
					<Button outline onclick={() => showAddFlightModal = false}>
						Cancel
					</Button>
					<Button 
						color="blue" 
						onclick={addFlight}
						disabled={!newFlight.airline || !newFlight.from || !newFlight.to}
					>
						Add Flight
					</Button>
				</div>
			{/snippet}
		</Card>
	</div>
{/if}

<!-- Add Hotel Modal -->
{#if showAddHotelModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onclick={() => showAddHotelModal = false}>
		<Card class="max-w-lg w-full" onclick={(e) => e.stopPropagation()}>
			{#snippet header()}
				<Heading level={2} variant="subheading">Add Hotel</Heading>
			{/snippet}
			
			<div class="space-y-4">
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Hotel Name</Text>
					</label>
					<Input type="text" bind:value={newHotel.name} placeholder="Hilton Daytona Beach" />
				</div>
				
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Check-in Date</Text>
						</label>
						<Input type="date" bind:value={newHotel.checkIn} />
					</div>
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Check-out Date</Text>
						</label>
						<Input type="date" bind:value={newHotel.checkOut} />
					</div>
				</div>
				
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Confirmation Number</Text>
					</label>
					<Input type="text" bind:value={newHotel.confirmation} placeholder="HTL456789" />
				</div>
				
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Address (Optional)</Text>
					</label>
					<Input type="text" bind:value={newHotel.address} placeholder="123 Beach Blvd" />
				</div>
			</div>
			
			{#snippet footer()}
				<div class="flex gap-2 justify-end">
					<Button outline onclick={() => showAddHotelModal = false}>
						Cancel
					</Button>
					<Button 
						color="blue" 
						onclick={addHotel}
						disabled={!newHotel.name}
					>
						Add Hotel
					</Button>
				</div>
			{/snippet}
		</Card>
	</div>
{/if}

<!-- Add Activity Modal -->
{#if showAddActivityModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onclick={() => showAddActivityModal = false}>
		<Card class="max-w-lg w-full" onclick={(e) => e.stopPropagation()}>
			{#snippet header()}
				<Heading level={2} variant="subheading">Add Activity</Heading>
			{/snippet}
			
			<div class="space-y-4">
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Activity Title</Text>
					</label>
					<Input type="text" bind:value={newActivity.title} placeholder="Beach Day" />
				</div>
				
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Date</Text>
						</label>
						<Input type="date" bind:value={newActivity.date} />
					</div>
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Time</Text>
						</label>
						<Input type="time" bind:value={newActivity.time} />
					</div>
				</div>
				
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Location (Optional)</Text>
					</label>
					<Input type="text" bind:value={newActivity.location} placeholder="Ocean Deck Restaurant" />
				</div>
				
				<div>
					<label class="block mb-2">
						<Text class="font-medium" style="color: #111827;">Notes (Optional)</Text>
					</label>
					<textarea
						bind:value={newActivity.notes}
						placeholder="Any additional details..."
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
						rows="3"
					></textarea>
				</div>
			</div>
			
			{#snippet footer()}
				<div class="flex gap-2 justify-end">
					<Button outline onclick={() => showAddActivityModal = false}>
						Cancel
					</Button>
					<Button 
						color="blue" 
						onclick={addActivity}
						disabled={!newActivity.title}
					>
						Add Activity
					</Button>
				</div>
			{/snippet}
		</Card>
	</div>
{/if}
