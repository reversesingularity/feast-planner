<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let email = $state('');
	let code = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let success = $state('');
	let isLoading = $state(false);
	let showResetForm = $state(false);

	async function handleRequestCode() {
		if (!email) { error = 'Please enter your email address'; return; }
		isLoading = true; error = '';
		const result = await authStore.resetPassword(email);
		if (result.success) {
			showResetForm = true;
		} else {
			error = result.error || 'Failed to send reset code';
		}
		isLoading = false;
	}

	async function handleResetPassword() {
		if (!code || !newPassword || !confirmPassword) { error = 'Please fill in all fields'; return; }
		if (newPassword !== confirmPassword) { error = 'Passwords do not match'; return; }
		if (newPassword.length < 8) { error = 'Password must be at least 8 characters'; return; }
		isLoading = true; error = '';
		const result = await authStore.confirmResetPassword(email, code, newPassword);
		if (result.success) {
			success = 'Password reset! Redirecting to sign in…';
			setTimeout(() => goto('/auth/signin'), 2000);
		} else {
			error = result.error || 'Failed to reset password';
		}
		isLoading = false;
	}
</script>

<svelte:head>
	<title>Reset Password — COGWA NZ Feast 2025</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 py-12"
	style="background: linear-gradient(135deg, #0f2027 0%, #1a3a4a 30%, #1e5f74 60%, #c8902a 85%, #e8b84b 100%);">

	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
			style="width:120vw;height:120vw;border-radius:50%;background:radial-gradient(ellipse at center,rgba(248,195,80,0.15) 0%,transparent 60%);filter:blur(40px);"></div>
	</div>

	<div class="w-full max-w-md relative z-10">

		<div class="text-center mb-8">
			<div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
				style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);">🔐</div>
			<h1 class="text-3xl font-bold text-white">
				{showResetForm ? 'Reset Your Password' : 'Forgot Password?'}
			</h1>
			<p class="text-amber-200/80 mt-2 text-sm">
				{showResetForm ? `Enter the code we sent to ${email}` : "We'll email you a reset code"}
			</p>
		</div>

		<div class="rounded-3xl p-8"
			style="background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.18);box-shadow:0 16px 48px rgba(0,0,0,0.25);">

			{#if success}
				<div class="text-center py-4">
					<div class="text-4xl mb-3">✅</div>
					<p style="color:#80e0a0;" class="font-medium">{success}</p>
				</div>

			{:else if !showResetForm}
				<form onsubmit={(e) => { e.preventDefault(); handleRequestCode(); }}>
					<div class="space-y-5">
						<div class="rounded-xl px-4 py-3 text-sm text-center"
							style="background:rgba(80,180,255,0.1);border:1px solid rgba(80,180,255,0.2);color:#90ccff;">
							📧 Enter your email and we'll send a 6-digit reset code
						</div>
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Email Address</label>
							<input type="email" bind:value={email} placeholder="you@example.com"
								autocomplete="email" required class="glass-input" />
						</div>
						{#if error}
							<div class="rounded-xl px-4 py-3 text-sm"
								style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);color:#ffaaaa;">
								⚠️ {error}
							</div>
						{/if}
						<button type="submit" disabled={isLoading}
							class="w-full py-3.5 rounded-xl font-semibold text-amber-900 transition-all hover:scale-[1.02] disabled:opacity-50"
							style="background:rgba(255,220,100,0.9);">
							{isLoading ? '⏳ Sending code…' : 'Send Reset Code'}
						</button>
					</div>
				</form>

			{:else}
				<form onsubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
					<div class="space-y-5">
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Verification Code</label>
							<input type="text" bind:value={code} placeholder="123456"
								maxlength={6} class="glass-input text-center text-2xl tracking-widest" required />
						</div>
						<div>
							<label class="block text-sm text-white/70 mb-1.5">New Password</label>
							<input type="password" bind:value={newPassword} placeholder="••••••••"
								autocomplete="new-password" required class="glass-input" />
							<p class="text-xs mt-1" style="color:rgba(255,255,255,0.35);">Min. 8 characters with uppercase, lowercase and number</p>
						</div>
						<div>
							<label class="block text-sm text-white/70 mb-1.5">Confirm New Password</label>
							<input type="password" bind:value={confirmPassword} placeholder="••••••••"
								autocomplete="new-password" required class="glass-input" />
							{#if confirmPassword && newPassword !== confirmPassword}
								<p class="text-xs mt-1" style="color:#ffaaaa;">Passwords do not match</p>
							{/if}
						</div>
						{#if error}
							<div class="rounded-xl px-4 py-3 text-sm"
								style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);color:#ffaaaa;">
								⚠️ {error}
							</div>
						{/if}
						<button type="submit" disabled={isLoading}
							class="w-full py-3.5 rounded-xl font-semibold text-amber-900 transition-all hover:scale-[1.02] disabled:opacity-50"
							style="background:rgba(255,220,100,0.9);">
							{isLoading ? '⏳ Resetting…' : '✓ Reset Password'}
						</button>
						<button type="button" onclick={handleRequestCode}
							class="w-full text-center text-sm transition-colors"
							style="color:rgba(255,255,255,0.5);">
							Didn't receive a code? <span style="color:#f5d78e;">Resend</span>
						</button>
					</div>
				</form>
			{/if}
		</div>

		<div class="text-center mt-6">
			<a href="/auth/signin" class="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to Sign In</a>
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
