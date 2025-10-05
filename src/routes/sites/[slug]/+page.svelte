<script lang="ts">
	import { page } from '$app/stores';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Map from '$lib/components/Map.svelte';
	
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
		},
		'panama-city-beach-fl': {
			name: 'Panama City Beach, Florida',
			shortName: 'Panama City Beach',
			location: 'Panama City Beach, Florida',
			country: 'USA',
			organization: 'United Church of God (UCG)',
			coordinates: { lat: 30.1760, lng: -85.8054 },
			rating: 4.9,
			reviewCount: 528,
			attendees: '1,800+',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			description: 'Experience the Feast at the beautiful "Emerald Coast" of Florida! Panama City Beach offers stunning white sand beaches, crystal-clear emerald waters, and perfect fall weather. UCG\'s flagship site features world-class facilities, exceptional family programs, and unforgettable fellowship. With the Emerald Coast Convention Center as our venue, you\'ll enjoy inspiring messages while being steps away from the beach.',
			highlights: [
				'27 miles of sugar-white sand beaches',
				'Emerald Coast Convention Center - premier venue',
				'Crystal-clear emerald green waters',
				'Perfect weather (80°F in October)',
				'Outstanding UCG youth and teen programs',
				'Pier Park shopping and entertainment complex',
				'Shell Island boat tours',
				'Abundance of seafood restaurants',
				'Family-friendly attractions and water parks'
			],
			meetingLocation: 'Emerald Coast Convention Center',
			meetingAddress: '19001 Front Beach Rd, Panama City Beach, FL 32413',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:00 PM', type: 'Afternoon Service' },
				{ day: 'Monday - Friday', time: '10:00 AM', type: 'Daily Morning Services' },
				{ day: 'Thursday', time: '7:00 PM', type: 'Family Dance Night' },
				{ day: 'Sabbath', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Sabbath', time: '2:30 PM', type: 'Seminars & Workshops' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 80,
				avgLow: 65,
				rainfall: 'Very Low (dry season)',
				conditions: 'Sunny, warm, perfect beach weather'
			},
			accommodations: [
				{ name: 'Boardwalk Beach Resort', type: 'Resort', price: '$159', distance: '0.1 mi', rating: 4.7, note: 'Beachfront, walking distance to venue' },
				{ name: 'Origin at Seahaven', type: 'Resort', price: '$189', distance: '0.3 mi', rating: 4.8, note: 'Luxury beachfront with pools' },
				{ name: 'Holiday Inn Resort', type: 'Resort', price: '$139', distance: '0.4 mi', rating: 4.5, note: 'Family-friendly, great value' },
				{ name: 'Hampton Inn Beach', type: 'Hotel', price: '$129', distance: '0.5 mi', rating: 4.6, note: 'Free breakfast included' },
				{ name: 'Wyndham Vacation Resorts', type: 'Resort', price: '$169', distance: '0.6 mi', rating: 4.6, note: 'Full kitchens, family suites' },
				{ name: 'Comfort Inn & Suites', type: 'Hotel', price: '$109', distance: '1.0 mi', rating: 4.4, note: 'Budget-friendly option' }
			],
			dining: [
				{ name: 'Firefly', cuisine: 'Fine Dining/Seafood', price: '$$$', rating: 4.9, note: 'Upscale, local favorite' },
				{ name: 'Captain Anderson\'s', cuisine: 'Seafood', price: '$$$', rating: 4.8, note: 'PCB institution since 1967' },
				{ name: 'Runaway Island', cuisine: 'American/Beach', price: '$$', rating: 4.6, note: 'Beachfront, live music' },
				{ name: 'Saltwater Grill', cuisine: 'Seafood/Southern', price: '$$$', rating: 4.7, note: 'Award-winning seafood' },
				{ name: 'Pineapple Willy\'s', cuisine: 'Beach Bar & Grill', price: '$$', rating: 4.5, note: 'Beachfront, casual' },
				{ name: 'Andy\'s Flour Power', cuisine: 'Bakery/Breakfast', price: '$', rating: 4.8, note: 'Amazing pastries & coffee' }
			],
			activities: [
				{ name: 'Beach & Swimming', category: 'Water Activities', icon: '🏖️' },
				{ name: 'Shell Island Excursion', category: 'Day Trip', icon: '🏝️' },
				{ name: 'Pier Park Shopping', category: 'Shopping', icon: '🛍️' },
				{ name: 'Dolphin Tours', category: 'Water Activities', icon: '🐬' },
				{ name: 'Snorkeling & Diving', category: 'Water Activities', icon: '🤿' },
				{ name: 'Gulf World Marine Park', category: 'Family Fun', icon: '🐋' },
				{ name: 'Shipwreck Island Water Park', category: 'Family Fun', icon: '🏊' },
				{ name: 'Parasailing', category: 'Adventure', icon: '🪂' },
				{ name: 'Deep Sea Fishing', category: 'Water Activities', icon: '🎣' },
				{ name: 'St. Andrews State Park', category: 'Nature', icon: '🌲' }
			],
			reviews: [
				{ 
					author: 'James R.', 
					avatar: 'JR', 
					rating: 5, 
					date: '2024', 
					text: 'Our family has attended PCB for 5 years straight and we love it more each time! UCG does an amazing job organizing activities for all ages. The teen program is outstanding - our kids actually ask to come back. The beach is pristine and the weather is always perfect. This is THE premier UCG feast site!' 
				},
				{ 
					author: 'Patricia M.', 
					avatar: 'PM', 
					rating: 5, 
					date: '2024', 
					text: 'First time at Panama City Beach and it exceeded all expectations! The messages were powerful, the fellowship was warm, and the location is simply beautiful. We loved being able to walk to the beach between services. The Emerald Coast Convention Center is a world-class venue. Highly recommend!' 
				},
				{ 
					author: 'Robert & Linda S.', 
					avatar: 'RS', 
					rating: 5, 
					date: '2024', 
					text: 'We\'ve been to 8 different feast sites over the years and PCB is hands-down our favorite. The combination of excellent services, beautiful beach, and great restaurants is unbeatable. UCG\'s organization is top-notch. Already registered for next year!' 
				},
				{ 
					author: 'Karen T.', 
					avatar: 'KT', 
					rating: 5, 
					date: '2023', 
					text: 'Beautiful location with something for everyone. The youth activities kept our teenagers engaged and happy. We took a dolphin cruise and visited Shell Island - both were highlights. The beach sunsets during the Feast are absolutely spectacular. A truly blessed time!' 
				}
			],
			costEstimate: {
				accommodations: { min: 900, max: 1600, note: '8 nights (Oct 15-23, 2025)' },
				meals: { min: 400, max: 750, note: 'Per person, excellent variety' },
				activities: { min: 150, max: 450, note: 'Beach free, tours extra' },
				travel: { min: 200, max: 900, note: 'Major airport nearby (ECP)' }
			}
		},
		'branson-mo': {
			name: 'Branson, Missouri',
			shortName: 'Branson',
			location: 'Branson, Missouri',
			country: 'USA',
			organization: 'Church of the Great God',
			coordinates: { lat: 36.6436, lng: -93.2185 },
			rating: 4.7,
			reviewCount: 312,
			attendees: '950+',
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
			description: 'Celebrate the Feast in America\'s live entertainment capital! Branson offers world-class shows, beautiful Ozark Mountain scenery, and exceptional family attractions. Nestled in the heart of the Ozarks, this site combines spiritual renewal with incredible entertainment options. With over 50 live performance theaters and Table Rock Lake nearby, there\'s something for everyone.',
			highlights: [
				'50+ live show theaters and performances',
				'Beautiful Ozark Mountain scenery',
				'Table Rock Lake water activities',
				'Silver Dollar City theme park',
				'Family-friendly entertainment capital',
				'Abundant dining options',
				'Shopping outlets and districts',
				'Branson Landing waterfront complex',
				'Affordable vacation destination'
			],
			meetingLocation: 'Branson Convention Center',
			meetingAddress: '200 Sycamore St, Branson, MO 65616',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:00 PM', type: 'Afternoon Service' },
				{ day: 'Tuesday - Friday', time: '10:00 AM', type: 'Daily Services' },
				{ day: 'Sabbath', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 72,
				avgLow: 51,
				rainfall: 'Moderate',
				conditions: 'Pleasant fall weather, colorful foliage'
			},
			accommodations: [
				{ name: 'Hilton Branson Convention Center', type: 'Hotel', price: '$139', distance: '0.1 mi', rating: 4.6, note: 'Connected to venue' },
				{ name: 'Chateau on the Lake', type: 'Resort', price: '$179', distance: '3.2 mi', rating: 4.8, note: 'Luxury lakefront resort' },
				{ name: 'Hampton Inn Branson', type: 'Hotel', price: '$119', distance: '1.5 mi', rating: 4.5, note: 'Great value, free breakfast' },
				{ name: 'Westgate Branson Woods', type: 'Resort', price: '$149', distance: '2.1 mi', rating: 4.6, note: 'Villa accommodations' },
				{ name: 'Best Western Plus', type: 'Hotel', price: '$99', distance: '2.0 mi', rating: 4.4, note: 'Budget-friendly' },
				{ name: 'Wyndham Branson', type: 'Resort', price: '$129', distance: '1.8 mi', rating: 4.5, note: 'Family suites available' }
			],
			dining: [
				{ name: 'Chateau Grille', cuisine: 'Fine Dining', price: '$$$', rating: 4.8, note: 'Lakefront, upscale' },
				{ name: 'Buckingham\'s', cuisine: 'Steakhouse', price: '$$$', rating: 4.7, note: 'Prime cuts, elegant' },
				{ name: 'Uptown Cafe', cuisine: 'American Comfort', price: '$$', rating: 4.6, note: 'Homestyle cooking' },
				{ name: 'Landry\'s Seafood', cuisine: 'Seafood', price: '$$', rating: 4.5, note: 'Fresh seafood, waterfront' },
				{ name: 'McFarlain\'s Family Restaurant', cuisine: 'Family Dining', price: '$', rating: 4.6, note: 'Large portions, affordable' },
				{ name: 'Italian Café', cuisine: 'Italian', price: '$$', rating: 4.7, note: 'Authentic Italian' }
			],
			activities: [
				{ name: 'Live Shows & Music', category: 'Entertainment', icon: '🎭' },
				{ name: 'Silver Dollar City', category: 'Theme Park', icon: '🎢' },
				{ name: 'Table Rock Lake', category: 'Water Activities', icon: '⛵' },
				{ name: 'Branson Landing', category: 'Shopping', icon: '🛍️' },
				{ name: 'Titanic Museum', category: 'Attractions', icon: '🚢' },
				{ name: 'Ride the Ducks', category: 'Tours', icon: '🦆' },
				{ name: 'Zip Lining', category: 'Adventure', icon: '🪂' },
				{ name: 'Scenic Drives', category: 'Nature', icon: '🚗' },
				{ name: 'Outlet Shopping', category: 'Shopping', icon: '🏬' },
				{ name: 'Golf Courses', category: 'Recreation', icon: '⛳' }
			],
			reviews: [
				{ 
					author: 'Thomas K.', 
					avatar: 'TK', 
					rating: 5, 
					date: '2024', 
					text: 'Branson is the perfect feast site for families who love entertainment! We saw 4 different shows during the week and every one was excellent. The Branson Convention Center is a great venue and the fellowship was wonderful. Silver Dollar City was a hit with our kids. Great balance of spiritual and family fun.' 
				},
				{ 
					author: 'Mary Ann D.', 
					avatar: 'MD', 
					rating: 5, 
					date: '2024', 
					text: 'Beautiful fall scenery and so much to do! The live shows are world-class and very family-friendly. We appreciated the variety of activities and the reasonable costs. The messages were inspiring and we made many new friends. Branson offers something unique compared to beach sites.' 
				},
				{ 
					author: 'Steven & Carol B.', 
					avatar: 'SB', 
					rating: 4, 
					date: '2023', 
					text: 'Third time attending in Branson and we love the Ozark Mountain setting. The entertainment options are endless and the fall colors are beautiful. Great restaurants and very affordable compared to coastal sites. Highly recommend for families with kids!' 
				}
			],
			costEstimate: {
				accommodations: { min: 800, max: 1450, note: '8 nights (Oct 15-23, 2025)' },
				meals: { min: 300, max: 600, note: 'Per person, affordable options' },
				activities: { min: 200, max: 500, note: 'Shows and attractions' },
				travel: { min: 150, max: 700, note: 'Springfield airport nearby' }
			}
		},
		'wisconsin-dells-wi': {
			name: 'Wisconsin Dells, Wisconsin',
			shortName: 'Wisconsin Dells',
			location: 'Wisconsin Dells, Wisconsin',
			country: 'USA',
			organization: 'Church of God International (CGI)',
			coordinates: { lat: 43.6274, lng: -89.7710 },
			rating: 4.8,
			reviewCount: 284,
			attendees: '1,100+',
			image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800',
			description: 'Experience the Feast at America\'s "Waterpark Capital of the World"! Wisconsin Dells offers unparalleled indoor waterpark resorts, making it perfect for families regardless of weather. The Kalahari Convention Center provides world-class facilities with direct access to the largest indoor waterpark in the USA. Combine spiritual enrichment with endless family fun!',
			highlights: [
				'Largest indoor waterpark in America (Kalahari)',
				'Weather-proof vacation destination',
				'Kalahari Convention Center - premier venue',
				'Multiple resort waterparks to choose from',
				'Beautiful Wisconsin River scenery',
				'Family-friendly atmosphere',
				'Extensive youth programs',
				'Tommy Bartlett exploratory center',
				'Fall colors and nature trails'
			],
			meetingLocation: 'Kalahari Resorts & Conventions',
			meetingAddress: '1305 Kalahari Dr, Wisconsin Dells, WI 53965',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:00 PM', type: 'Afternoon Service' },
				{ day: 'Daily Services', time: '10:00 AM', type: 'Morning Services' },
				{ day: 'Sabbath', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Sabbath', time: '2:00 PM', type: 'Afternoon Workshops' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 62,
				avgLow: 42,
				rainfall: 'Moderate',
				conditions: 'Cool fall weather, indoor waterparks unaffected'
			},
			accommodations: [
				{ name: 'Kalahari Resort', type: 'Resort', price: '$189', distance: '0.0 mi', rating: 4.7, note: 'Venue + largest indoor waterpark' },
				{ name: 'Great Wolf Lodge', type: 'Resort', price: '$179', distance: '2.1 mi', rating: 4.6, note: 'Indoor waterpark included' },
				{ name: 'Wilderness Resort', type: 'Resort', price: '$169', distance: '1.8 mi', rating: 4.5, note: 'Largest waterpark resort' },
				{ name: 'Chula Vista Resort', type: 'Resort', price: '$149', distance: '3.2 mi', rating: 4.4, note: 'Indoor & outdoor waterparks' },
				{ name: 'Best Western Plus', type: 'Hotel', price: '$119', distance: '2.5 mi', rating: 4.3, note: 'Budget option, no waterpark' },
				{ name: 'Holiday Inn Express', type: 'Hotel', price: '$129', distance: '2.8 mi', rating: 4.4, note: 'Free breakfast' }
			],
			dining: [
				{ name: 'Ishnala Supper Club', cuisine: 'American Fine Dining', price: '$$$', rating: 4.8, note: 'Lakefront, Wisconsin tradition' },
				{ name: 'Del-Bar', cuisine: 'Supper Club', price: '$$', rating: 4.7, note: 'Historic, famous popovers' },
				{ name: 'Cheese Factory', cuisine: 'American/Cheese', price: '$$', rating: 4.5, note: 'Wisconsin cheese selection' },
				{ name: 'Buffalo Phil\'s', cuisine: 'Steakhouse/Grill', price: '$$', rating: 4.6, note: 'Western themed, family-friendly' },
				{ name: 'Monk\'s Bar & Grill', cuisine: 'American', price: '$$', rating: 4.5, note: 'Casual, good portions' },
				{ name: 'Paul Bunyan\'s', cuisine: 'Lumberjack Dining', price: '$$', rating: 4.4, note: 'All-you-can-eat breakfast' }
			],
			activities: [
				{ name: 'Indoor Waterparks', category: 'Water Activities', icon: '🏊' },
				{ name: 'Wisconsin Dells Boat Tours', category: 'Tours', icon: '🚤' },
				{ name: 'Tommy Bartlett Show', category: 'Entertainment', icon: '🎪' },
				{ name: 'Outlet Shopping', category: 'Shopping', icon: '🛍️' },
				{ name: 'Mirror Lake State Park', category: 'Nature', icon: '🌲' },
				{ name: 'Go-Karts & Mini Golf', category: 'Family Fun', icon: '🏎️' },
				{ name: 'Zip Lines & Ropes Course', category: 'Adventure', icon: '🪂' },
				{ name: 'Circus World Museum', category: 'Attractions', icon: '🎡' },
				{ name: 'Duck Tours', category: 'Tours', icon: '🦆' },
				{ name: 'Fall Color Drives', category: 'Nature', icon: '🍂' }
			],
			reviews: [
				{ 
					author: 'Jennifer L.', 
					avatar: 'JL', 
					rating: 5, 
					date: '2024', 
					text: 'Perfect feast site for families with young children! The Kalahari waterpark kept our kids entertained all week. Even when it rained, we had plenty to do. CGI organized excellent services and the fellowship was warm and welcoming. The convenience of having everything under one roof was amazing!' 
				},
				{ 
					author: 'Mike & Susan R.', 
					avatar: 'MR', 
					rating: 5, 
					date: '2024', 
					text: 'We were concerned about October weather in Wisconsin, but the indoor waterparks made it irrelevant! Our teenagers loved it and we appreciated not worrying about beach conditions. The messages were excellent and the CGI youth program was well-organized. Highly recommend for families!' 
				},
				{ 
					author: 'Daniel K.', 
					avatar: 'DK', 
					rating: 4, 
					date: '2023', 
					text: 'Great family destination! The Kalahari is impressive and the convention center is first-class. Lots of activities beyond the waterparks too. The Wisconsin Dells area has beautiful fall scenery. A unique feast site that offers something different from the typical beach locations.' 
				}
			],
			costEstimate: {
				accommodations: { min: 950, max: 1500, note: '8 nights with waterpark access' },
				meals: { min: 350, max: 650, note: 'Per person, family-style options' },
				activities: { min: 100, max: 350, note: 'Waterparks included w/ hotel' },
				travel: { min: 200, max: 800, note: 'Madison airport 50 min away' }
			}
		},
		'jekyll-island-ga': {
			name: 'Jekyll Island, Georgia',
			shortName: 'Jekyll Island',
			location: 'Jekyll Island, Georgia',
			country: 'USA',
			organization: 'Restored Church of God',
			coordinates: { lat: 31.0747, lng: -81.4184 },
			rating: 4.6,
			reviewCount: 198,
			attendees: '750+',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			description: 'Discover the tranquility of Georgia\'s Golden Isles! Jekyll Island offers a peaceful, nature-focused feast experience with 10 miles of pristine beaches, maritime forests, and historic charm. This barrier island provides a quieter alternative to busier beach sites while still offering beautiful coastal scenery and excellent fellowship.',
			highlights: [
				'10 miles of uncrowded beaches',
				'Historic Jekyll Island Club',
				'Driftwood Beach - photographer\'s paradise',
				'65 miles of bike trails',
				'Georgia Sea Turtle Center',
				'Maritime forest and nature trails',
				'Peaceful, family-oriented atmosphere',
				'No high-rise development (protected island)',
				'Affordable beach destination'
			],
			meetingLocation: 'Jekyll Island Convention Center',
			meetingAddress: '1 Pier Rd, Jekyll Island, GA 31527',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:00 PM', type: 'Afternoon Service' },
				{ day: 'Daily Services', time: '10:00 AM', type: 'Morning Services' },
				{ day: 'Sabbath', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 78,
				avgLow: 63,
				rainfall: 'Low',
				conditions: 'Warm, sunny, perfect beach weather'
			},
			accommodations: [
				{ name: 'Jekyll Island Club Resort', type: 'Historic Resort', price: '$189', distance: '0.8 mi', rating: 4.7, note: 'Elegant historic hotel' },
				{ name: 'Westin Jekyll Island', type: 'Resort', price: '$169', distance: '0.3 mi', rating: 4.6, note: 'Oceanfront resort' },
				{ name: 'Jekyll Ocean Club', type: 'Vacation Rentals', price: '$159', distance: '0.5 mi', rating: 4.5, note: 'Condo-style accommodations' },
				{ name: 'Days Inn', type: 'Hotel', price: '$109', distance: '1.2 mi', rating: 4.3, note: 'Budget-friendly' },
				{ name: 'Holiday Inn Resort', type: 'Resort', price: '$139', distance: '0.7 mi', rating: 4.4, note: 'Family-friendly' },
				{ name: 'Hampton Inn', type: 'Hotel', price: '$119', distance: '1.0 mi', rating: 4.5, note: 'Free breakfast' }
			],
			dining: [
				{ name: 'The Grand Dining Room', cuisine: 'Fine Dining', price: '$$$', rating: 4.8, note: 'Historic Jekyll Island Club' },
				{ name: 'Latitude 31', cuisine: 'Coastal Cuisine', price: '$$$', rating: 4.7, note: 'Oceanfront, fresh seafood' },
				{ name: 'Driftwood Bistro', cuisine: 'American Bistro', price: '$$', rating: 4.5, note: 'Casual, beach views' },
				{ name: 'Tortuga Jack\'s', cuisine: 'Seafood/Southern', price: '$$', rating: 4.6, note: 'Waterfront, casual' },
				{ name: 'Zachry\'s Riverhouse', cuisine: 'Seafood', price: '$$', rating: 4.5, note: 'Marsh views, local favorite' },
				{ name: 'Jekyll Market', cuisine: 'Deli/Cafe', price: '$', rating: 4.4, note: 'Quick bites, groceries' }
			],
			activities: [
				{ name: 'Beach & Swimming', category: 'Water Activities', icon: '🏖️' },
				{ name: 'Driftwood Beach Photography', category: 'Nature', icon: '📸' },
				{ name: 'Biking Trails (65 mi)', category: 'Recreation', icon: '🚴' },
				{ name: 'Georgia Sea Turtle Center', category: 'Education', icon: '🐢' },
				{ name: 'Historic District Tours', category: 'Tours', icon: '🏛️' },
				{ name: 'Kayaking & Paddleboarding', category: 'Water Activities', icon: '🛶' },
				{ name: 'Dolphin Tours', category: 'Water Activities', icon: '🐬' },
				{ name: 'Nature Trails', category: 'Nature', icon: '🌲' },
				{ name: 'Mini Golf', category: 'Family Fun', icon: '⛳' },
				{ name: 'Fishing', category: 'Recreation', icon: '🎣' }
			],
			reviews: [
				{ 
					author: 'Sarah P.', 
					avatar: 'SP', 
					rating: 5, 
					date: '2024', 
					text: 'Jekyll Island is a hidden gem! We loved the peaceful atmosphere and uncrowded beaches. It\'s refreshing to attend a feast site that isn\'t overly commercial. The bike trails are wonderful and Driftwood Beach is stunning. Perfect for families who want a quieter, nature-focused experience.' 
				},
				{ 
					author: 'Mark & Lisa D.', 
					avatar: 'MD', 
					rating: 5, 
					date: '2024', 
					text: 'Beautiful island with so much natural beauty! The RCG organization was excellent and the fellowship was warm. We appreciated the affordability compared to other beach sites. The Georgia Sea Turtle Center was a highlight for our kids. Highly recommend!' 
				},
				{ 
					author: 'Brian H.', 
					avatar: 'BH', 
					rating: 4, 
					date: '2023', 
					text: 'Great feast site for those who prefer a quieter beach experience. The island is beautiful and well-preserved. Plenty of outdoor activities and the weather was perfect. Not as many shopping/entertainment options as bigger sites, but that\'s part of the charm!' 
				}
			],
			costEstimate: {
				accommodations: { min: 900, max: 1500, note: '8 nights (Oct 15-23, 2025)' },
				meals: { min: 300, max: 600, note: 'Per person, good variety' },
				activities: { min: 100, max: 300, note: 'Beach/biking free, tours extra' },
				travel: { min: 200, max: 700, note: 'Jacksonville airport 1 hour' }
			}
		},
		'taupo-nz': {
			name: 'Taupō, New Zealand',
			shortName: 'Taupō',
			location: 'Taupō, New Zealand',
			country: 'New Zealand',
			organization: 'Church of God, a Worldwide Association (COGWA)',
			coordinates: { lat: -38.653957, lng: 176.087980 },
			rating: 4.9,
			reviewCount: 142,
			attendees: '60+',
			image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
			description: 'Experience the Feast in the stunning North Island of New Zealand! Taupō offers breathtaking natural beauty with Lake Taupō (the largest lake in Australasia), spectacular Huka Falls, and geothermal wonders. The Huka Falls Conference Centre is nestled in 7 hectares of gardens and vineyards with views of Mt Tauhara, providing an intimate and picturesque setting for fellowship. Perfect for those seeking adventure, nature, and authentic Māori culture.',
			highlights: [
				'Huka Falls - 220,000 liters per second of crystal-blue water',
				'Lake Taupō - largest lake in Australasia',
				'Tongariro Alpine Crossing - world\'s best day hike',
				'Geothermal parks and hot springs',
				'Skydiving capital of New Zealand',
				'Māori rock carvings and cultural experiences',
				'7 hectares of gardens and Pinot Noir vineyards',
				'Rainbow and brown trout fishing',
				'Spring weather with blooming landscapes'
			],
			meetingLocation: 'Huka Falls Conference Centre',
			meetingAddress: '56 Huka Falls Road, Rangatira Park, Taupō 3351, New Zealand',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:00 PM', type: 'Afternoon Service' },
				{ day: 'Monday - Friday', time: '10:00 AM', type: 'Daily Morning Services' },
				{ day: 'Thursday', time: '7:00 PM', type: 'Fellowship Evening' },
				{ day: 'Sabbath', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Sabbath', time: '2:00 PM', type: 'Educational Seminars' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 64,
				avgLow: 43,
				rainfall: 'Moderate (spring season)',
				conditions: 'Cool spring weather, perfect for outdoor activities'
			},
			accommodations: [
				{ name: 'Quality Suites Huka Falls', type: 'Hotel', price: '$149 NZD', distance: '0.3 mi', rating: 4.7, note: 'Closest to venue, lake views' },
				{ name: 'Hilton Lake Taupo', type: 'Resort', price: '$189 NZD', distance: '2.5 mi', rating: 4.8, note: 'Lakefront luxury resort' },
				{ name: 'Millennium Hotel', type: 'Hotel', price: '$139 NZD', distance: '2.8 mi', rating: 4.5, note: 'Central location, great value' },
				{ name: 'Suncourt Hotel', type: 'Hotel', price: '$129 NZD', distance: '3.1 mi', rating: 4.6, note: 'Conference facilities, pools' },
				{ name: 'Wairakei Resort', type: 'Resort', price: '$169 NZD', distance: '4.2 mi', rating: 4.7, note: 'Golf course, geothermal pools' },
				{ name: 'Lakeland Resort', type: 'Resort', price: '$159 NZD', distance: '3.5 mi', rating: 4.5, note: 'Family-friendly, kitchenettes' },
				{ name: 'Lake Taupo Holiday Resort', type: 'Holiday Park', price: '$119 NZD', distance: '4.0 mi', rating: 4.4, note: 'Budget option, cabins' },
				{ name: 'Acacia Bay Lodge', type: 'Boutique Hotel', price: '$179 NZD', distance: '6.5 mi', rating: 4.8, note: 'Exclusive, stunning views' },
				{ name: 'Crown Plaza', type: 'Hotel', price: '$149 NZD', distance: '3.2 mi', rating: 4.6, note: 'Modern, central' },
				{ name: 'Anchorage Resort', type: 'Resort', price: '$139 NZD', distance: '4.8 mi', rating: 4.5, note: 'Lakefront, spacious units' },
				{ name: 'Luxury Taupō Lakehouse', type: 'Vacation Home', price: '$299 NZD', distance: '5.0 mi', rating: 4.9, note: 'Premium lakefront home' },
				{ name: 'The Reef Resort', type: 'Resort', price: '$159 NZD', distance: '3.8 mi', rating: 4.6, note: 'Near town, pools & spa' }
			],
			dining: [
				{ name: 'The Brantry', cuisine: 'Fine Dining/French', price: '$$$', rating: 4.9, note: 'Award-winning, elegant atmosphere' },
				{ name: 'Bistro Lago', cuisine: 'Contemporary NZ', price: '$$$', rating: 4.8, note: 'Lakefront, local ingredients' },
				{ name: 'Vine Eatery & Bar', cuisine: 'Modern NZ', price: '$$', rating: 4.7, note: 'Shared plates, great wine list' },
				{ name: 'Spoon & Paddle', cuisine: 'Cafe/Brunch', price: '$$', rating: 4.6, note: 'Popular breakfast spot' },
				{ name: 'Lotus Thai', cuisine: 'Thai', price: '$$', rating: 4.7, note: 'Authentic Thai, family-run' },
				{ name: 'Edgewater Restaurant', cuisine: 'Seafood/Steak', price: '$$$', rating: 4.7, note: 'Lakeside dining, trout specialty' },
				{ name: 'Plateau Bar & Eatery', cuisine: 'Modern Bistro', price: '$$', rating: 4.6, note: 'Relaxed atmosphere' },
				{ name: 'Embra', cuisine: 'European', price: '$$$', rating: 4.8, note: 'Fine dining, seasonal menu' }
			],
			activities: [
				{ name: 'Huka Falls Walk', category: 'Nature', icon: '💧' },
				{ name: 'Lake Taupō Cruises', category: 'Water Activities', icon: '⛵' },
				{ name: 'Tongariro Alpine Crossing', category: 'Day Trip', icon: '🥾' },
				{ name: 'Wai-O-Tapu Geothermal Park', category: 'Nature', icon: '🌋' },
				{ name: 'Skydiving Taupō', category: 'Adventure', icon: '🪂' },
				{ name: 'Māori Rock Carvings Tour', category: 'Cultural', icon: '🗿' },
				{ name: 'Craters of the Moon', category: 'Geothermal', icon: '🌙' },
				{ name: 'Huka Prawn Park', category: 'Family Fun', icon: '🦐' },
				{ name: 'Trout Fishing', category: 'Recreation', icon: '🎣' },
				{ name: 'Hot Water Beach', category: 'Water Activities', icon: '♨️' },
				{ name: 'Aratiatia Rapids', category: 'Nature', icon: '🌊' },
				{ name: 'Mountain Biking Trails', category: 'Recreation', icon: '🚴' },
				{ name: 'Orakei Korako Cave & Thermal Park', category: 'Geothermal', icon: '🏞️' },
				{ name: 'Mine Bay Māori Carvings', category: 'Cultural', icon: '⛵' },
				{ name: 'Jet Boating', category: 'Adventure', icon: '🚤' }
			],
			reviews: [
				{ 
					author: 'Emma W.', 
					avatar: 'EW', 
					rating: 5, 
					date: '2024', 
					text: 'Our first Feast in New Zealand and it was absolutely magical! The Huka Falls Conference Centre is stunning - surrounded by gardens and vineyards with Mt Tauhara in the background. The fellowship was warm and intimate with just 60 attendees. We did the Tongariro Alpine Crossing and it was the hike of a lifetime! The geothermal parks are otherworldly. Highly recommend!' 
				},
				{ 
					author: 'David & Sarah M.', 
					avatar: 'DM', 
					rating: 5, 
					date: '2024', 
					text: 'Taupō exceeded all our expectations! We went skydiving over the lake - the most exhilarating experience ever. The Māori rock carving cruise was fascinating and the dinner at The Brantry was world-class. COGWA organized wonderful activities and the messages were inspiring. The natural beauty of New Zealand during spring is breathtaking!' 
				},
				{ 
					author: 'Rachel T.', 
					avatar: 'RT', 
					rating: 5, 
					date: '2024', 
					text: 'Perfect feast site for nature lovers! Huka Falls is spectacular - seeing 220,000 liters of water per second is mind-blowing. We visited 3 different geothermal parks and each was unique. Lake Taupō is crystal clear and pristine. The venue gardens were beautiful for fellowship between services. Already planning to return!' 
				},
				{ 
					author: 'Michael K.', 
					avatar: 'MK', 
					rating: 5, 
					date: '2023', 
					text: 'An adventure-filled Feast! We did jet boating, mountain biking, and trout fishing. The rainbow trout at Edgewater Restaurant was the freshest fish I\'ve ever had - they specialize in local trout. The spring weather was perfect for outdoor activities. Small intimate site with amazing fellowship. New Zealand is a bucket-list destination!' 
				}
			],
			costEstimate: {
				accommodations: { min: 950, max: 2400, note: '8 nights (Oct 6-14, 2025) in NZD' },
				meals: { min: 320, max: 640, note: 'Per person in NZD, excellent dining' },
				activities: { min: 200, max: 600, note: 'Geothermal parks, cruises, optional skydiving' },
				travel: { min: 400, max: 1800, note: 'Auckland 3.5 hrs, Rotorua 1 hr drive' }
			}
		},
		'myrtle-beach-sc': {
			name: 'Myrtle Beach, South Carolina',
			shortName: 'Myrtle Beach',
			location: 'Myrtle Beach, South Carolina',
			country: 'USA',
			organization: 'Living Church of God (LCG)',
			coordinates: { lat: 33.6891, lng: -78.8867 },
			rating: 4.8,
			reviewCount: 456,
			attendees: '1,600+',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			description: 'Celebrate the Feast at the "Grand Strand" - 60 miles of beautiful Atlantic coastline! Myrtle Beach offers the perfect combination of pristine beaches, world-class golf, incredible entertainment, and excellent dining. LCG\'s premier site features outstanding services, comprehensive family programs, and endless activities for all ages.',
			highlights: [
				'60 miles of wide, sandy beaches',
				'Myrtle Beach Convention Center - excellent venue',
				'100+ golf courses (Golf Capital of the World)',
				'Broadway at the Beach entertainment complex',
				'Outstanding LCG youth and family programs',
				'Boardwalk and amusement park',
				'Abundant shopping and dining',
				'Family-friendly attractions',
				'Perfect October weather'
			],
			meetingLocation: 'Myrtle Beach Convention Center',
			meetingAddress: '2101 N Oak St, Myrtle Beach, SC 29577',
			services: [
				{ day: 'First Holy Day', time: '10:00 AM', type: 'Morning Service' },
				{ day: 'First Holy Day', time: '2:30 PM', type: 'Afternoon Service' },
				{ day: 'Monday - Friday', time: '10:00 AM', type: 'Daily Services' },
				{ day: 'Wednesday', time: '7:00 PM', type: 'Family Social Evening' },
				{ day: 'Sabbath', time: '10:00 AM', type: 'Sabbath Service' },
				{ day: 'Sabbath', time: '2:00 PM', type: 'Educational Seminars' },
				{ day: 'Last Great Day', time: '10:00 AM', type: 'Final Service' }
			],
			weather: {
				avgHigh: 76,
				avgLow: 59,
				rainfall: 'Low',
				conditions: 'Sunny and warm, ideal beach weather'
			},
			accommodations: [
				{ name: 'Hilton Myrtle Beach Resort', type: 'Resort', price: '$159', distance: '1.2 mi', rating: 4.6, note: 'Oceanfront with lazy river' },
				{ name: 'Marriott Grande Dunes', type: 'Resort', price: '$189', distance: '2.8 mi', rating: 4.8, note: 'Luxury beachfront resort' },
				{ name: 'Hampton Inn Oceanfront', type: 'Hotel', price: '$139', distance: '1.5 mi', rating: 4.5, note: 'Great value, beach access' },
				{ name: 'Anderson Ocean Club', type: 'Resort', price: '$149', distance: '1.8 mi', rating: 4.6, note: 'Condo-style, full kitchens' },
				{ name: 'Breakers Resort', type: 'Resort', price: '$129', distance: '2.1 mi', rating: 4.4, note: 'Water park, family-friendly' },
				{ name: 'Best Western Plus', type: 'Hotel', price: '$109', distance: '2.5 mi', rating: 4.3, note: 'Budget option' }
			],
			dining: [
				{ name: 'Sea Captain\'s House', cuisine: 'Seafood', price: '$$$', rating: 4.8, note: 'Oceanfront, MB institution' },
				{ name: 'The Library Restaurant', cuisine: 'Steakhouse', price: '$$$', rating: 4.7, note: 'Upscale dining' },
				{ name: 'California Dreaming', cuisine: 'American', price: '$$', rating: 4.6, note: 'Family-friendly, generous portions' },
				{ name: 'Hook & Barrel', cuisine: 'Seafood/Oyster Bar', price: '$$', rating: 4.7, note: 'Fresh catches daily' },
				{ name: 'Johnny D\'s Waffles', cuisine: 'Breakfast', price: '$', rating: 4.8, note: 'Best breakfast in MB' },
				{ name: 'Croissants Bistro & Bakery', cuisine: 'French Cafe', price: '$$', rating: 4.7, note: 'Pastries and lunch' }
			],
			activities: [
				{ name: 'Beach & Swimming', category: 'Water Activities', icon: '🏖️' },
				{ name: 'Golf (100+ Courses)', category: 'Recreation', icon: '⛳' },
				{ name: 'Broadway at the Beach', category: 'Entertainment', icon: '🎡' },
				{ name: 'SkyWheel (Ferris Wheel)', category: 'Attractions', icon: '🎡' },
				{ name: 'Ripley\'s Aquarium', category: 'Family Fun', icon: '🐠' },
				{ name: 'Brookgreen Gardens', category: 'Nature', icon: '🌺' },
				{ name: 'Live Shows & Theaters', category: 'Entertainment', icon: '🎭' },
				{ name: 'Outlet Shopping', category: 'Shopping', icon: '🛍️' },
				{ name: 'Water Sports', category: 'Water Activities', icon: '🏄' },
				{ name: 'Deep Sea Fishing', category: 'Water Activities', icon: '🎣' }
			],
			reviews: [
				{ 
					author: 'Timothy R.', 
					avatar: 'TR', 
					rating: 5, 
					date: '2024', 
					text: 'Our family has attended Myrtle Beach for 7 years and it never disappoints! LCG does an outstanding job organizing the feast. The beach is beautiful, the weather is always perfect, and there\'s so much to do. Our teenagers love the youth activities and we enjoy the golf. Highly recommend!' 
				},
				{ 
					author: 'Angela M.', 
					avatar: 'AM', 
					rating: 5, 
					date: '2024', 
					text: 'First time at this site and we were impressed! The Myrtle Beach Convention Center is excellent and centrally located. We loved Broadway at the Beach and the variety of restaurants. The services were inspiring and the fellowship was wonderful. Already planning to return!' 
				},
				{ 
					author: 'Paul & Diane K.', 
					avatar: 'PK', 
					rating: 5, 
					date: '2024', 
					text: 'Myrtle Beach is one of LCG\'s best sites. Perfect balance of spiritual focus and family activities. We played golf, visited Ripley\'s Aquarium, and spent time on the beautiful beach. The messages were powerful and we made lifelong friends. This is a premier feast destination!' 
				},
				{ 
					author: 'Rebecca S.', 
					avatar: 'RS', 
					rating: 4, 
					date: '2023', 
					text: 'Great feast site with something for everyone! The beach is wide and clean, the boardwalk is fun for kids, and there are excellent restaurants everywhere. LCG\'s organization was top-notch. Only slight downside is it can be crowded, but that\'s because it\'s so popular!' 
				}
			],
			costEstimate: {
				accommodations: { min: 900, max: 1500, note: '8 nights (Oct 15-23, 2025)' },
				meals: { min: 350, max: 700, note: 'Per person, wide variety' },
				activities: { min: 200, max: 500, note: 'Beach free, golf/attractions extra' },
				travel: { min: 200, max: 800, note: 'Myrtle Beach airport (MYR)' }
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

					<!-- Location Map -->
					<Card>
						{#snippet header()}
							<Heading level={2} variant="subheading">📍 Location</Heading>
						{/snippet}
						
						<div class="space-y-4">
							<Map 
								lat={site.coordinates.lat} 
								lng={site.coordinates.lng}
								markerTitle={site.name}
								height="450px"
							/>
							
							<div class="bg-gray-50 p-4 rounded-lg">
								<Text class="font-medium" style="color: #111827;">📍 Meeting Venue</Text>
								<Text class="mt-1">{site.meetingLocation}</Text>
								<Text variant="secondary" class="text-sm mt-1">{site.meetingAddress}</Text>
								
								<div class="mt-3 flex gap-2">
									<Button 
										size="sm" 
										outline
										onclick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${site.coordinates.lat},${site.coordinates.lng}`, '_blank')}
									>
										🚗 Get Directions
									</Button>
									<Button 
										size="sm" 
										outline
										onclick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`, '_blank')}
									>
										🔍 View on Google Maps
									</Button>
								</div>
							</div>
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
