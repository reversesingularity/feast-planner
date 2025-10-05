<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	
	let email = $state('');
	let code = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let isLoading = $state(false);
	let showResetForm = $state(false);
	
	async function handleRequestCode() {
		if (!email) {
			error = 'Please enter your email address';
			return;
		}
		
		isLoading = true;
		error = '';
		
		const result = await authStore.resetPassword(email);
		
		if (result.success) {
			showResetForm = true;
		} else {
			error = result.error || 'Failed to send reset code';
		}
		
		isLoading = false;
	}
	
	async function handleResetPassword() {
		if (!code || !newPassword || !confirmPassword) {
			error = 'Please fill in all fields';
			return;
		}
		
		if (newPassword !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}
		
		if (newPassword.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}
		
		isLoading = true;
		error = '';
		
		const result = await authStore.confirmResetPassword(email, code, newPassword);
		
		if (result.success) {
			// Show success and redirect
			alert('Password reset successful! Please sign in with your new password.');
			goto('/auth/signin');
		} else {
			error = result.error || 'Failed to reset password';
		}
		
		isLoading = false;
	}
</script>

<svelte:head>
	<title>Reset Password - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<!-- Logo/Branding -->
		<div class="text-center mb-8">
			<div class="text-5xl mb-4">🔐</div>
			<Heading level={1} class="text-3xl">
				{showResetForm ? 'Reset Password' : 'Forgot Password?'}
			</Heading>
			<Text variant="secondary" class="mt-2">
				{showResetForm 
					? `Enter the code sent to ${email}` 
					: "No worries, we'll send you reset instructions"}
			</Text>
		</div>
		
		<!-- Reset Card -->
		<Card class="shadow-xl">
			{#if !showResetForm}
				<!-- Request Code Form -->
				<form onsubmit={(e) => { e.preventDefault(); handleRequestCode(); }}>
					<div class="space-y-6">
						<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<Text class="text-sm text-blue-800">
								📧 Enter your email and we'll send you a reset code
							</Text>
						</div>
						
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
						
						<!-- Send Code Button -->
						<Button
							type="submit"
							color="blue"
							class="w-full"
							disabled={isLoading}
						>
							{#if isLoading}
								<span class="flex items-center justify-center gap-2">
									<span class="animate-spin">⏳</span>
									Sending code...
								</span>
							{:else}
								Send Reset Code
							{/if}
						</Button>
						
						<!-- Back to Sign In -->
						<div class="text-center">
							<a href="/auth/signin" class="text-sm text-blue-600 hover:underline">
								← Back to Sign In
							</a>
						</div>
					</div>
				</form>
			{:else}
				<!-- Reset Password Form -->
				<form onsubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
					<div class="space-y-6">
						<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<Text class="text-sm text-blue-800">
								📧 Check your email for a 6-digit code
							</Text>
						</div>
						
						<!-- Verification Code -->
						<div>
							<label for="code" class="block text-sm font-medium text-gray-700 mb-2">
								Verification Code
							</label>
							<Input
								id="code"
								type="text"
								bind:value={code}
								placeholder="123456"
								maxlength={6}
								class="text-center text-xl tracking-widest"
								required
							/>
						</div>
						
						<!-- New Password -->
						<div>
							<label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
								New Password
							</label>
							<Input
								id="newPassword"
								type="password"
								bind:value={newPassword}
								placeholder="••••••••"
								autocomplete="new-password"
								required
							/>
							<Text variant="secondary" class="text-xs mt-1">
								Must be at least 8 characters with uppercase, lowercase, and number
							</Text>
						</div>
						
						<!-- Confirm Password -->
						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
								Confirm New Password
							</label>
							<Input
								id="confirmPassword"
								type="password"
								bind:value={confirmPassword}
								placeholder="••••••••"
								autocomplete="new-password"
								required
							/>
							{#if confirmPassword && newPassword !== confirmPassword}
								<Text class="text-xs text-red-600 mt-1">Passwords do not match</Text>
							{/if}
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
						
						<!-- Reset Button -->
						<Button
							type="submit"
							color="blue"
							class="w-full"
							disabled={isLoading}
						>
							{#if isLoading}
								<span class="flex items-center justify-center gap-2">
									<span class="animate-spin">⏳</span>
									Resetting password...
								</span>
							{:else}
								Reset Password
							{/if}
						</Button>
						
						<!-- Resend Code -->
						<div class="text-center">
							<button
								type="button"
								onclick={handleRequestCode}
								class="text-sm text-blue-600 hover:underline"
							>
								Didn't receive a code? Resend
							</button>
						</div>
					</div>
				</form>
			{/if}
		</Card>
		
		<!-- Security Note -->
		<div class="mt-6 text-center">
			<Text variant="secondary" class="text-xs">
				🔒 Your password is encrypted and secure with AWS Cognito
			</Text>
		</div>
	</div>
</div>
