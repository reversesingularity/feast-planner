<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore, isAuthenticated } from '$lib/stores/auth';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let submitting = $state(false);

	onMount(async () => {
		// Wait for Cognito to resolve auth state before checking
		let resolvedAuth = { isAuthenticated: false };
		await new Promise<void>((resolve) => {
			const unsub = authStore.subscribe(s => {
				if (!s.isLoading) { resolvedAuth = s; unsub(); resolve(); }
			});
		});
		// Already signed in — send them to dashboard
		if (resolvedAuth.isAuthenticated) {
			window.location.href = '/dashboard';
			return;
		}
	});

	async function handleSignIn() {
		if (!email || !password) { error = 'Please fill in all fields'; return; }
		submitting = true;
		error = '';
		const result = await authStore.signIn(email, password);
		if (result?.success) {
			// Full page reload ensures Amplify Identity Pool credentials are
			// fully exchanged before the next page tries to hit DynamoDB.
			window.location.href = '/dashboard';
		} else {
			error = result?.error || 'Incorrect email or password. Please try again.';
		}
		submitting = false;
	}
</script>

<svelte:head>
	<title>Sign In — COGWA NZ Feast 2026</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 py-12"
	style="background: linear-gradient(135deg, #0f2027 0%, #1a3a4a 30%, #1e5f74 60%, #c8902a 85%, #e8b84b 100%);">

	<!-- Glow rings -->
	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
			style="width:120vw;height:120vw;border-radius:50%;background:radial-gradient(ellipse at center,rgba(248,195,80,0.15) 0%,transparent 60%);filter:blur(40px);"></div>
	</div>

	<div class="w-full max-w-md relative z-10">

		<!-- Branding -->
		<div class="text-center mb-8">
			<div class="mx-auto mb-4 px-4 py-2 rounded-xl text-white font-bold text-lg tracking-wide"
				style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);display:inline-block;">COGWA NZ</div>
			<h1 class="text-3xl font-bold text-white">Welcome Back</h1>
			<p class="text-amber-200/80 mt-2 text-sm">COGWA New Zealand · Feast of Tabernacles 2026</p>
		</div>

		<!-- Glass card -->
		<div class="rounded-3xl p-8"
			style="background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.18);box-shadow:0 16px 48px rgba(0,0,0,0.25);">

			<form onsubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
				<div class="space-y-5">
					<div>
						<label class="block text-sm text-white/70 mb-1.5">Email Address</label>
						<input type="email" bind:value={email} placeholder="you@example.com"
							autocomplete="email" required class="glass-input" />
					</div>

					<div>
						<div class="flex justify-between items-center mb-1.5">
							<label class="text-sm text-white/70">Password</label>
							<a href="/auth/forgot-password" class="text-xs text-amber-300 hover:text-amber-200 transition-colors">Forgot password?</a>
						</div>
						<input type="password" bind:value={password} placeholder="••••••••"
							autocomplete="current-password" required class="glass-input" />
					</div>

					{#if error}
						<div class="rounded-xl px-4 py-3 text-sm flex items-center gap-2"
							style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);color:#ffaaaa;">
							⚠️ {error}
						</div>
					{/if}

					<button type="submit" disabled={submitting}
					class="w-full py-3.5 rounded-xl font-semibold text-amber-900 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
					style="background:rgba(255,220,100,0.9);">
					{submitting ? '⏳ Signing in…' : 'Sign In'}
					</button>

					<div class="relative">
						<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
						<div class="relative flex justify-center">
							<span class="px-3 text-xs" style="background:transparent;color:rgba(255,255,255,0.4);">Don't have an account?</span>
						</div>
					</div>

					<a href="/auth/signup"
						class="block w-full text-center py-3.5 rounded-xl font-medium text-sm transition-all hover:opacity-80"
						style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.8);">
						Create Account
					</a>
				</div>
			</form>
		</div>

		<div class="text-center mt-6">
			<a href="/" class="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to Home</a>
		</div>

		<p class="text-center mt-4 text-xs" style="color:rgba(255,255,255,0.25);">
			🔒 Secured by AWS Cognito · NZ Privacy Act 2020
		</p>
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
