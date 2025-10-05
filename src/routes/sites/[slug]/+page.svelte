<script lang="ts">
	import { page } from '$app/stores';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	
	// Get the site slug from the URL
	const slug = $derived($page.params.slug);
	
	// Mock data - will be replaced with real data from AWS later
	const siteData: Record<string, any> = {
		'lake-of-the-ozarks-mo': {
			name: 'Lake of the Ozarks, Missouri',
			shortName: 'Lake of the Ozarks',
			location: 'Osage Beach, Missouri',
			country: 'USA',
			coordinates: { lat: 38.1561, lng: -92.6376 },
			rating: 4.8,
			reviewCount: 342,
			attendees: '1,500+',
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
			description: 'Experience the Feast at one of America\'s premier vacation destinations. Lake of the Ozarks offers 1,150 miles of shoreline, world-class dining, and endless recreational activities.',
			highlights: [
				'Beautiful lakefront location',
				'Family-friendly activities',
				'Excellent restaurants',
				'Water sports and boating',
				'Golf courses nearby'
			],
			meetingLocation: 'Lodge of Four Seasons Conference Center',
			meetingAddress: '315 Four Seasons Dr, Lake Ozark, MO 65049',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:30 PM', type: 'Afternoon Service' },
				{ day: 'Regular Days', time: '10:00 AM', type: 'Daily Services' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 75,
				avgLow: 55,
				rainfall: 'Low',
				conditions: 'Sunny and pleasant'
			},
			accommodations: [
				{ name: 'Lodge of Four Seasons', type: 'Resort', price: '$189', distance: '0.1 mi', rating: 4.6 },
				{ name: 'Margaritaville Lake Resort', type: 'Resort', price: '$229', distance: '2.3 mi', rating: 4.7 },
				{ name: 'Inn at Grand Glaize', type: 'Hotel', price: '$139', distance: '1.5 mi', rating: 4.4 },
				{ name: 'Camden on the Lake', type: 'Resort', price: '$199', distance: '5.2 mi', rating: 4.5 }
			],
			dining: [
				{ name: 'JB Hooks', cuisine: 'Steakhouse', price: '$$$', rating: 4.6 },
				{ name: 'Blue Heron', cuisine: 'American', price: '$$', rating: 4.5 },
				{ name: 'Bentley\'s', cuisine: 'Seafood', price: '$$$', rating: 4.7 },
				{ name: 'Li\'l Rizzo\'s', cuisine: 'Italian', price: '$$', rating: 4.4 }
			],
			activities: [
				{ name: 'Lake Cruises', category: 'Water Activities', icon: '🚤' },
				{ name: 'Golf Courses', category: 'Recreation', icon: '⛳' },
				{ name: 'Outlet Shopping', category: 'Shopping', icon: '🛍️' },
				{ name: 'Hiking Trails', category: 'Nature', icon: '🥾' },
				{ name: 'Bagnell Dam', category: 'Sightseeing', icon: '🏞️' }
			],
			reviews: [
				{ author: 'Sarah M.', avatar: 'SM', rating: 5, date: '2024', text: 'Amazing location! The lake is beautiful and there are so many family-friendly activities. The services were well-organized and the fellowship was wonderful.' },
				{ author: 'David L.', avatar: 'DL', rating: 5, date: '2024', text: 'This was our first time at Lake of the Ozarks and we loved it. Great restaurants, beautiful scenery, and perfect weather. Highly recommend!' },
				{ author: 'Jennifer K.', avatar: 'JK', rating: 4, date: '2023', text: 'Wonderful feast site with plenty to do. The accommodations were comfortable and the area is very family-oriented. Can\'t wait to return!' }
			],
			costEstimate: {
				accommodations: { min: 900, max: 1800, note: '8 nights average' },
				meals: { min: 400, max: 800, note: 'Per person' },
				activities: { min: 200, max: 500, note: 'Optional' },
				travel: { min: 200, max: 1000, note: 'Varies by distance' }
			}
		}
	};
	
	const site = $derived(siteData[slug] || null);
	
	let bookmarked = $state(false);
</script>

<svelte:head>
	<title>{site?.name || 'Site Details'} - Feast Planner</title>
</svelte:head>

