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
		'daytona-beach-fl': {
			name: 'Daytona Beach, Florida',
			shortName: 'Daytona Beach',
			location: 'Daytona Beach, Florida',
			country: 'USA',
			organization: 'Church of God, a Worldwide Association (COGWA)',
			coordinates: { lat: 29.2108, lng: -81.0228 },
			rating: 4.9,
			reviewCount: 487,
			attendees: '2,100+',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			description: 'Join us for an unforgettable Feast of Tabernacles at the "World\'s Most Famous Beach"! Daytona Beach offers 23 miles of pristine Atlantic coastline, perfect weather, and incredible fellowship. With the Ocean Center as our meeting location, you\'ll enjoy world-class services while having easy access to beautiful beaches, exciting attractions, and excellent dining. This is one of COGWA\'s premier feast sites with exceptional activities for all ages.',
			highlights: [
				'23 miles of pristine Atlantic beaches',
				'World-class Ocean Center venue with state-of-the-art facilities',
				'Perfect October weather (avg 80°F)',
				'Family-friendly boardwalk and pier',
				'Extensive youth and teen programs',
				'Multiple dining options within walking distance',
				'NASA Kennedy Space Center nearby (45 min drive)',
				'St. Augustine historic district (1 hour drive)',
				'Abundant outdoor activities and water sports'
			],
			meetingLocation: 'Ocean Center',
			meetingAddress: '101 N Atlantic Ave, Daytona Beach, FL 32118',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:30 PM', type: 'Afternoon Service' },
				{ day: 'Monday - Thursday', time: '10:00 AM', type: 'Daily Morning Services' },
				{ day: 'Friday', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'Friday', time: '7:00 PM', type: 'Special Music Evening' },
				{ day: 'Saturday (Sabbath)', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Saturday', time: '2:00 PM', type: 'Afternoon Seminars' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 82,
				avgLow: 68,
				rainfall: 'Low (October is dry season)',
				conditions: 'Sunny and warm, perfect beach weather'
			},
			accommodations: [
				{ name: 'Hilton Daytona Beach Oceanfront', type: 'Resort', price: '$169', distance: '0.2 mi', rating: 4.6, note: 'Oceanfront, walking distance to Ocean Center' },
				{ name: 'Plaza Resort & Spa', type: 'Resort', price: '$149', distance: '0.3 mi', rating: 4.5, note: 'Oceanfront with pools and spa' },
				{ name: 'Hampton Inn Daytona Beach', type: 'Hotel', price: '$129', distance: '0.4 mi', rating: 4.7, note: 'Great value, free breakfast' },
				{ name: 'Perry\'s Ocean Edge Resort', type: 'Resort', price: '$139', distance: '0.5 mi', rating: 4.4, note: 'Family suites available' },
				{ name: 'Wyndham Ocean Walk', type: 'Resort', price: '$179', distance: '0.6 mi', rating: 4.6, note: 'Luxury oceanfront with water park' },
				{ name: 'Best Western Plus', type: 'Hotel', price: '$119', distance: '1.2 mi', rating: 4.3, note: 'Budget-friendly option' }
			],
			dining: [
				{ name: 'Ocean Deck Restaurant', cuisine: 'Seafood/American', price: '$$', rating: 4.7, note: 'Beachfront dining, live music' },
				{ name: 'Chart House', cuisine: 'Fine Seafood', price: '$$$', rating: 4.8, note: 'Upscale waterfront dining' },
				{ name: 'Aunt Catfish\'s', cuisine: 'Southern/Seafood', price: '$$', rating: 4.6, note: 'Family-style, generous portions' },
				{ name: 'The Cellar', cuisine: 'Italian/Steakhouse', price: '$$$', rating: 4.7, note: 'Excellent wine selection' },
				{ name: 'Caribbean Jack\'s', cuisine: 'Caribbean', price: '$$', rating: 4.5, note: 'Waterfront, casual atmosphere' },
				{ name: 'Hyde Park Prime Steakhouse', cuisine: 'Steakhouse', price: '$$$', rating: 4.8, note: 'Premium cuts, elegant setting' }
			],
			activities: [
				{ name: 'Beach & Swimming', category: 'Water Activities', icon: '🏖️' },
				{ name: 'Daytona Beach Boardwalk', category: 'Entertainment', icon: '🎡' },
				{ name: 'Kennedy Space Center', category: 'Day Trip', icon: '🚀' },
				{ name: 'St. Augustine Tour', category: 'Day Trip', icon: '🏛️' },
				{ name: 'Deep Sea Fishing', category: 'Water Activities', icon: '🎣' },
				{ name: 'Marine Science Center', category: 'Education', icon: '🐢' },
				{ name: 'Ponce Inlet Lighthouse', category: 'Sightseeing', icon: '🗼' },
				{ name: 'Shopping (Volusia Mall)', category: 'Shopping', icon: '🛍️' },
				{ name: 'Bike Trails', category: 'Recreation', icon: '🚴' },
				{ name: 'Golf Courses', category: 'Recreation', icon: '⛳' }
			],
			reviews: [
				{ 
					author: 'Michael T.', 
					avatar: 'MT', 
					rating: 5, 
					date: '2024', 
					text: 'This was our family\'s third year at Daytona Beach with COGWA and it just keeps getting better! The Ocean Center is a beautiful venue with excellent acoustics for the services. Our kids loved the teen activities and beach volleyball tournaments. The fellowship was outstanding, and we made lifelong friends. Already registered for next year!' 
				},
				{ 
					author: 'Rachel S.', 
					avatar: 'RS', 
					rating: 5, 
					date: '2024', 
					text: 'First time attending the Feast here and we were blown away! The messages were inspiring and Spirit-filled. The location is perfect - you can literally walk to the beach from most hotels. We took a day trip to Kennedy Space Center which was incredible. The youth program kept our teenagers engaged and happy. Highly recommend!' 
				},
				{ 
					author: 'David & Susan L.', 
					avatar: 'DL', 
					rating: 5, 
					date: '2024', 
					text: 'As empty nesters, we appreciate the variety of activities and the excellent organization by COGWA. The seminars were thought-provoking, the music was uplifting, and the beach sunrises were breathtaking. Perfect weather in October! The restaurants are plentiful and the area is very walkable. This has become our favorite feast site.' 
				},
				{ 
					author: 'Jennifer K.', 
					avatar: 'JK', 
					rating: 5, 
					date: '2023', 
					text: 'Wonderful experience! The COGWA team organized everything perfectly. Special activities for families with young children were a blessing. The Ocean Center is right on the boardwalk, making it easy to grab lunch between services. We stayed at the Plaza Resort and could see the ocean from our room. Can\'t wait to return!' 
				}
			],
			costEstimate: {
				accommodations: { min: 950, max: 1800, note: '8 nights (Oct 15-23, 2025)' },
				meals: { min: 350, max: 700, note: 'Per person, many affordable options' },
				activities: { min: 150, max: 400, note: 'Beach free, attractions extra' },
				travel: { min: 200, max: 800, note: 'Varies by distance, airport nearby' }
			}
		},
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
