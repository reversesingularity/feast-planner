<script lang="ts">
	import { isAuthenticated, user } from '$lib/stores/auth';
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>COGWA New Zealand — Feast of Tabernacles 2026</title>
</svelte:head>

<!-- Full-viewport hero with Tauranga sunrise backdrop -->
<div class="min-h-screen relative overflow-x-hidden"
	style="
		background: linear-gradient(
			135deg,
			#0f2027 0%,
			#1a3a4a 20%,
			#1e5f74 45%,
			#c8902a 70%,
			#e8b84b 85%,
			#f5d78e 100%
		);
	">

	<!-- Decorative sunrise rings -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
			style="width:160vw; height:160vw; border-radius:50%;
			       background: radial-gradient(ellipse at center, rgba(248,195,80,0.18) 0%, transparent 60%);
			       filter: blur(40px);">
		</div>
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
			style="width:110vw; height:110vw; border-radius:50%;
			       background: radial-gradient(ellipse at center, rgba(200,144,42,0.14) 0%, transparent 55%);
			       filter: blur(20px);">
		</div>
	</div>

	<!-- ── Navigation ──────────────────────────────────────────────────────── -->
	<nav class="relative z-10 px-6 py-5">
		<div class="max-w-6xl mx-auto flex justify-between items-center">
			<!-- Brand -->
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
					style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
					       border: 1px solid rgba(255,255,255,0.25);">
					🌿
				</div>
				<div>
					<div class="text-white font-bold text-sm tracking-wide">COGWA New Zealand</div>
					<div class="text-amber-200 text-xs">Feast of Tabernacles · Tauranga 2026</div>
				</div>
			</div>

			<!-- Nav links -->
			<div class="flex items-center gap-3">
				{#if $isAuthenticated}
					<a href="/dashboard"
						class="text-white/80 hover:text-white text-sm font-medium transition-colors">
						My Registration
					</a>
					<a href="/admin"
						class="text-white/80 hover:text-white text-sm font-medium transition-colors hidden sm:inline">
						Admin
					</a>
					<a href="/auth/signin"
						class="px-4 py-2 rounded-lg text-sm font-semibold text-amber-900 transition-all hover:scale-105"
						style="background: rgba(255,220,100,0.90); backdrop-filter: blur(8px);">
						Sign Out
					</a>
				{:else}
					<a href="/auth/signin"
						class="text-white/80 hover:text-white text-sm font-medium transition-colors">
						Sign In
					</a>
					<a href="/register"
						class="px-4 py-2 rounded-lg text-sm font-semibold text-amber-900 transition-all hover:scale-105"
						style="background: rgba(255,220,100,0.90); backdrop-filter: blur(8px);">
						Register Now
					</a>
				{/if}
			</div>
		</div>
	</nav>

	<!-- ── Hero ────────────────────────────────────────────────────────────── -->
	<div class="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
		<div class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-widest uppercase"
			style="background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
			       border: 1px solid rgba(255,255,255,0.2); color: rgba(255,240,180,0.95);">
			25 September – 2 October 2026 · Hotel Armitage & Conference Centre, Tauranga
		</div>

		<h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight"
			style="color: white; text-shadow: 0 2px 30px rgba(0,0,0,0.4);">
			Feast of<br/>
			<span style="background: linear-gradient(90deg,#f5d78e,#e8b84b); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
				Tabernacles
			</span>
		</h1>

		<p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
			style="color: rgba(255,255,255,0.85);">
			Register your household for the annual Feast gathering with COGWA New Zealand.
			Join over 90 members at beautiful Tauranga on the Bay of Plenty. First service Friday 25 Sept, 7pm.
		</p>

		{#if $isAuthenticated}
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/dashboard"
					class="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
					style="background: rgba(255,255,255,0.95); color: #1a3a4a; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
					📋 View My Registration
				</a>
				<a href="/register"
					class="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
					style="background: rgba(255,255,255,0.12); backdrop-filter: blur(12px);
					       border: 1px solid rgba(255,255,255,0.3); color: white;">
					✏️ Edit Registration
				</a>
			</div>
			<p class="mt-5 text-sm" style="color: rgba(255,255,255,0.6);">
				Welcome back, {$user?.attributes?.name ?? 'Friend'} 👋
			</p>
		{:else}
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/register"
					class="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
					style="background: rgba(255,255,255,0.95); color: #1a3a4a; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
					🙏 Register Your Household
				</a>
				<a href="/auth/signin"
					class="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
					style="background: rgba(255,255,255,0.12); backdrop-filter: blur(12px);
					       border: 1px solid rgba(255,255,255,0.3); color: white;">
					Sign In
				</a>
			</div>
			<p class="mt-5 text-sm" style="color: rgba(255,255,255,0.6);">
				Already registered? Sign in to view or update your details.
			</p>
		{/if}
	</div>

	<!-- ── Feature cards (glassmorphism) ────────────────────────────────────── -->
	<div class="relative z-10 max-w-6xl mx-auto px-6 pb-20">
		<div class="grid md:grid-cols-3 gap-6">
			<!-- Card 1 -->
			<div class="rounded-2xl p-6"
				style="background: rgba(255,255,255,0.10); backdrop-filter: blur(16px);
				       border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
				<div class="text-4xl mb-4">👨‍👩‍👧‍👦</div>
				<h3 class="text-xl font-bold mb-2 text-white">Household Registration</h3>
				<p style="color: rgba(255,255,255,0.75);" class="text-sm leading-relaxed">
					Register your entire household in one simple flow. Add family members and
					accessibility needs — all in one place.
				</p>
			</div>

			<!-- Card 2 -->
			<div class="rounded-2xl p-6"
				style="background: rgba(255,255,255,0.10); backdrop-filter: blur(16px);
				       border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
				<div class="text-4xl mb-4">🎵</div>
				<h3 class="text-xl font-bold mb-2 text-white">Service Opportunities</h3>
				<p style="color: rgba(255,255,255,0.75);" class="text-sm leading-relaxed">
					Sign up for choir, special music, ushering, AV tech, and more.
					Help make the Feast special for everyone.
				</p>
			</div>

			<!-- Card 3 -->
			<div class="rounded-2xl p-6"
				style="background: rgba(255,255,255,0.10); backdrop-filter: blur(16px);
				       border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 8px 32px rgba(0,0,0,0.15);">
				<div class="text-4xl mb-4">🔐</div>
				<h3 class="text-xl font-bold mb-2 text-white">Privacy Protected</h3>
				<p style="color: rgba(255,255,255,0.75);" class="text-sm leading-relaxed">
					Compliant with the NZ Privacy Act 2020. Your data is encrypted, stored securely in AWS,
					and used only for Feast coordination.
				</p>
			</div>
		</div>
	</div>

	<!-- ── Stats bar ──────────────────────────────────────────────────────── -->
	<div class="relative z-10 border-t border-white/10 py-10">
		<div class="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
			<div>
				<div class="text-4xl font-bold text-amber-300">90+</div>
				<div class="text-sm mt-1" style="color:rgba(255,255,255,0.6);">Expected Members</div>
			</div>
			<div>
				<div class="text-4xl font-bold text-amber-300">8</div>
				<div class="text-sm mt-1" style="color:rgba(255,255,255,0.6);">Days of Celebration</div>
			</div>
			<div>
				<div class="text-4xl font-bold text-amber-300">Tga</div>
				<div class="text-sm mt-1" style="color:rgba(255,255,255,0.6);">Tauranga, Bay of Plenty</div>
			</div>
			<div>
				<div class="text-4xl font-bold text-amber-300">2026</div>
				<div class="text-sm mt-1" style="color:rgba(255,255,255,0.6);">Feast Year</div>
			</div>
		</div>
	</div>

	<!-- ── Footer ─────────────────────────────────────────────────────────── -->
	<footer class="relative z-10 border-t border-white/10 py-8 px-6">
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm" style="color:rgba(255,255,255,0.5);">
				© 2026 COGWA New Zealand · Feast of Tabernacles · Tauranga
			</p>
			<div class="flex gap-6 text-sm" style="color:rgba(255,255,255,0.5);">
				<a href="/register" class="hover:text-white transition-colors">Register</a>
				<a href="/dashboard" class="hover:text-white transition-colors">My Registration</a>
				<a href="/admin" class="hover:text-white transition-colors">Admin</a>
				<a href="/auth/signin" class="hover:text-white transition-colors">Sign In</a>
			</div>
		</div>
		<div class="max-w-6xl mx-auto mt-4">
			<p class="text-xs text-center" style="color:rgba(255,255,255,0.3);">
				Information collected on this form is used solely for Feast coordination and is protected under the New Zealand Privacy Act 2020.
				Contact Pastor Jon Pinelli for data access or correction requests.
			</p>
		</div>
	</footer>
</div>
