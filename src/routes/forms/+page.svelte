<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Link from '$lib/components/Link.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Select from '$lib/components/Select.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	
	// State for demo
	let agreeToTerms = $state(false);
	let emailOptIn = $state(false);
	let selectedPlan = $state('free');
	let selectedCountry = $state('');
</script>

<svelte:head>
	<title>Form Components - Feast Planner</title>
</svelte:head>

<div class="min-h-screen" style="background: linear-gradient(to bottom, #f9fafb, #ffffff);">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Page Header -->
		<div class="mb-12">
			<Heading level={1}>Form Components</Heading>
			<Text class="mt-2">
				New form and utility components: Link, Checkbox, Radio, Select, and Avatar.
			</Text>
		</div>

		<!-- Link Component -->
		<Card class="mb-8">
			{#snippet header()}
				<Heading level={2} variant="subheading">Link Component</Heading>
			{/snippet}
			
			<div class="space-y-4">
				<div>
					<Text variant="secondary" class="mb-2">Internal navigation:</Text>
					<Link href="/" class="text-blue-600 hover:text-blue-800 underline">
						Go to Home Page
					</Link>
				</div>
				
				<div>
					<Text variant="secondary" class="mb-2">External link (opens in new tab):</Text>
					<Link 
						href="https://github.com/reversesingularity/feast-planner" 
						class="text-blue-600 hover:text-blue-800 underline"
					>
						View on GitHub
					</Link>
				</div>
			</div>
		</Card>

		<!-- Checkbox Component -->
		<Card class="mb-8">
			{#snippet header()}
				<Heading level={2} variant="subheading">Checkbox Component</Heading>
			{/snippet}
			
			<div class="space-y-6">
				<div>
					<Heading level={3} class="text-lg font-semibold mb-4">Color Variants</Heading>
					<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="dark/zinc" checked={true} disabled />
							<Text>Dark/Zinc</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="blue" checked={true} disabled />
							<Text>Blue</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="indigo" checked={true} disabled />
							<Text>Indigo</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="green" checked={true} disabled />
							<Text>Green</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="red" checked={true} disabled />
							<Text>Red</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="orange" checked={true} disabled />
							<Text>Orange</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="purple" checked={true} disabled />
							<Text>Purple</Text>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<Checkbox color="pink" checked={true} disabled />
							<Text>Pink</Text>
						</label>
					</div>
				</div>
				
				<div>
					<Heading level={3} class="text-lg font-semibold mb-4">Interactive Examples</Heading>
					<div class="space-y-3">
						<label class="flex items-center gap-3 cursor-pointer">
							<Checkbox bind:checked={agreeToTerms} color="blue" />
							<Text>I agree to the terms and conditions</Text>
						</label>
						<label class="flex items-center gap-3 cursor-pointer">
							<Checkbox bind:checked={emailOptIn} color="green" />
							<Text>Send me email updates about new features</Text>
						</label>
						<Text variant="secondary" class="ml-8">
							Terms: {agreeToTerms ? 'Agreed ✓' : 'Not agreed'}, 
							Email: {emailOptIn ? 'Opted in ✓' : 'Opted out'}
						</Text>
					</div>
				</div>
			</div>
		</Card>

		<!-- Radio Component -->
		<Card class="mb-8">
			{#snippet header()}
				<Heading level={2} variant="subheading">Radio Component</Heading>
			{/snippet}
			
			<div class="space-y-6">
				<div>
					<Heading level={3} class="text-lg font-semibold mb-4">Plan Selection</Heading>
					<div class="space-y-3">
						<label class="flex items-center gap-3 cursor-pointer">
							<Radio 
								name="plan" 
								value="free" 
								checked={selectedPlan === 'free'}
								onchange={() => selectedPlan = 'free'}
								color="blue"
							/>
							<div>
								<Text class="font-medium">Free Plan</Text>
								<Text variant="secondary" class="text-sm">Perfect for trying out the service</Text>
							</div>
						</label>
						<label class="flex items-center gap-3 cursor-pointer">
							<Radio 
								name="plan" 
								value="pro" 
								checked={selectedPlan === 'pro'}
								onchange={() => selectedPlan = 'pro'}
								color="indigo"
							/>
							<div>
								<Text class="font-medium">Pro Plan</Text>
								<Text variant="secondary" class="text-sm">$29/month - Advanced features</Text>
							</div>
						</label>
						<label class="flex items-center gap-3 cursor-pointer">
							<Radio 
								name="plan" 
								value="enterprise" 
								checked={selectedPlan === 'enterprise'}
								onchange={() => selectedPlan = 'enterprise'}
								color="purple"
							/>
							<div>
								<Text class="font-medium">Enterprise Plan</Text>
								<Text variant="secondary" class="text-sm">Custom pricing - Unlimited everything</Text>
							</div>
						</label>
						<Text variant="secondary" class="mt-4">
							Selected plan: <strong style="color: #111827;">{selectedPlan}</strong>
						</Text>
					</div>
				</div>
			</div>
		</Card>

		<!-- Select Component -->
		<Card class="mb-8">
			{#snippet header()}
				<Heading level={2} variant="subheading">Select Component</Heading>
			{/snippet}
			
			<div class="space-y-6">
				<div class="max-w-md">
					<label class="block mb-2">
						<Text class="font-medium">Choose your country</Text>
					</label>
					<Select bind:value={selectedCountry}>
						<option value="">Select a country...</option>
						<option value="us">United States</option>
						<option value="ca">Canada</option>
						<option value="mx">Mexico</option>
						<option value="uk">United Kingdom</option>
						<option value="fr">France</option>
						<option value="de">Germany</option>
						<option value="jp">Japan</option>
						<option value="au">Australia</option>
					</Select>
					{#if selectedCountry}
						<Text variant="secondary" class="mt-2">
							You selected: <strong style="color: #111827;">{selectedCountry}</strong>
						</Text>
					{/if}
				</div>
				
				<div class="max-w-md">
					<label class="block mb-2">
						<Text class="font-medium">Select with validation error</Text>
					</label>
					<Select invalid={true}>
						<option value="">This field is required</option>
						<option value="option1">Option 1</option>
					</Select>
					<Text class="mt-1 text-sm text-red-600">
						Please select an option
					</Text>
				</div>
				
				<div class="max-w-md">
					<label class="block mb-2">
						<Text class="font-medium">Multi-select</Text>
					</label>
					<select multiple={true} class="min-h-32 relative block w-full appearance-none rounded-lg py-[calc(theme(spacing.2.5)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)] px-[calc(theme(spacing.3.5)-1px)] sm:px-[calc(theme(spacing.3)-1px)] text-base/6 sm:text-sm/6 border border-gray-300 hover:border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150" style="color: #111827;">
						<option value="feature1">Advanced Analytics</option>
						<option value="feature2">Team Collaboration</option>
						<option value="feature3">Priority Support</option>
						<option value="feature4">Custom Branding</option>
						<option value="feature5">API Access</option>
					</select>
					<Text variant="secondary" class="mt-1 text-sm">
						Hold Ctrl/Cmd to select multiple options
					</Text>
				</div>
			</div>
		</Card>

		<!-- Avatar Component -->
		<Card class="mb-8">
			{#snippet header()}
				<Heading level={2} variant="subheading">Avatar Component</Heading>
			{/snippet}
			
			<div class="space-y-6">
				<div>
					<Heading level={3} class="text-lg font-semibold mb-4">With Initials</Heading>
					<div class="flex flex-wrap gap-4 items-center">
						<Avatar initials="JD" class="size-10 bg-blue-500 text-white" />
						<Avatar initials="SM" class="size-12 bg-green-500 text-white" />
						<Avatar initials="AB" class="size-16 bg-purple-500 text-white" />
						<Avatar initials="CD" class="size-20 bg-pink-500 text-white" />
					</div>
				</div>
				
				<div>
					<Heading level={3} class="text-lg font-semibold mb-4">Square Variants</Heading>
					<div class="flex flex-wrap gap-4 items-center">
						<Avatar initials="RT" square={true} class="size-10 bg-indigo-500 text-white" />
						<Avatar initials="FP" square={true} class="size-12 bg-orange-500 text-white" />
						<Avatar initials="WB" square={true} class="size-16 bg-red-500 text-white" />
					</div>
				</div>
				
				<div>
					<Heading level={3} class="text-lg font-semibold mb-4">With Images</Heading>
					<div class="flex flex-wrap gap-4 items-center">
						<Avatar 
							src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
							alt="John Doe"
							class="size-10"
						/>
						<Avatar 
							src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
							alt="Sarah Miller"
							class="size-12"
						/>
						<Avatar 
							src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
							alt="Alex Brown"
							class="size-16"
						/>
					</div>
				</div>
			</div>
		</Card>

		<!-- Back to Home -->
		<div class="text-center mt-12">
			<Button href="/" color="dark/zinc">
				← Back to Home
			</Button>
		</div>
	</div>
</div>
