<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let name = $state('');

	// Svelte 5 $effect: once Cognito finishes loading, redirect if already signed in
	$effect(() => {
		const state = $authStore;
		if (!state.isLoading && state.isAuthenticated) {
			window.location.href = '/dashboard';
		}
	});
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let submitting = $state(false);
	let showVerification = $state(false);
	let verificationCode = $state('');

	const req = $derived({
		minLength: password.length >= 8,
		hasUppercase: /[A-Z]/.test(password),
		hasLowercase: /[a-z]/.test(password),
		hasNumber: /[0-9]/.test(password)
	});
	const isPasswordValid = $derived(req.minLength && req.hasUppercase && req.hasLowercase && req.hasNumber);

	async function handleSignUp() {
		if (!name || !email || !password || !confirmPassword) { error = 'Please fill in all fields'; return; }
		if (password !== confirmPassword) { error = 'Passwords do not match'; return; }
		if (!isPasswordValid) { error = 'Password does not meet the requirements below'; return; }
		submitting = true; error = '';
		const result = await authStore.signUp(email, password, name);
		if (result.success) {
			showVerification = true;
		} else {
			error = result.error || 'Failed to create account';
		}
		submitting = false;
	}

	async function handleVerification() {
		if (!verificationCode) { error = 'Please enter the verification code'; return; }
		submitting = true; error = '';
		const result = await authStore.confirmSignUp(email, verificationCode);
		if (result.success) {
			await authStore.signIn(email, password);
			// Full page reload ensures Amplify Identity Pool credentials are
			// fully exchanged before the next page tries to hit DynamoDB.
			window.location.href = '/register';
		} else {
			error = result.error || 'Invalid verification code';
		}
		submitting = false;
	}

	async function resendCode() {
		const result = await authStore.resendConfirmationCode(email);
		if (!result.success) error = result.error || 'Failed to resend code';
	}
</script>

