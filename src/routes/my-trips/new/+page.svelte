<script lang="ts">
	import { goto } from '$app/navigation';
	import { createTrip, type CreateTripInput } from '$lib/services/tripDb';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import Toast from '$lib/components/Toast.svelte';
	
	// Available feast sites (would come from database)
	const feastSites = [
		{ value: 'daytona-beach-fl', label: 'Daytona Beach, FL (COGWA)', org: 'COGWA', fullName: 'Daytona Beach, FL', location: 'United States' },
		{ value: 'panama-city-beach-fl', label: 'Panama City Beach, FL (UCG)', org: 'UCG', fullName: 'Panama City Beach, FL', location: 'United States' },
		{ value: 'lake-of-the-ozarks-mo', label: 'Lake of the Ozarks, MO (LCG)', org: 'LCG', fullName: 'Lake of the Ozarks, MO', location: 'United States' },
		{ value: 'branson-mo', label: 'Branson, MO (Church of the Great God)', org: 'Church of the Great God', fullName: 'Branson, MO', location: 'United States' },
		{ value: 'wisconsin-dells-wi', label: 'Wisconsin Dells, WI (CGI)', org: 'CGI', fullName: 'Wisconsin Dells, WI', location: 'United States' },
		{ value: 'jekyll-island-ga', label: 'Jekyll Island, GA (Restored Church of God)', org: 'Restored Church of God', fullName: 'Jekyll Island, GA', location: 'United States' },
		{ value: 'victoria-bc', label: 'Victoria, BC (UCG)', org: 'UCG', fullName: 'Victoria, BC', location: 'Canada' },
		{ value: 'tucson-az', label: 'Tucson, AZ (Philadelphia Church of God)', org: 'Philadelphia Church of God', fullName: 'Tucson, AZ', location: 'United States' },
		{ value: 'bacolod-philippines', label: 'Bacolod, Philippines (COGWA)', org: 'COGWA', fullName: 'Bacolod, Philippines', location: 'Philippines' },
		{ value: 'taupo-nz', label: 'Taupō, New Zealand (COGWA)', org: 'COGWA', fullName: 'Taupō, New Zealand', location: 'New Zealand' }
	];
	
	// Form state
	let tripName = $state('');
	let selectedSite = $state('');
	let year = $state('2025');
	let attendees = $state(1);
	let accommodationType = $state('');
	let transportationMode = $state('');
	let budgetRange = $state('');
	let notes = $state('');
	let currentStep = $state(1);
	let saving = $state(false);
	let toastMessage = $state('');
	let toastType = $state<'success' | 'error' | 'info' | 'warning'>('info');
	let showToast = $state(false);
	
	// Validation
	const canProceed = $derived(
		currentStep === 1 ? (tripName.trim() !== '' && selectedSite !== '') : true
	);
	
	function nextStep() {
		if (canProceed) {
			currentStep++;
		}
	}
	
	function prevStep() {
		currentStep--;
	}
	
	async function createNewTrip() {
		if (saving) return;
		
		saving = true;
		
		try {
			// Extract site info
			const siteInfo = feastSites.find(s => s.value === selectedSite);
			if (!siteInfo) {
				throw new Error('Please select a feast site');
			}
			
			// Create trip data
			const tripInput: CreateTripInput = {
				siteName: tripName || siteInfo.fullName,
				siteSlug: selectedSite,
				location: siteInfo.location,
				organization: siteInfo.org,
				dates: `October 6-15, ${year}`,
				attendees,
				accommodationType: accommodationType || undefined,
				transportationMode: transportationMode || undefined,
				budgetRange: budgetRange || undefined,
				notes: notes || undefined,
				status: 'planned'
			};
			
			// Save to database
			const newTrip = await createTrip(tripInput);
			
			console.log('✅ Trip created:', newTrip.tripId);
			showToastMessage('Trip created successfully! 🎉', 'success');
			
			// Redirect to the new trip page after a short delay
			setTimeout(() => {
				goto(`/my-trips/${newTrip.tripId}`);
			}, 1000);
			
		} catch (err: any) {
			console.error('❌ Failed to create trip:', err);
			showToastMessage(err.message || 'Failed to create trip. Please try again.', 'error');
			saving = false;
		}
	}
	
	function showToastMessage(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
		toastMessage = message;
		toastType = type;
		showToast = true;
	}
	
	const selectedSiteInfo = $derived(
		feastSites.find(s => s.value === selectedSite)
	);
</script>

