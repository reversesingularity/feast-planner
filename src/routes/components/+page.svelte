<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Input from '$lib/components/Input.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	
	// Form state
	let email = $state('');
	let password = $state('');
	let searchQuery = $state('');
	let emailError = $state('');
	
	// Sample data for cards
	const sitesamples = [
		{
			name: 'Panama City Beach, FL',
			dates: 'Oct 15-22, 2025',
			status: 'Available',
			color: 'green' as const,
			attendees: 1200
		},
		{
			name: 'Wisconsin Dells, WI',
			dates: 'Oct 15-22, 2025',
			status: 'Full',
			color: 'red' as const,
			attendees: 850
		},
		{
			name: 'Lake of the Ozarks, MO',
			dates: 'Oct 15-22, 2025',
			status: 'Active',
			color: 'blue' as const,
			attendees: 650
		},
	];
	
	function handleSubmit() {
		// Simple email validation
		if (!email.includes('@')) {
			emailError = 'Please enter a valid email address';
			return;
		}
		emailError = '';
		alert(`Form submitted!\nEmail: ${email}\nPassword: ${password.replace(/./g, '*')}`);
	}
	
	function handleSearch() {
		alert(`Searching for: "${searchQuery}"`);
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold !text-[#111827] mb-2">
				🎨 Component Library
			</h1>
			<p class="text-lg !text-[#4b5563]">
				Badge, Input & Card Components - Converted from Catalyst to Svelte 5
			</p>
			<div class="flex gap-3 justify-center mt-4">
				<Button href="/" variant="outline" size="sm">← Home</Button>
				<Button href="/utilities" color="indigo" size="sm">View Utilities →</Button>
			</div>
		</div>

		<!-- Badge Component -->
		<section class="mb-12">
			<Card>
				{#snippet header()}
					<h2 class="text-2xl font-bold !text-[#111827]">Badge Component</h2>
					<p class="!text-[#4b5563] mt-1">Status indicators with 19 color variants</p>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Status Badges -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Site Status</h3>
						<div class="flex flex-wrap gap-2">
							<Badge color="green">Available</Badge>
							<Badge color="blue">Active</Badge>
							<Badge color="yellow">Limited Spots</Badge>
							<Badge color="red">Full</Badge>
							<Badge color="zinc">Pending</Badge>
							<Badge color="purple">Featured</Badge>
						</div>
					</div>
					
					<!-- All Colors -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">All Color Variants</h3>
						<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
							<Badge color="red">Red</Badge>
							<Badge color="orange">Orange</Badge>
							<Badge color="amber">Amber</Badge>
							<Badge color="yellow">Yellow</Badge>
							<Badge color="lime">Lime</Badge>
							<Badge color="green">Green</Badge>
							<Badge color="emerald">Emerald</Badge>
							<Badge color="teal">Teal</Badge>
							<Badge color="cyan">Cyan</Badge>
							<Badge color="sky">Sky</Badge>
							<Badge color="blue">Blue</Badge>
							<Badge color="indigo">Indigo</Badge>
							<Badge color="violet">Violet</Badge>
							<Badge color="purple">Purple</Badge>
							<Badge color="fuchsia">Fuchsia</Badge>
							<Badge color="pink">Pink</Badge>
							<Badge color="rose">Rose</Badge>
							<Badge color="zinc">Zinc</Badge>
						</div>
					</div>
					
					<!-- Usage Example -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Usage</h3>
						<div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
							<pre class="text-sm"><code>{`<Badge color="green">Available</Badge>
<Badge color="red">Full</Badge>
<Badge color="blue">Active</Badge>`}</code></pre>
						</div>
					</div>
				</div>
			</Card>
		</section>

		<!-- Input Component -->
		<section class="mb-12">
			<Card>
				{#snippet header()}
					<h2 class="text-2xl font-bold !text-[#111827]">Input Component</h2>
					<p class="!text-[#4b5563] mt-1">Form inputs with labels, validation & error states</p>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Search Example -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Search Input</h3>
						<div class="flex gap-2">
							<div class="flex-1">
								<Input 
									type="search"
									bind:value={searchQuery}
									placeholder="Search for Feast sites..."
								/>
							</div>
							<Button color="blue" onclick={handleSearch}>
								Search
							</Button>
						</div>
					</div>
					
					<!-- Login Form Example -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Login Form</h3>
						<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
							<Input 
								label="Email Address"
								type="email"
								bind:value={email}
								placeholder="you@example.com"
								required
								error={emailError}
							/>
							
							<Input 
								label="Password"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								required
							/>
							
							<Button type="submit" color="indigo">
								Sign In
							</Button>
						</form>
					</div>
					
					<!-- Input Types -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Input Types</h3>
						<div class="grid md:grid-cols-2 gap-4">
							<Input label="Text" type="text" placeholder="Enter text" />
							<Input label="Email" type="email" placeholder="email@example.com" />
							<Input label="Number" type="number" placeholder="123" />
							<Input label="Date" type="date" />
							<Input label="Telephone" type="tel" placeholder="(123) 456-7890" />
							<Input label="Disabled" type="text" placeholder="Cannot edit" disabled />
						</div>
					</div>
					
					<!-- Usage Example -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Usage</h3>
						<div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
							<pre class="text-sm"><code>{`<Input 
  label="Email" 
  type="email" 
  bind:value={email}
  placeholder="you@example.com"
  required
  error={emailError}
/>`}</code></pre>
						</div>
					</div>
				</div>
			</Card>
		</section>

		<!-- Card Component -->
		<section class="mb-12">
			<Card>
				{#snippet header()}
					<h2 class="text-2xl font-bold !text-[#111827]">Card Component</h2>
					<p class="!text-[#4b5563] mt-1">Containers with header, content & footer sections</p>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Site Cards Grid -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Feast Site Cards</h3>
						<div class="grid md:grid-cols-3 gap-4">
							{#each sitesamples as site}
								<Card hoverable>
									{#snippet header()}
										<div class="flex items-start justify-between">
											<h3 class="font-semibold !text-[#111827]">{site.name}</h3>
											<Badge color={site.color}>{site.status}</Badge>
										</div>
									{/snippet}
									
									<div class="space-y-2">
										<p class="text-sm !text-[#4b5563]">📅 {site.dates}</p>
										<p class="text-sm !text-[#4b5563]">👥 {site.attendees} attendees</p>
									</div>
									
									{#snippet footer()}
										<Button color="blue" class="w-full">
											View Details
										</Button>
									{/snippet}
								</Card>
							{/each}
						</div>
					</div>
					
					<!-- Card Variants -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Card Variants</h3>
						<div class="grid md:grid-cols-2 gap-4">
							<!-- Simple Card -->
							<Card>
								<h4 class="font-semibold mb-2">Simple Card</h4>
								<p class="text-sm !text-[#4b5563]">Just content, no header or footer</p>
							</Card>
							
							<!-- Clickable Card -->
							<Card href="/" hoverable>
								<h4 class="font-semibold mb-2">Clickable Card</h4>
								<p class="text-sm !text-[#4b5563]">Hover me! I'm a link to the home page</p>
							</Card>
						</div>
					</div>
					
					<!-- Usage Example -->
					<div>
						<h3 class="text-sm font-semibold !text-[#374151] mb-3">Usage</h3>
						<div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
							<pre class="text-sm"><code>{`<Card hoverable>
  {#snippet header()}
    <h3>Header</h3>
  {/snippet}
  
  <p>Main content goes here</p>
  
  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>`}</code></pre>
						</div>
					</div>
				</div>
			</Card>
		</section>

		<!-- Back to Home -->
		<div class="text-center">
			<Button href="/" color="dark/zinc">
				← Back to Home
			</Button>
		</div>
	</div>
</div>

<style>
	pre {
		margin: 0;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
	}
</style>
