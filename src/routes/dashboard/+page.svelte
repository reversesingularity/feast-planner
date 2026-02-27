<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { authStore } from '$lib/stores/auth';
	import { getFullRegistration } from '$lib/services/registrationDb';
	import type { FullRegistration } from '$lib/types/registration';

	let registration = $state<FullRegistration | null>(null);
	let isLoading = $state(true);
	let error = $state('');

	const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string; description: string }> = {
		draft: {
			label: 'Draft',
			color: 'rgba(255,200,50,0.25)',
			icon: '📝',
			description: 'Your registration is saved but not yet submitted.'
		},
		submitted: {
			label: 'Submitted',
			color: 'rgba(80,180,255,0.25)',
			icon: '✉️',
			description: "Your registration has been received. Pastor Jon Pinelli will be in touch."
		},
		confirmed: {
			label: 'Confirmed',
			color: 'rgba(80,220,120,0.25)',
			icon: '✅',
			description: "You're confirmed for the Feast! See you in Tauranga."
		},
		cancelled: {
			label: 'Cancelled',
			color: 'rgba(255,100,100,0.25)',
			icon: '❌',
			description: "Your registration has been cancelled. Contact the Pastor if this is an error."
		}
	};

	const DAYS = [
		'Day 1 — 25 Sep (Holy Day)', 'Day 2 — 26 Sep', 'Day 3 — 27 Sep', 'Day 4 — 28 Sep',
		'Day 5 — 29 Sep', 'Day 6 — 30 Sep', 'Day 7 — 1 Oct', 'Day 8 — 2 Oct (Last Great Day)'
	];

	const dayLabel = (key: string) => {
		const idx = parseInt(key.replace('day', '')) - 1;
		return DAYS[idx] ?? key;
	};

	onMount(async () => {
		if (!$isAuthenticated) { goto('/auth/signin'); return; }
		try {
			registration = await getFullRegistration();
		} catch (e: any) {
			error = e.message ?? 'Failed to load your registration.';
		} finally {
			isLoading = false;
		}
	});

	async function handleSignOut() {
		await authStore.signOut();
		goto('/');
	}

	function volunteerRoles(v: FullRegistration['volunteer']): string[] {
		if (!v) return [];
		const roles: string[] = [];
		if (v.interestedInChoir) roles.push(`🎵 Choir${v.voicePart ? ` (${v.voicePart})` : ''}`);
		if (v.interestedInSpecialMusic) roles.push(`🎸 Special Music${v.specialMusicInstrument ? ` — ${v.specialMusicInstrument}` : ''}`);
		if (v.interestedInSongLeading) roles.push('🎶 Song Leading');
		if (v.interestedInSermonette) roles.push('🎙 Sermonette');
		if (v.interestedInUsher) roles.push('🤝 Usher');
		if (v.interestedInAvTech) roles.push('📹 AV Tech');
		if (v.interestedInSetupTakedown) roles.push('🔧 Setup & Takedown');
		if (v.interestedInChildrenProgram) roles.push("👧 Children's Program");
		if (v.interestedInHospitality) roles.push('💛 Hospitality');
		return roles;
	}

	const statusCfg = $derived(
		registration ? (STATUS_CONFIG[registration.household.status] ?? STATUS_CONFIG.draft) : null
	);
</script>

<svelte:head>
	<title>My Registration — COGWA NZ Feast 2026</title>
</svelte:head>

