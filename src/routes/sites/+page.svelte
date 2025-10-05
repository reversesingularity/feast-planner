<script lang="ts">
	/**
	 * Feast Site Search Page
	 * Interactive search and filter for Feast of Tabernacles sites
	 */
	
	import { browser } from '$app/environment';
	import Input from '$lib/components/Input.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	
	// Dynamically import MultiSiteMap only on client side
	let MultiSiteMap: any = $state(null);
	
	$effect(() => {
		if (browser && showMap && !MultiSiteMap) {
			import('$lib/components/MultiSiteMap.svelte').then(module => {
				MultiSiteMap = module.default;
			});
		}
	});
	
	// Search and filter state
	let searchQuery = $state('');
	let selectedLocation = $state('all');
	let selectedStatus = $state('all');
	let selectedOrganization = $state('all');
	let showMap = $state(false);
	
	// Sample Feast site data (will be replaced with real API data later)
	const allSites = [
		{
			id: 1,
			slug: 'panama-city-beach-fl',
			name: 'Panama City Beach, FL',
			location: 'United States',
			organization: 'United Church of God',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 1200,
			venues: 'Emerald Coast Convention Center',
			description: 'Beautiful beach location with family-friendly activities and excellent accommodations.',
			hotels: 5,
			activities: ['Beach access', 'Family activities', 'Youth programs'],
			lat: 30.1588,
			lng: -85.8051
		},
		{
			id: 2,
			slug: 'wisconsin-dells-wi',
			name: 'Wisconsin Dells, WI',
			location: 'United States',
			organization: 'Church of God International',
			dates: 'October 6-15, 2025',
			status: 'full',
			attendees: 850,
			venues: 'Kalahari Convention Center',
			description: 'Indoor waterpark resort perfect for families with extensive facilities.',
			hotels: 4,
			activities: ['Waterparks', 'Indoor activities', 'Family entertainment'],
			lat: 43.6274,
			lng: -89.7710
		},
		{
			id: 3,
			slug: 'lake-of-the-ozarks-mo',
			name: 'Lake of the Ozarks, MO',
			location: 'United States',
			organization: 'Living Church of God',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 650,
			venues: 'Lodge of Four Seasons',
			description: 'Scenic lake resort with outdoor activities and peaceful surroundings.',
			hotels: 3,
			activities: ['Lake activities', 'Hiking', 'Golf'],
			lat: 38.1997,
			lng: -92.8088
		},
		{
			id: 4,
			slug: 'daytona-beach-fl',
			name: 'Daytona Beach, FL',
			location: 'United States',
			organization: 'Church of God, a Worldwide Association',
			dates: 'October 6-15, 2025',
			status: 'limited',
			attendees: 980,
			venues: 'Ocean Center',
			description: 'Coastal location with excellent beach access and boardwalk entertainment.',
			hotels: 6,
			activities: ['Beach', 'Boardwalk', 'Ocean activities'],
			lat: 29.2108,
			lng: -81.0228
		},
		{
			id: 5,
			slug: 'branson-mo',
			name: 'Branson, MO',
			location: 'United States',
			organization: 'Church of the Great God',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 720,
			venues: 'Branson Convention Center',
			description: 'Entertainment capital with numerous shows and family attractions.',
			hotels: 7,
			activities: ['Live shows', 'Theme parks', 'Dining'],
			lat: 36.6437,
			lng: -93.2185
		},
		{
			id: 6,
			slug: 'victoria-bc',
			name: 'Victoria, BC',
			location: 'Canada',
			organization: 'United Church of God',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 420,
			venues: 'Victoria Conference Centre',
			description: 'Historic Canadian city with beautiful gardens and cultural attractions.',
			hotels: 4,
			activities: ['Gardens', 'Museums', 'Harbor tours'],
			lat: 48.4284,
			lng: -123.3656
		},
		{
			id: 7,
			slug: 'jekyll-island-ga',
			name: 'Jekyll Island, GA',
			location: 'United States',
			organization: 'Restored Church of God',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 550,
			venues: 'Jekyll Island Convention Center',
			description: 'Quiet island retreat with pristine beaches and nature trails.',
			hotels: 3,
			activities: ['Beach', 'Biking', 'Nature'],
			lat: 31.0746,
			lng: -81.4179
		},
		{
			id: 8,
			slug: 'tucson-az',
			name: 'Tucson, AZ',
			location: 'United States',
			organization: 'Philadelphia Church of God',
			dates: 'October 6-15, 2025',
			status: 'limited',
			attendees: 890,
			venues: 'Tucson Convention Center',
			description: 'Desert location with unique southwestern culture and scenic beauty.',
			hotels: 5,
			activities: ['Desert tours', 'Hiking', 'Cultural sites'],
			lat: 32.2226,
			lng: -110.9747
		},
		{
			id: 9,
			slug: 'taupo-nz',
			name: 'Taupō, New Zealand',
			location: 'New Zealand',
			organization: 'Church of God, a Worldwide Association',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 60,
			venues: 'Huka Falls Conference Centre',
			description: 'Beautiful North Island location set among 7 hectares of landscaped gardens and vineyards. Home to New Zealand\'s most-visited natural attraction, Huka Falls, and the country\'s largest lake.',
			hotels: 12,
			activities: ['Huka Falls', 'Lake Taupo', 'Geothermal parks', 'Skydiving', 'Māori culture'],
			lat: -38.653957,
			lng: 176.087980
		},
		{
			id: 10,
			slug: 'bacolod-philippines',
			name: 'Bacolod, Philippines',
			location: 'Philippines',
			organization: 'Church of God, a Worldwide Association',
			dates: 'October 6-15, 2025',
			status: 'available',
			attendees: 270,
			venues: 'Nature\'s Village Resort',
			description: 'Idyllic garden paradise in the "City of Smiles," nestled 3.5km from Bacolod City against Mount Marapara. Experience sustainable hospitality, vibrant MassKara Festival culture, and the famous Chicken Inasal. Features 82 air-conditioned rooms, 2 outdoor pools, spa services, and sustainable garden tours.',
			hotels: 1,
			activities: ['The Ruins', 'MassKara Festival', 'Swimming pools', 'Spa/massage', 'Sustainable garden tours', 'San Sebastian Cathedral', 'Silay Heritage Houses', 'Mambukal Hot Springs', 'Lakawon Island'],
			lat: 10.72609,
			lng: 122.96410
		},
	];
	
	// Get unique values for filters
	const locations = $derived(['all', ...new Set(allSites.map(s => s.location))]);
	const organizations = $derived(['all', ...new Set(allSites.map(s => s.organization))]);
	
	// Filter sites based on search and filters
	const filteredSites = $derived(() => {
		return allSites.filter(site => {
			// Search filter
			const matchesSearch = searchQuery === '' || 
				site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				site.venues.toLowerCase().includes(searchQuery.toLowerCase());
			
			// Location filter
			const matchesLocation = selectedLocation === 'all' || site.location === selectedLocation;
			
			// Status filter
			const matchesStatus = selectedStatus === 'all' || site.status === selectedStatus;
			
			// Organization filter
			const matchesOrganization = selectedOrganization === 'all' || site.organization === selectedOrganization;
			
			return matchesSearch && matchesLocation && matchesStatus && matchesOrganization;
		});
	});
	
	// Result count
	const resultCount = $derived(filteredSites().length);
	
	// Reset all filters
	function resetFilters() {
		searchQuery = '';
		selectedLocation = 'all';
		selectedStatus = 'all';
		selectedOrganization = 'all';
	}
	
	// Get badge color based on status
	function getStatusColor(status: string) {
		switch (status) {
			case 'available':
				return 'green' as const;
			case 'limited':
				return 'yellow' as const;
			case 'full':
				return 'red' as const;
			default:
				return 'zinc' as const;
		}
	}
	
	// Get status display text
	function getStatusText(status: string) {
		switch (status) {
			case 'available':
				return 'Available';
			case 'limited':
				return 'Limited Spots';
			case 'full':
				return 'Full';
			default:
				return 'Unknown';
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
	<!-- Header -->
	<div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
					🗺️ Find Your Feast Site
				</h1>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Search and compare Feast of Tabernacles locations worldwide
				</p>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Search and Filters -->
		<div class="mb-8">
			<Card class="mb-6">
				<div class="space-y-6">
					<!-- Search Bar -->
					<div>
						<Input
							type="search"
							bind:value={searchQuery}
							placeholder="Search by city, venue, or description..."
							class="text-lg"
						/>
					</div>
					
					<!-- Filter Row -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<!-- Location Filter -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Location
							</label>
							<select
								bind:value={selectedLocation}
								class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{#each locations as location}
									<option value={location}>
										{location === 'all' ? 'All Locations' : location}
									</option>
								{/each}
							</select>
						</div>
						
						<!-- Status Filter -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Availability
							</label>
							<select
								bind:value={selectedStatus}
								class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="all">All Sites</option>
								<option value="available">Available</option>
								<option value="limited">Limited Spots</option>
								<option value="full">Full</option>
							</select>
						</div>
						
						<!-- Organization Filter -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Organization
							</label>
							<select
								bind:value={selectedOrganization}
								class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{#each organizations as org}
									<option value={org}>
										{org === 'all' ? 'All Organizations' : org}
									</option>
								{/each}
							</select>
						</div>
					</div>
					
					<!-- Active Filters & Reset -->
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2 flex-wrap">
							<span class="text-sm text-gray-600 dark:text-gray-400">
								{resultCount} {resultCount === 1 ? 'site' : 'sites'} found
							</span>
							{#if searchQuery}
								<Badge color="blue">Search: "{searchQuery}"</Badge>
							{/if}
							{#if selectedLocation !== 'all'}
								<Badge color="purple">{selectedLocation}</Badge>
							{/if}
							{#if selectedStatus !== 'all'}
								<Badge color={getStatusColor(selectedStatus)}>{getStatusText(selectedStatus)}</Badge>
							{/if}
							{#if selectedOrganization !== 'all'}
								<Badge color="indigo">{selectedOrganization}</Badge>
							{/if}
						</div>
						
						{#if searchQuery || selectedLocation !== 'all' || selectedStatus !== 'all' || selectedOrganization !== 'all'}
							<Button plain onclick={resetFilters}>
								Clear All Filters
							</Button>
						{/if}
					</div>
				</div>
			</Card>
		</div>

		<!-- View Toggle -->
		<div class="mb-6 flex justify-center">
			<div class="inline-flex rounded-lg shadow-sm bg-white dark:bg-gray-800 p-1">
				<button
					onclick={() => showMap = false}
					class="px-4 py-2 rounded-md text-sm font-medium transition-colors {!showMap ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}"
				>
					📋 List View
				</button>
				<button
					onclick={() => showMap = true}
					class="px-4 py-2 rounded-md text-sm font-medium transition-colors {showMap ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}"
				>
					🗺️ Map View
				</button>
			</div>
		</div>

		<!-- Results -->
		{#if resultCount === 0}
			<!-- No Results -->
			<Card class="text-center py-12">
				<div class="text-6xl mb-4">🔍</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
					No sites found
				</h3>
				<p class="text-gray-600 dark:text-gray-400 mb-4">
					Try adjusting your search or filters
				</p>
				<Button color="blue" onclick={resetFilters}>
					Reset Filters
				</Button>
			</Card>
		{:else if showMap}
			<!-- Map View -->
			<Card class="mb-8">
				{#if MultiSiteMap}
					<svelte:component 
						this={MultiSiteMap}
						sites={filteredSites().map(site => ({
							id: site.id,
							slug: site.slug,
							name: site.name,
							lat: site.lat,
							lng: site.lng,
							organization: site.organization,
							status: site.status
						}))}
						height="600px"
					/>
				{:else}
					<div class="flex items-center justify-center py-12">
						<div class="text-center">
							<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p class="text-gray-600">Loading map...</p>
						</div>
					</div>
				{/if}
			</Card>
			
			<!-- Quick List Below Map -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each filteredSites() as site (site.id)}
					<Card hoverable>
						<div class="space-y-2">
							<h3 class="font-bold text-base text-gray-900 dark:text-white">
								{site.name}
							</h3>
							<Badge color={getStatusColor(site.status)} class="text-xs">
								{getStatusText(site.status)}
							</Badge>
							<p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
								{site.organization}
							</p>
							<Button href="/sites/{site.slug}" color="blue" size="sm" class="w-full mt-2">
								View Details
							</Button>
						</div>
					</Card>
				{/each}
			</div>
		{:else}
			<!-- Site Cards Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredSites() as site (site.id)}
					<Card hoverable>
						{#snippet header()}
							<div class="space-y-2">
								<div class="flex items-start justify-between gap-2">
									<h3 class="font-bold text-lg text-gray-900 dark:text-white flex-1">
										{site.name}
									</h3>
									<Badge color={getStatusColor(site.status)}>
										{getStatusText(site.status)}
									</Badge>
								</div>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									{site.organization}
								</p>
							</div>
						{/snippet}
						
						<div class="space-y-3">
							<!-- Key Info -->
							<div class="space-y-2 text-sm">
								<div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
									<span>📅</span>
									<span>{site.dates}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
									<span>📍</span>
									<span>{site.venues}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
									<span>👥</span>
									<span>{site.attendees} expected attendees</span>
								</div>
								<div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
									<span>🏨</span>
									<span>{site.hotels} hotel partners</span>
								</div>
							</div>
							
							<!-- Description -->
							<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
								{site.description}
							</p>
							
							<!-- Activities -->
							<div class="flex flex-wrap gap-1">
								{#each site.activities as activity}
									<Badge color="cyan">{activity}</Badge>
								{/each}
							</div>
						</div>
						
						{#snippet footer()}
							<div class="flex gap-2">
								<Button href="/sites/{site.slug}" color="blue" class="flex-1">
									View Details
								</Button>
								<Button outline>
									Save
								</Button>
							</div>
						{/snippet}
					</Card>
				{/each}
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