{#if !site}
	<div class="min-h-screen flex items-center justify-center">
		<Card class="max-w-md">
			<Heading level={2}>Site Not Found</Heading>
			<Text class="mt-4">The feast site you're looking for doesn't exist.</Text>
			<Button href="/sites" class="mt-6">← Back to Sites</Button>
		</Card>
	</div>
{:else}
	<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
		<!-- Hero Section -->
		<div class="relative h-96 bg-cover bg-center" style="background-image: url('{site.image}');">
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
			<div class="absolute inset-0 flex flex-col justify-end p-8">
				<div class="max-w-7xl mx-auto w-full">
					<Heading level={1} class="!text-white text-4xl md:text-5xl mb-2">
						{site.name}
					</Heading>
					<div class="flex flex-wrap items-center gap-4 text-white/90">
						<span class="flex items-center gap-1">
							⭐ {site.rating} ({site.reviewCount} reviews)
						</span>
						<span>•</span>
						<span>👥 {site.attendees} attendees</span>
						<span>•</span>
						<span>📍 {site.location}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<!-- Quick Actions -->
			<div class="flex flex-wrap gap-4 mb-8">
				<Button color="blue">
					📅 Add to My Plan
				</Button>
				<Button 
					outline 
					onclick={() => bookmarked = !bookmarked}
				>
					{bookmarked ? '❤️ Bookmarked' : '🔖 Bookmark'}
				</Button>
				<Button outline>
					📤 Share
				</Button>
			</div>

			<div class="grid lg:grid-cols-3 gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-8">
					<!-- Overview -->
					<Card>
						{#snippet header()}
							<Heading level={2} variant="subheading">Overview</Heading>
						{/snippet}
						
						<Text class="text-lg leading-relaxed">
							{site.description}
						</Text>
						
						<div class="mt-6">
							<Heading level={3} class="text-lg font-semibold mb-3">Highlights</Heading>
							<ul class="grid md:grid-cols-2 gap-2">
								{#each site.highlights as highlight}
									<li class="flex items-start gap-2">
										<span class="text-green-600 mt-1">✓</span>
										<Text>{highlight}</Text>
									</li>
								{/each}
							</ul>
						</div>
					</Card>

					<!-- Service Schedule -->
					<Card>
						{#snippet header()}
							<Heading level={2} variant="subheading">📅 Service Schedule</Heading>
						{/snippet}
						
						<div class="space-y-4">
							<div class="bg-blue-50 p-4 rounded-lg">
								<Text class="font-medium" style="color: #111827;">📍 {site.meetingLocation}</Text>
								<Text variant="secondary" class="text-sm mt-1">{site.meetingAddress}</Text>
							</div>
							
							<div class="space-y-3">
								{#each site.services as service}
									<div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
										<div>
											<Text class="font-medium" style="color: #111827;">{service.day}</Text>
											<Text variant="secondary" class="text-sm">{service.type}</Text>
										</div>
										<Text class="font-semibold text-blue-600">{service.time}</Text>
									</div>
								{/each}
							</div>
						</div>
					</Card>

					<!-- Activities -->
					<Card>
						{#snippet header()}
							<Heading level={2} variant="subheading">🎯 Things to Do</Heading>
						{/snippet}
						
						<div class="grid md:grid-cols-2 gap-4">
							{#each site.activities as activity}
								<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
									<span class="text-3xl">{activity.icon}</span>
									<div>
										<Text class="font-medium" style="color: #111827;">{activity.name}</Text>
										<Text variant="secondary" class="text-sm">{activity.category}</Text>
									</div>
								</div>
							{/each}
						</div>
					</Card>

					<!-- Reviews -->
					<Card>
						{#snippet header()}
							<Heading level={2} variant="subheading">⭐ Reviews</Heading>
						{/snippet}
						
						<div class="space-y-6">
							{#each site.reviews as review}
								<div class="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
									<div class="flex items-start gap-4">
										<Avatar 
											initials={review.avatar} 
											class="size-12 bg-blue-500 text-white flex-shrink-0"
										/>
										<div class="flex-1">
											<div class="flex items-center gap-2 mb-1">
												<Text class="font-semibold" style="color: #111827;">{review.author}</Text>
												<span class="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
												<Text variant="secondary" class="text-sm">• {review.date}</Text>
											</div>
											<Text class="leading-relaxed">{review.text}</Text>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</Card>
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Weather -->
					<Card>
						{#snippet header()}
							<Heading level={3} class="text-lg font-semibold">🌤️ Weather</Heading>
						{/snippet}
						
						<div class="space-y-3">
							<div class="flex justify-between">
								<Text variant="secondary">Avg High:</Text>
								<Text class="font-semibold" style="color: #111827;">{site.weather.avgHigh}°F</Text>
							</div>
							<div class="flex justify-between">
								<Text variant="secondary">Avg Low:</Text>
								<Text class="font-semibold" style="color: #111827;">{site.weather.avgLow}°F</Text>
							</div>
							<div class="flex justify-between">
								<Text variant="secondary">Rainfall:</Text>
								<Text class="font-semibold" style="color: #111827;">{site.weather.rainfall}</Text>
							</div>
							<div class="bg-blue-50 p-3 rounded-lg mt-4">
								<Text class="text-sm text-center">{site.weather.conditions}</Text>
							</div>
						</div>
					</Card>

					<!-- Accommodations -->
					<Card>
						{#snippet header()}
							<Heading level={3} class="text-lg font-semibold">🏨 Nearby Hotels</Heading>
						{/snippet}
						
						<div class="space-y-3">
							{#each site.accommodations as hotel}
								<div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
									<div class="flex justify-between items-start mb-1">
										<Text class="font-medium text-sm" style="color: #111827;">{hotel.name}</Text>
										<Text class="font-bold text-blue-600">{hotel.price}</Text>
									</div>
									<div class="flex items-center gap-2 text-xs">
										<Text variant="secondary">{hotel.type}</Text>
										<span>•</span>
										<Text variant="secondary">{hotel.distance}</Text>
										<span>•</span>
										<span class="text-yellow-600">⭐ {hotel.rating}</span>
									</div>
								</div>
							{/each}
						</div>
					</Card>

					<!-- Dining -->
					<Card>
						{#snippet header()}
							<Heading level={3} class="text-lg font-semibold">🍽️ Restaurants</Heading>
						{/snippet}
						
						<div class="space-y-3">
							{#each site.dining as restaurant}
								<div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
									<div class="flex justify-between items-start mb-1">
										<Text class="font-medium text-sm" style="color: #111827;">{restaurant.name}</Text>
										<Text class="text-gray-600">{restaurant.price}</Text>
									</div>
									<div class="flex items-center gap-2 text-xs">
										<Text variant="secondary">{restaurant.cuisine}</Text>
										<span>•</span>
										<span class="text-yellow-600">⭐ {restaurant.rating}</span>
									</div>
								</div>
							{/each}
						</div>
					</Card>

					<!-- Cost Estimate -->
					<Card>
						{#snippet header()}
							<Heading level={3} class="text-lg font-semibold">💰 Cost Estimate</Heading>
						{/snippet}
						
						<div class="space-y-4">
							{#each Object.entries(site.costEstimate) as [category, costs]}
								<div>
									<div class="flex justify-between mb-1">
										<Text variant="secondary" class="text-sm capitalize">{category}:</Text>
										<Text class="font-semibold text-sm" style="color: #111827;">
											${costs.min} - ${costs.max}
										</Text>
									</div>
									<Text variant="secondary" class="text-xs">{costs.note}</Text>
								</div>
							{/each}
							
							<div class="border-t border-gray-200 pt-4 mt-4">
								<div class="flex justify-between">
									<Text class="font-semibold">Total Range:</Text>
									<Text class="font-bold text-lg text-blue-600">
										${Object.values(site.costEstimate).reduce((sum, c) => sum + c.min, 0)} - 
										${Object.values(site.costEstimate).reduce((sum, c) => sum + c.max, 0)}
									</Text>
								</div>
								<Text variant="secondary" class="text-xs mt-1">Per person estimate</Text>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<!-- Back Button -->
			<div class="mt-12 text-center">
				<Button href="/sites" color="dark/zinc">
					← Back to All Sites
				</Button>
			</div>
		</div>
	</div>
{/if}