<svelte:head>
	<title>Create Account — COGWA NZ Feast 2026</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 py-12"
	style="background: linear-gradient(135deg, #0f2027 0%, #1a3a4a 30%, #1e5f74 60%, #c8902a 85%, #e8b84b 100%);">

	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
			style="width:120vw;height:120vw;border-radius:50%;background:radial-gradient(ellipse at center,rgba(248,195,80,0.15) 0%,transparent 60%);filter:blur(40px);"></div>
	</div>

	<div class="w-full max-w-md relative z-10">

		<!-- Branding -->
		<div class="text-center mb-8">
			<div class="mx-auto mb-4 px-4 py-2 rounded-xl text-white font-bold text-lg tracking-wide"
				style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);display:inline-block;">COGWA NZ</div>
			<h1 class="text-3xl font-bold text-white">
				{showVerification ? 'Verify Your Email' : 'Create Account'}
			</h1>
			<p class="text-amber-200/80 mt-2 text-sm">
				{showVerification ? `We sent a 6-digit code to ${email}` : 'Register for the Feast of Tabernacles 2026'}
			</p>
		</div>

		<div class="rounded-3xl p-8"
			style="background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.18);box-shadow:0 16px 48px rgba(0,0,0,0.25);">

			{#if !showVerification}
				<form onsubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
					<div class="space-y-5">
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Full Name</label>
							<input type="text" bind:value={name} placeholder="John Smith"
								autocomplete="name" required class="glass-input" />
						</div>
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Email Address</label>
							<input type="email" bind:value={email} placeholder="you@example.com"
								autocomplete="email" required class="glass-input" />
						</div>
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Password</label>
							<input type="password" bind:value={password} placeholder="••••••••"
								autocomplete="new-password" required class="glass-input" />
							{#if password}
								<div class="mt-2 grid grid-cols-2 gap-1">
									{#each [
										{ ok: req.minLength, text: '8+ characters' },
										{ ok: req.hasUppercase, text: 'Uppercase letter' },
										{ ok: req.hasLowercase, text: 'Lowercase letter' },
										{ ok: req.hasNumber, text: 'Number' }
									] as r}
										<div class="flex items-center gap-1.5 text-xs" style="color:{r.ok ? '#80e0a0' : 'rgba(255,255,255,0.35)'};">
											<span>{r.ok ? '✓' : '○'}</span> {r.text}
										</div>
									{/each}
								</div>
							{/if}
						</div>
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Confirm Password</label>
							<input type="password" bind:value={confirmPassword} placeholder="••••••••"
								autocomplete="new-password" required class="glass-input" />
							{#if confirmPassword && password !== confirmPassword}
								<p class="text-xs mt-1" style="color:#ffaaaa;">Passwords do not match</p>
							{/if}
						</div>

						{#if error}
							<div class="rounded-xl px-4 py-3 text-sm"
								style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);color:#ffaaaa;">
								⚠️ {error}
							</div>
						{/if}

						<button type="submit" disabled={submitting || !isPasswordValid}
							class="w-full py-3.5 rounded-xl font-semibold text-amber-900 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
							style="background:rgba(255,220,100,0.9);">
							{submitting ? '⏳ Creating account…' : 'Create Account'}
						</button>

						<p class="text-center text-xs" style="color:rgba(255,255,255,0.3);">
							Your information is used solely for Feast coordination (NZ Privacy Act 2020).
						</p>

						<div class="relative">
							<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
							<div class="relative flex justify-center">
								<span class="px-3 text-xs" style="color:rgba(255,255,255,0.4);">Already have an account?</span>
							</div>
						</div>
						<a href="/auth/signin"
							class="block w-full text-center py-3.5 rounded-xl font-medium text-sm transition-all hover:opacity-80"
							style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.8);">
							Sign In
						</a>
					</div>
				</form>

			{:else}
				<!-- Email verification -->
				<form onsubmit={(e) => { e.preventDefault(); handleVerification(); }}>
					<div class="space-y-5">
						<div class="rounded-xl px-4 py-3 text-sm text-center"
							style="background:rgba(80,180,255,0.15);border:1px solid rgba(80,180,255,0.3);color:#90ccff;">
							📧 Check your email for a 6-digit verification code
						</div>

						<div>
							<label class="block text-sm text-white/70 mb-1.5">Verification Code</label>
							<input type="text" bind:value={verificationCode} placeholder="123456"
								maxlength={6} class="glass-input text-center text-2xl tracking-widest" required />
						</div>

						{#if error}
							<div class="rounded-xl px-4 py-3 text-sm"
								style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);color:#ffaaaa;">
								⚠️ {error}
							</div>
						{/if}

						<button type="submit" disabled={submitting}
						class="w-full py-3.5 rounded-xl font-semibold text-amber-900 transition-all hover:scale-[1.02] disabled:opacity-50"
						style="background:rgba(255,220,100,0.9);">
						{submitting ? '⏳ Verifying…' : '✓ Verify Email'}
						</button>

						<button type="button" onclick={resendCode}
							class="w-full text-center text-sm transition-colors"
							style="color:rgba(255,255,255,0.5);">
							Didn't receive a code? <span style="color:#f5d78e;">Resend</span>
						</button>
					</div>
				</form>
			{/if}
		</div>

		<div class="text-center mt-6">
			<a href="/" class="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to Home</a>
		</div>
	</div>
</div>

<style>
	:global(.glass-input) {
		width: 100%;
		padding: 0.65rem 0.9rem;
		border-radius: 0.625rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.18);
		color: white;
		font-size: 0.875rem;
		outline: none;
		transition: border-color 0.15s, background 0.15s;
	}
	:global(.glass-input::placeholder) { color: rgba(255, 255, 255, 0.3); }
	:global(.glass-input:focus) { border-color: rgba(255, 220, 100, 0.5); background: rgba(255, 255, 255, 0.12); }
</style>
