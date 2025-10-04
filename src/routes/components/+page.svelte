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

<div class="min-h-screen p-8" style="background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<Heading level={1} class="mb-2">🎨 Component Library</Heading>
			<Text>Badge, Input & Card Components - Converted from Catalyst to Svelte 5</Text>
			<div class="flex gap-3 justify-center mt-4">
				<Button href="/" variant="outline" size="sm">← Home</Button>
				<Button href="/utilities" color="indigo" size="sm">View Utilities →</Button>
			</div>
		</div>

		<!-- Badge Component -->
		<section class="mb-12">
			<Card>
				{#snippet header()}
					<Heading level={2}>Badge Component</Heading>
					<Text class="mt-1">Status indicators with 19 color variants</Text>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Status Badges -->
					<div>
						<Heading level={3} variant="subheading" class="mb-3">Site Status</Heading>
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
						<Heading level={3} variant="subheading" class="mb-3">All Color Variants</Heading>
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
						<Heading level={3} variant="subheading" class="mb-3">Usage</Heading>
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
					<Heading level={2}>Input Component</Heading>
					<Text class="mt-1">Form inputs with labels, validation & error states</Text>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Search Example -->
					<div>
						<Heading level={3} variant="subheading" class="mb-3">Search Input</Heading>
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
						<Heading level={3} variant="subheading" class="mb-3">Login Form</Heading>
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
						<Heading level={3} variant="subheading" class="mb-3">Input Types</Heading>
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
						<Heading level={3} variant="subheading" class="mb-3">Usage</Heading>
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
					<Heading level={2}>Card Component</Heading>
					<Text class="mt-1">Containers with header, content & footer sections</Text>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Site Cards Grid -->
					<div>
						<Heading level={3} variant="subheading" class="mb-3">Feast Site Cards</Heading>
						<div class="grid md:grid-cols-3 gap-4">
							{#each sitesamples as site}
								<Card hoverable>
									{#snippet header()}
										<div class="flex items-start justify-between">
											<Heading level={3}>{site.name}</Heading>
											<Badge color={site.color}>{site.status}</Badge>
										</div>
									{/snippet}
									
									<div class="space-y-2">
										<Text class="text-sm">📅 {site.dates}</Text>
										<Text class="text-sm">👥 {site.attendees} attendees</Text>
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
						<Heading level={3} variant="subheading" class="mb-3">Card Variants</Heading>
						<div class="grid md:grid-cols-2 gap-4">
							<!-- Simple Card -->
							<Card>
								<Heading level={4} variant="subheading" class="mb-2">Simple Card</Heading>
								<Text class="text-sm">Just content, no header or footer</Text>
							</Card>
							
							<!-- Clickable Card -->
							<Card href="/" hoverable>
								<Heading level={4} variant="subheading" class="mb-2">Clickable Card</Heading>
								<Text class="text-sm">Hover me! I'm a link to the home page</Text>
							</Card>
						</div>
					</div>
					
					<!-- Usage Example -->
					<div>
						<Heading level={3} variant="subheading" class="mb-3">Usage</Heading>
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