<div class="min-h-screen"
	style="background: linear-gradient(135deg, #0f2027 0%, #1a3a4a 30%, #1e5f74 60%, #c8902a 85%, #e8b84b 100%);">

	<!-- Nav -->
	<nav class="px-6 py-5 border-b border-white/10">
		<div class="max-w-5xl mx-auto flex justify-between items-center">
			<a href="/" class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-full flex items-center justify-center text-lg"
					style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);">✡</div>
				<div>
					<div class="text-white font-bold text-sm">COGWA New Zealand</div>
					<div class="text-amber-200 text-xs">Feast of Tabernacles · Tauranga 2026</div>
				</div>
			</a>
			<div class="flex items-center gap-3">
				<a href="/register" class="text-white/70 hover:text-white text-sm transition-colors">Edit Registration</a>
				<a href="/admin" class="text-white/70 hover:text-white text-sm transition-colors hidden sm:inline">Admin</a>
				<button onclick={handleSignOut}
					class="px-4 py-2 rounded-lg text-sm font-semibold text-amber-900 transition-all hover:scale-105"
					style="background:rgba(255,220,100,0.9);">
					Sign Out
				</button>
			</div>
		</div>
	</nav>

	<div class="max-w-5xl mx-auto px-6 py-10">

		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-white">My Registration</h1>
			<p class="text-white/60 mt-1 text-sm">
				Welcome back, {$user?.attributes?.name ?? 'Friend'} · Feast of Tabernacles 2026, Tauranga
			</p>
		</div>

		<!-- Loading -->
		{#if isLoading}
			<div class="text-center py-20">
				<div class="text-4xl mb-4 animate-pulse">⏳</div>
				<p class="text-white/60">Loading your registration…</p>
			</div>

		<!-- Error -->
		{:else if error}
			<div class="rounded-2xl p-6 text-center"
				style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);">
				<div class="text-3xl mb-3">⚠️</div>
				<p class="text-red-200">{error}</p>
				<button onclick={() => window.location.reload()} class="mt-4 text-sm text-amber-300 hover:text-amber-200">Try again</button>
			</div>

		<!-- No registration yet -->
		{:else if !registration}
			<div class="rounded-3xl p-10 text-center"
				style="background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.18);">
				<div class="text-6xl mb-5">📋</div>
				<h2 class="text-2xl font-bold text-white mb-3">No Registration Found</h2>
				<p class="text-white/60 mb-7 max-w-md mx-auto">It looks like you haven't started your registration yet. It only takes a few minutes!</p>
				<a href="/register"
					class="inline-block px-8 py-4 rounded-xl font-semibold text-amber-900 transition-all hover:scale-105"
					style="background:rgba(255,220,100,0.9);">
					🙏 Register Your Household
				</a>
			</div>

		<!-- Registration found -->
		{:else}
			<!-- Status Banner -->
			{#if statusCfg}
				<div class="rounded-2xl px-6 py-4 mb-6 flex items-center gap-4"
					style="background:{statusCfg.color};backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);">
					<span class="text-2xl">{statusCfg.icon}</span>
					<div>
						<div class="text-white font-semibold">Status: {statusCfg.label}</div>
						<div class="text-white/70 text-sm">{statusCfg.description}</div>
					</div>
					{#if registration.household.status === 'draft'}
						<a href="/register" class="ml-auto px-4 py-2 rounded-lg text-sm font-semibold text-amber-900 whitespace-nowrap"
							style="background:rgba(255,220,100,0.9);">
							Complete & Submit →
						</a>
					{/if}
				</div>
			{/if}

			<div class="grid md:grid-cols-2 gap-6">

				<!-- Household Card -->
				<div class="rounded-2xl p-6"
					style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
					<div class="flex justify-between items-start mb-5">
						<h2 class="text-white font-bold text-lg">🏠 Household</h2>
						<a href="/register" class="text-amber-300 text-xs hover:text-amber-200 transition-colors">Edit</a>
					</div>
					<div class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-white/50">Head of Household</span>
							<span class="text-white font-medium">{registration.household.headFirstName} {registration.household.headLastName}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-white/50">Email</span>
							<span class="text-white/80">{registration.household.email}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-white/50">Phone</span>
							<span class="text-white/80">{registration.household.phone}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-white/50">Address</span>
							<span class="text-white/80 text-right max-w-[55%]">
								{registration.household.streetAddress}{registration.household.suburb ? ', ' + registration.household.suburb : ''},
								{registration.household.city} {registration.household.postcode}
							</span>
						</div>
						<div class="flex justify-between">
							<span class="text-white/50">Region</span>
							<span class="text-white/80">{registration.household.region}</span>
						</div>
						<div class="pt-2 border-t border-white/10 flex justify-between">
							<span class="text-white/50">Attendance</span>
							<span class="text-white/80">
								{registration.household.attendingAllDays
									? 'All 8 days (25 Sep – 2 Oct)'
									: `${registration.household.arrivalDate ?? '?'} – ${registration.household.departureDate ?? '?'}`}
							</span>
						</div>
						{#if registration.household.submittedAt}
							<div class="flex justify-between text-xs pt-1">
								<span class="text-white/40">Submitted</span>
								<span class="text-white/40">
									{new Date(registration.household.submittedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })}
								</span>
							</div>
						{/if}
					</div>
				</div>

				<!-- Family Card -->
				<div class="rounded-2xl p-6"
					style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
					<div class="flex justify-between items-start mb-5">
						<h2 class="text-white font-bold text-lg">👨‍👩‍👧‍👦 Family Members</h2>
						<a href="/register" class="text-amber-300 text-xs hover:text-amber-200 transition-colors">Edit</a>
					</div>

					<!-- Head of household -->
					<div class="flex items-center gap-3 py-2.5 border-b border-white/10">
						<div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
							style="background:rgba(255,220,100,0.25);color:#f5d78e;">
							{registration.household.headFirstName[0]}{registration.household.headLastName[0]}
						</div>
						<div>
							<div class="text-white text-sm font-medium">{registration.household.headFirstName} {registration.household.headLastName}</div>
							<div class="text-white/40 text-xs">Head of Household</div>
						</div>
					</div>

					{#each registration.members as m}
						<div class="flex items-center gap-3 py-2.5 border-b border-white/10 last:border-0">
							<div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
								style="background:rgba(100,180,255,0.2);color:#90ccff;">
								{m.firstName[0]}{m.lastName[0]}
							</div>
							<div class="flex-1">
								<div class="text-white text-sm font-medium">{m.firstName} {m.lastName}</div>
								<div class="text-white/40 text-xs capitalize">
									{m.relationship}{m.isChild ? ' · Child' : ''}
									{m.dietaryRequirements !== 'none' ? ` · ${m.dietaryRequirements}` : ''}
								</div>
							</div>
						</div>
					{/each}

					{#if registration.members.length === 0}
						<p class="text-white/40 text-sm italic mt-3">
							Only Head of Household registered — <a href="/register" class="text-amber-300 hover:text-amber-200">add family members</a>.
						</p>
					{/if}

					<div class="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-white/50">
						<span>Total attending</span>
						<span class="text-white/80 font-medium">
							{1 + registration.members.length} person{1 + registration.members.length !== 1 ? 's' : ''}
							· {1 + registration.members.filter(m => !m.isChild).length} adult{(1 + registration.members.filter(m => !m.isChild).length) !== 1 ? 's' : ''}
							{#if registration.members.filter(m => m.isChild).length > 0}
								, {registration.members.filter(m => m.isChild).length} child{registration.members.filter(m => m.isChild).length !== 1 ? 'ren' : ''}
							{/if}
						</span>
					</div>
				</div>

				<!-- Volunteer Card (full width) -->
				<div class="rounded-2xl p-6 md:col-span-2"
					style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
					<div class="flex justify-between items-start mb-5">
						<h2 class="text-white font-bold text-lg">🤝 Service Opportunities</h2>
						<a href="/register" class="text-amber-300 text-xs hover:text-amber-200 transition-colors">Edit</a>
					</div>

					{#if !registration.volunteer || volunteerRoles(registration.volunteer).length === 0}
						<p class="text-white/50 text-sm italic">No service roles selected yet.</p>
						<a href="/register" class="mt-3 inline-block text-sm text-amber-300 hover:text-amber-200">Add service preferences →</a>
					{:else}
						<div class="flex flex-wrap gap-3">
							{#each volunteerRoles(registration.volunteer) as role}
								<span class="px-3 py-1.5 rounded-full text-sm text-white/90"
									style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);">
									{role}
								</span>
							{/each}
						</div>

						{#if registration.volunteer.interestedInSermonette && registration.volunteer.sermonetteTopicIdeas}
							<div class="mt-4 pt-4 border-t border-white/10">
								<div class="text-xs text-white/50 mb-1">Sermonette topic ideas</div>
								<p class="text-white/70 text-sm">"{registration.volunteer.sermonetteTopicIdeas}"</p>
							</div>
						{/if}

						{#if registration.volunteer.interestedInSongLeading && (registration.volunteer.songLeadingAvailability ?? []).length > 0}
							<div class="mt-4 pt-4 border-t border-white/10">
								<div class="text-xs text-white/50 mb-2">Song leading availability</div>
								<div class="flex flex-wrap gap-2">
									{#each registration.volunteer.songLeadingAvailability ?? [] as d}
										<span class="text-xs px-2 py-1 rounded"
											style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);">
											{dayLabel(d)}
										</span>
									{/each}
								</div>
							</div>
						{/if}

						{#if registration.volunteer.volunteerNotes}
							<div class="mt-4 pt-4 border-t border-white/10">
								<div class="text-xs text-white/50 mb-1">Additional notes</div>
								<p class="text-white/70 text-sm">"{registration.volunteer.volunteerNotes}"</p>
							</div>
						{/if}
					{/if}
				</div>
			</div>

			<!-- Action buttons -->
			<div class="mt-8 flex flex-col sm:flex-row gap-4">
				<a href="/register"
					class="flex-1 text-center py-4 rounded-xl font-semibold text-amber-900 transition-all hover:scale-105"
					style="background:rgba(255,220,100,0.9);">
					✏️ Edit Registration
				</a>
				<a href="/"
					class="flex-1 text-center py-4 rounded-xl font-medium transition-all hover:opacity-80"
					style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.7);">
					← Back to Home
				</a>
			</div>

			<!-- Privacy footer -->
			<p class="mt-6 text-center text-xs" style="color:rgba(255,255,255,0.3);">
				🔒 Your information is held securely under the NZ Privacy Act 2020.
				To request access, correction, or deletion of your data, contact Pastor Jon Pinelli at jon.pinelli@cogwa.org.
			</p>
		{/if}
	</div>
</div>
