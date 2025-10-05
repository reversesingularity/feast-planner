<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let isLoading = $state(false);
	let showVerification = $state(false);
	let verificationCode = $state('');
	
	// Password validation
	const passwordRequirements = $derived({
		minLength: password.length >= 8,
		hasUppercase: /[A-Z]/.test(password),
		hasLowercase: /[a-z]/.test(password),
		hasNumber: /[0-9]/.test(password)
	});
	
	const isPasswordValid = $derived(
		passwordRequirements.minLength &&
		passwordRequirements.hasUppercase &&
		passwordRequirements.hasLowercase &&
		passwordRequirements.hasNumber
	);
	
	async function handleSignUp() {
		// Validation
		if (!name || !email || !password || !confirmPassword) {
			error = 'Please fill in all fields';
			return;
		}
		
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}
		
		if (!isPasswordValid) {
			error = 'Password does not meet requirements';
			return;
		}
		
		isLoading = true;
		error = '';
		
		const result = await authStore.signUp(email, password, name);
		
		if (result.success) {
			if (result.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
				showVerification = true;
			} else {
				// Auto sign-in if no verification needed
				goto('/my-trips');
			}
		} else {
			error = result.error || 'Failed to create account';
		}
		
		isLoading = false;
	}
	
	async function handleVerification() {
		if (!verificationCode) {
			error = 'Please enter the verification code';
			return;
		}
		
		isLoading = true;
		error = '';
		
		const result = await authStore.confirmSignUp(email, verificationCode);
		
		if (result.success) {
			// Now sign them in
			await authStore.signIn(email, password);
			goto('/my-trips');
		} else {
			error = result.error || 'Invalid verification code';
		}
		
		isLoading = false;
	}
	
	async function resendCode() {
		const result = await authStore.resendConfirmationCode(email);
		if (result.success) {
			error = '';
			// Show success message temporarily
			const tempDiv = document.createElement('div');
			tempDiv.className = 'bg-green-50 border border-green-200 rounded-lg p-3 mb-4';
			tempDiv.innerHTML = '<p class="text-green-800 text-sm">✓ Code resent! Check your email.</p>';
			document.querySelector('form')?.prepend(tempDiv);
			setTimeout(() => tempDiv.remove(), 3000);
		} else {
			error = result.error || 'Failed to resend code';
		}
	}
</script>

<svelte:head>
	<title>Sign Up - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<!-- Logo/Branding -->
		<div class="text-center mb-8">
			<div class="text-5xl mb-4">🎉</div>
			<Heading level={1} class="text-3xl">
				{showVerification ? 'Verify Your Email' : 'Create Account'}
			</Heading>
			<Text variant="secondary" class="mt-2">
				{showVerification 
					? `We sent a code to ${email}` 
					: 'Start planning your perfect Feast experience'}
			</Text>
		</div>
		
		<!-- Sign Up Card -->
		<Card class="shadow-xl">
			{#if !showVerification}
				<!-- Sign Up Form -->
				<form onsubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
					<div class="space-y-6">
						<!-- Name Input -->
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							<Input
								id="name"
								type="text"
								bind:value={name}
								placeholder="John Doe"
								autocomplete="name"
								required
							/>
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
						
						<!-- Password Input -->
						<div>
							<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<Input
								id="password"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								autocomplete="new-password"
								required
							/>
							
							<!-- Password Requirements -->
							{#if password}
								<div class="mt-2 space-y-1">
									<div class="flex items-center gap-2 text-sm">
										<span class={passwordRequirements.minLength ? 'text-green-600' : 'text-gray-400'}>
											{passwordRequirements.minLength ? '✓' : '○'}
										</span>
										<Text class="text-xs" style="color: {passwordRequirements.minLength ? '#059669' : '#9ca3af'}">
											At least 8 characters
										</Text>
									</div>
									<div class="flex items-center gap-2 text-sm">
										<span class={passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-400'}>
											{passwordRequirements.hasUppercase ? '✓' : '○'}
										</span>
										<Text class="text-xs" style="color: {passwordRequirements.hasUppercase ? '#059669' : '#9ca3af'}">
											One uppercase letter
										</Text>
									</div>
									<div class="flex items-center gap-2 text-sm">
										<span class={passwordRequirements.hasLowercase ? 'text-green-600' : 'text-gray-400'}>
											{passwordRequirements.hasLowercase ? '✓' : '○'}
										</span>
										<Text class="text-xs" style="color: {passwordRequirements.hasLowercase ? '#059669' : '#9ca3af'}">
											One lowercase letter
										</Text>
									</div>
									<div class="flex items-center gap-2 text-sm">
										<span class={passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-400'}>
											{passwordRequirements.hasNumber ? '✓' : '○'}
										</span>
										<Text class="text-xs" style="color: {passwordRequirements.hasNumber ? '#059669' : '#9ca3af'}">
											One number
										</Text>
									</div>
								</div>
							{/if}
						</div>
						
						<!-- Confirm Password Input -->
						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
								Confirm Password
							</label>
							<Input
								id="confirmPassword"
								type="password"
								bind:value={confirmPassword}
								placeholder="••••••••"
								autocomplete="new-password"
								required
							/>
							{#if confirmPassword && password !== confirmPassword}
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
						
						<!-- Sign Up Button -->
						<Button
							type="submit"
							color="blue"
							class="w-full"
							disabled={isLoading || !isPasswordValid}
						>
							{#if isLoading}
								<span class="flex items-center justify-center gap-2">
									<span class="animate-spin">⏳</span>
									Creating account...
								</span>
							{:else}
								Create Account
							{/if}
						</Button>
						
						<!-- Terms -->
						<Text variant="secondary" class="text-xs text-center">
							By creating an account, you agree to our Terms of Service and Privacy Policy
						</Text>
						
						<!-- Divider -->
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t border-gray-300"></div>
							</div>
							<div class="relative flex justify-center text-sm">
								<span class="px-2 bg-white text-gray-500">Already have an account?</span>
							</div>
						</div>
						
						<!-- Sign In Link -->
						<Button
							href="/auth/signin"
							outline
							class="w-full"
						>
							Sign In
						</Button>
						
						<!-- Back to Home -->
						<div class="text-center">
							<a href="/" class="text-sm text-gray-600 hover:text-gray-900 hover:underline">
								← Back to Home
							</a>
						</div>
					</div>
				</form>
			{:else}
				<!-- Verification Form -->
				<form onsubmit={(e) => { e.preventDefault(); handleVerification(); }}>
					<div class="space-y-6">
						<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<Text class="text-sm text-blue-800">
								📧 Check your email for a 6-digit verification code
							</Text>
						</div>
						
						<!-- Verification Code Input -->
						<div>
							<label for="code" class="block text-sm font-medium text-gray-700 mb-2">
								Verification Code
							</label>
							<Input
								id="code"
								type="text"
								bind:value={verificationCode}
								placeholder="123456"
								maxlength={6}
								class="text-center text-2xl tracking-widest"
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
						
						<!-- Verify Button -->
						<Button
							type="submit"
							color="blue"
							class="w-full"
							disabled={isLoading}
						>
							{#if isLoading}
								<span class="flex items-center justify-center gap-2">
									<span class="animate-spin">⏳</span>
									Verifying...
								</span>
							{:else}
								Verify Email
							{/if}
						</Button>
						
						<!-- Resend Code -->
						<div class="text-center">
							<button
								type="button"
								onclick={resendCode}
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
				🔒 Your data is encrypted and secure with AWS Cognito
			</Text>
		</div>
	</div>
</div>
