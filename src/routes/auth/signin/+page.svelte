<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);
	
	async function handleSignIn() {
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}
		
		isLoading = true;
		error = '';
		
		const result = await authStore.signIn(email, password);
		
		if (result.success) {
			// Redirect to my trips or where they were trying to go
			goto('/my-trips');
		} else {
			error = result.error || 'Failed to sign in. Please check your credentials.';
		}
		
		isLoading = false;
	}
	
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSignIn();
		}
	}
</script>

<svelte:head>
	<title>Sign In - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<!-- Logo/Branding -->
		<div class="text-center mb-8">
			<div class="text-5xl mb-4">🎉</div>
			<Heading level={1} class="text-3xl">Welcome Back</Heading>
			<Text variant="secondary" class="mt-2">Sign in to access your feast plans</Text>
		</div>
		
		<!-- Sign In Card -->
		<Card class="shadow-xl">
			<form onsubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
				<div class="space-y-6">
					<!-- Email Input -->
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<Input
							id="email"
							type="email"
							bind:value={email}
							placeholder="you@example.com"
							autocomplete="email"
							onkeypress={handleKeyPress}
							required
						/>
					</div>
					
					<!-- Password Input -->
					<div>
						<div class="flex items-center justify-between mb-2">
							<label for="password" class="block text-sm font-medium text-gray-700">
								Password
							</label>
							<a href="/auth/forgot-password" class="text-sm text-blue-600 hover:underline">
								Forgot password?
							</a>
						</div>
						<Input
							id="password"
							type="password"
							bind:value={password}
							placeholder="••••••••"
							autocomplete="current-password"
							onkeypress={handleKeyPress}
							required
						/>
					</div>
					
					<!-- Error Message -->
					{#if error}
						<div class="bg-red-50 border border-red-200 rounded-lg p-4">
							<div class="flex items-start gap-2">
								<span class="text-red-600">⚠️</span>
								<Text class="text-red-800 text-sm">{error}</Text>
							</div>
						</div>
					{/if}
					
					<!-- Sign In Button -->
					<Button
						type="submit"
						color="blue"
						class="w-full"
						disabled={isLoading}
					>
						{#if isLoading}
							<span class="flex items-center justify-center gap-2">
								<span class="animate-spin">⏳</span>
								Signing in...
							</span>
						{:else}
							Sign In
						{/if}
					</Button>
					
					<!-- Divider -->
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-300"></div>
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="px-2 bg-white text-gray-500">Don't have an account?</span>
						</div>
					</div>
					
					<!-- Sign Up Link -->
					<Button
						href="/auth/signup"
						outline
						class="w-full"
					>
						Create Account
					</Button>
					
					<!-- Back to Home -->
					<div class="text-center">
						<a href="/" class="text-sm text-gray-600 hover:text-gray-900 hover:underline">
							← Back to Home
						</a>
					</div>
				</div>
			</form>
		</Card>
		
		<!-- Security Note -->
		<div class="mt-6 text-center">
			<Text variant="secondary" class="text-xs">
				🔒 Your data is encrypted and secure with AWS Cognito
			</Text>
		</div>
	</div>
</div>