<svelte:head>
	<title>Create New Trip - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
	<!-- Header -->
	<div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<Heading level={1} class="!text-white text-4xl mb-2">
				Create New Trip
			</Heading>
			<Text class="text-blue-100">
				Let's plan your Feast of Tabernacles experience
			</Text>
		</div>
	</div>

	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Progress Steps -->
		<div class="mb-8">
			<div class="flex items-center justify-between mb-2">
				{#each [1, 2, 3] as step}
					<div class="flex items-center {step < 3 ? 'flex-1' : ''}">
						<div 
							class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors {
								step === currentStep 
									? 'bg-blue-600 text-white' 
									: step < currentStep 
										? 'bg-green-500 text-white'
										: 'bg-gray-200 text-gray-500'
							}"
						>
							{#if step < currentStep}
								✓
							{:else}
								{step}
							{/if}
						</div>
						{#if step < 3}
							<div 
								class="flex-1 h-1 mx-2 transition-colors {
									step < currentStep ? 'bg-green-500' : 'bg-gray-200'
								}"
							></div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex justify-between text-sm">
				<Text variant="secondary">Basic Info</Text>
				<Text variant="secondary">Review</Text>
				<Text variant="secondary">Confirm</Text>
			</div>
		</div>

		<!-- Step 1: Basic Information -->
		{#if currentStep === 1}
			<Card>
				{#snippet header()}
					<Heading level={2} variant="subheading">Step 1: Basic Information</Heading>
				{/snippet}
				
				<div class="space-y-6">
					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Trip Name</Text>
						</label>
						<Input
							type="text"
							bind:value={tripName}
							placeholder="e.g., Daytona Beach 2025"
							class="w-full"
						/>
						<Text variant="secondary" class="text-sm mt-1">
							Give your trip a memorable name
						</Text>
					</div>

					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Feast Site</Text>
						</label>
						<select
							bind:value={selectedSite}
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
						>
							<option value="">Select a feast site...</option>
							{#each feastSites as site}
								<option value={site.value}>{site.label}</option>
							{/each}
						</select>
						<Text variant="secondary" class="text-sm mt-1">
							Choose where you'll celebrate the Feast
						</Text>
					</div>

					<div>
						<label class="block mb-2">
							<Text class="font-medium" style="color: #111827;">Year</Text>
						</label>
						<select
							bind:value={year}
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
						>
							<option value="2025">2025</option>
							<option value="2026">2026</option>
							<option value="2027">2027</option>
						</select>
					</div>

					{#if selectedSite}
						<div class="bg-blue-50 p-4 rounded-lg">
							<Text class="font-medium mb-2" style="color: #111827;">📍 Selected Site</Text>
							<Text>{selectedSiteInfo?.label || ''}</Text>
							<Button 
								href="/sites/{selectedSite}" 
								plain 
								class="mt-2 text-blue-600 hover:text-blue-700"
							>
								View site details →
							</Button>
						</div>
					{/if}
				</div>

				{#snippet footer()}
					<div class="flex justify-between">
						<Button href="/my-trips" outline>
							Cancel
						</Button>
						<Button 
							color="blue" 
							disabled={!canProceed}
							onclick={nextStep}
						>
							Next: Review →
						</Button>
					</div>
				{/snippet}
			</Card>
		{/if}

		<!-- Step 2: Review -->
		{#if currentStep === 2}
			<Card>
				{#snippet header()}
					<Heading level={2} variant="subheading">Step 2: Additional Details</Heading>
				{/snippet}
				
				<div class="space-y-6">
					<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
						<Heading level={3} class="text-2xl mb-4">{tripName}</Heading>
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<span>📍</span>
								<Text>{selectedSiteInfo?.label || ''}</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>📅</span>
								<Text>October 15-23, {year}</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>⛪</span>
								<Text>{selectedSiteInfo?.org || ''}</Text>
							</div>
						</div>
					</div>
					
					<div class="space-y-4">
						<Text class="font-semibold" style="color: #111827;">Optional: Add more details about your trip</Text>
						
						<div>
							<label class="block mb-2">
								<Text class="font-medium" style="color: #111827;">Number of Attendees</Text>
							</label>
							<Input
								type="number"
								bind:value={attendees}
								min="1"
								max="50"
								class="w-full"
							/>
							<Text variant="secondary" class="text-sm mt-1">
								How many people will be attending?
							</Text>
						</div>
						
						<div>
							<label class="block mb-2">
								<Text class="font-medium" style="color: #111827;">Accommodation Type</Text>
							</label>
							<select
								bind:value={accommodationType}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
							>
								<option value="">Select accommodation...</option>
								<option value="Hotel">Hotel</option>
								<option value="Resort">Resort</option>
								<option value="Vacation Rental">Vacation Rental</option>
								<option value="Condo">Condo</option>
								<option value="RV/Camping">RV/Camping</option>
								<option value="Other">Other</option>
							</select>
						</div>
						
						<div>
							<label class="block mb-2">
								<Text class="font-medium" style="color: #111827;">Transportation Mode</Text>
							</label>
							<select
								bind:value={transportationMode}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
							>
								<option value="">Select transportation...</option>
								<option value="Flying">Flying</option>
								<option value="Driving">Driving</option>
								<option value="Train">Train</option>
								<option value="Bus">Bus</option>
								<option value="Other">Other</option>
							</select>
						</div>
						
						<div>
							<label class="block mb-2">
								<Text class="font-medium" style="color: #111827;">Budget Range</Text>
							</label>
							<select
								bind:value={budgetRange}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
							>
								<option value="">Select budget range...</option>
								<option value="Under $1000">Under $1000</option>
								<option value="$1000-$2000">$1000-$2000</option>
								<option value="$2000-$3000">$2000-$3000</option>
								<option value="$3000-$5000">$3000-$5000</option>
								<option value="$5000+">$5000+</option>
							</select>
						</div>
						
						<div>
							<label class="block mb-2">
								<Text class="font-medium" style="color: #111827;">Notes</Text>
							</label>
							<textarea
								bind:value={notes}
								rows="4"
								placeholder="Add any additional notes or special requirements..."
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
							></textarea>
						</div>
					</div>

					<div>
						<Text class="font-medium mb-2" style="color: #111827;">Want to change something?</Text>
						<div class="flex gap-2">
							<Button outline onclick={prevStep}>
								← Edit Basic Info
							</Button>
						</div>
					</div>
				</div>

				{#snippet footer()}
					<div class="flex justify-between">
						<Button outline onclick={prevStep}>
							← Back
						</Button>
						<Button color="blue" onclick={nextStep}>
							Next: Confirm →
						</Button>
					</div>
				{/snippet}
			</Card>
		{/if}

		<!-- Step 3: Confirm -->
		{#if currentStep === 3}
			<Card>
				{#snippet header()}
					<Heading level={2} variant="subheading">Step 3: Ready to Create!</Heading>
				{/snippet}
				
				<div class="text-center py-8 space-y-6">
					<div class="text-6xl">🎉</div>
					<div>
						<Heading level={3} class="text-2xl mb-2">
							Your trip is ready to be created!
						</Heading>
						<Text class="text-lg">
							Click below to start planning your {year} Feast at {selectedSiteInfo?.label?.split('(')[0].trim() || 'your chosen site'}
						</Text>
					</div>
					
					{#if attendees > 1 || accommodationType || transportationMode || budgetRange || notes}
						<div class="max-w-md mx-auto bg-blue-50 p-6 rounded-lg text-left">
							<Text class="font-semibold mb-3" style="color: #111827;">Trip Summary:</Text>
							<div class="space-y-2 text-sm">
								{#if attendees > 1}
									<div class="flex items-center gap-2">
										<span>👥</span>
										<Text>{attendees} people attending</Text>
									</div>
								{/if}
								{#if accommodationType}
									<div class="flex items-center gap-2">
										<span>🏨</span>
										<Text>{accommodationType}</Text>
									</div>
								{/if}
								{#if transportationMode}
									<div class="flex items-center gap-2">
										<span>
											{#if transportationMode === 'Flying'}✈️
											{:else if transportationMode === 'Driving'}🚗
											{:else if transportationMode === 'Train'}🚆
											{:else}🚌
											{/if}
										</span>
										<Text>{transportationMode}</Text>
									</div>
								{/if}
								{#if budgetRange}
									<div class="flex items-center gap-2">
										<span>💰</span>
										<Text>{budgetRange}</Text>
									</div>
								{/if}
								{#if notes}
									<div class="pt-2 border-t border-blue-200">
										<Text class="font-medium mb-1" style="color: #111827;">Notes:</Text>
										<Text variant="secondary" class="text-xs">{notes}</Text>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					<div class="max-w-md mx-auto bg-green-50 p-6 rounded-lg">
						<Text class="font-semibold mb-4" style="color: #111827;">You'll be able to add:</Text>
						<div class="grid grid-cols-2 gap-3 text-left">
							<div class="flex items-center gap-2">
								<span>✈️</span>
								<Text class="text-sm">Flight details</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>🏨</span>
								<Text class="text-sm">Accommodations</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>🚗</span>
								<Text class="text-sm">Transportation</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>🎯</span>
								<Text class="text-sm">Activities</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>🍽️</span>
								<Text class="text-sm">Dining plans</Text>
							</div>
							<div class="flex items-center gap-2">
								<span>📝</span>
								<Text class="text-sm">Custom notes</Text>
							</div>
						</div>
					</div>
				</div>

				{#snippet footer()}
					<div class="flex justify-between">
						<Button outline onclick={prevStep} disabled={saving}>
							← Back
						</Button>
						<Button color="blue" onclick={createNewTrip} disabled={saving}>
							{#if saving}
								⏳ Creating Trip...
							{:else}
								🚀 Create My Trip
							{/if}
						</Button>
					</div>
				{/snippet}
			</Card>
		{/if}

		<!-- Back Link -->
		<div class="mt-8 text-center">
			<Button href="/my-trips" plain disabled={saving}>
				← Cancel and go back
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
