<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { authStore } from '$lib/stores/auth';
	import {
		adminGetRegistrationSummaries,
		adminGetAllVolunteers
	} from '$lib/services/registrationDb';
	import type { RegistrationSummary, VolunteerPreferences } from '$lib/types/registration';

	// ─── State ───────────────────────────────────────────────────────────────
	let summaries = $state<RegistrationSummary[]>([]);
	let volunteers = $state<VolunteerPreferences[]>([]);
	let isLoading = $state(true);
	let error = $state('');
	let activeTab = $state<'overview' | 'registrations' | 'volunteers' | 'export'>('overview');
	let searchQuery = $state('');
	let statusFilter = $state<string>('all');

	// ─── Derived stats ───────────────────────────────────────────────────────
	const stats = $derived({
		total: summaries.length,
		submitted: summaries.filter(s => s.status === 'submitted').length,
		confirmed: summaries.filter(s => s.status === 'confirmed').length,
		draft: summaries.filter(s => s.status === 'draft').length,
		totalAttendees: summaries.reduce((a, s) => a + s.totalMembers, 0),
		totalAdults: summaries.reduce((a, s) => a + s.adultCount, 0),
		totalChildren: summaries.reduce((a, s) => a + s.childCount, 0)
	});

	const filteredSummaries = $derived(
		summaries.filter(s => {
			const matchesSearch = searchQuery === '' ||
				s.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				s.city.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
			return matchesSearch && matchesStatus;
		})
	);

	// Choir rosters grouped by voice part
	const choirRoster = $derived(
		volunteers
			.filter(v => v.interestedInChoir)
			.reduce<Record<string, VolunteerPreferences[]>>((acc, v) => {
				const part = v.voicePart ?? 'unspecified';
				(acc[part] ??= []).push(v);
				return acc;
			}, {})
	);

	const sermonetteVolunteers = $derived(volunteers.filter(v => v.interestedInSermonette));
	const specialMusicVolunteers = $derived(volunteers.filter(v => v.interestedInSpecialMusic));
	const songLeadingVolunteers = $derived(volunteers.filter(v => v.interestedInSongLeading));
	const logisticsVolunteers = $derived(volunteers.filter(v =>
		v.interestedInUsher || v.interestedInAvTech || v.interestedInSetupTakedown ||
		v.interestedInChildrenProgram || v.interestedInHospitality
	));

	// Helper: find summary for a volunteer by userId
	const summaryFor = (userId: string) => summaries.find(s => s.userId === userId);

	// ─── Admin allowlist ─────────────────────────────────────────────────────
	// Add email addresses here to grant admin access.
	const ADMIN_EMAILS = [
		'jon.pinelli@cogwa.org',
		'cmodina70@gmail.com',
		// Add more admin emails here as needed:
		// 'another.admin@cogwa.org',
	];

	// ─── Load ────────────────────────────────────────────────────────────────
	onMount(async () => {
		// Wait for auth to finish initialising — same race condition fix as register/dashboard.
		await new Promise<void>((resolve) => {
			const unsub = authStore.subscribe(state => {
				if (!state.isLoading) { unsub(); resolve(); }
			});
		});

		if (!$isAuthenticated) { goto('/auth/signin'); return; }

		const currentEmail = $user?.attributes?.email ?? $user?.username ?? '';
		if (!ADMIN_EMAILS.includes(currentEmail.toLowerCase())) {
			goto('/dashboard');
			return;
		}

		try {
			[summaries, volunteers] = await Promise.all([
				adminGetRegistrationSummaries(),
				adminGetAllVolunteers()
			]);
		} catch (e: any) {
			error = e.message ?? 'Failed to load registrations. Ensure you have admin access.';
		} finally {
			isLoading = false;
		}
	});

	// ─── CSV Export ──────────────────────────────────────────────────────────
	function exportCSV() {
		const headers = [
			'Head of Household', 'Email', 'Phone', 'City', 'Region',
			'Adults', 'Children', 'Total', 'Status', 'Submitted At',
			'Volunteer Roles'
		];

		const rows = summaries.map(s => [
			s.headName, s.email, s.phone, s.city,
			'', // region not in summary type — blank
			s.adultCount, s.childCount, s.totalMembers,
			s.status, s.submittedAt ?? '',
			s.volunteerRoles.join('; ')
		]);

		const csvContent = [headers, ...rows]
			.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
			.join('\n');

		downloadFile(csvContent, 'cogwa-nz-feast-2026-registrations.csv', 'text/csv');
	}

	function exportVolunteerCSV() {
		const headers = [
			'Name', 'Email', 'Phone',
			'Choir', 'Voice Part', 'Experienced',
			'Special Music', 'Instrument', 'Music Details',
			'Song Leading', 'Song Leading Days',
			'Sermonette', 'Sermonette Topics', 'Sermonette Days', 'Prior Experience',
			'Usher', 'AV Tech', 'Setup/Takedown', "Children's Program", 'Hospitality',
			'Notes'
		];

		const DAYS: Record<string, string> = {
			day1: '25 Sep', day2: '26 Sep', day3: '27 Sep', day4: '28 Sep',
			day5: '29 Sep', day6: '30 Sep', day7: '1 Oct', day8: '2 Oct'
		};

		const rows = volunteers.map(v => {
			const s = summaryFor(v.userId);
			return [
				s?.headName ?? v.userId, s?.email ?? '', s?.phone ?? '',
				v.interestedInChoir ? 'Yes' : 'No',
				v.voicePart ?? '',
				v.singsInChoir ? 'Yes' : 'No',
				v.interestedInSpecialMusic ? 'Yes' : 'No',
				v.specialMusicInstrument ?? '',
				v.specialMusicDetails ?? '',
				v.interestedInSongLeading ? 'Yes' : 'No',
				(v.songLeadingAvailability ?? []).map(d => DAYS[d] ?? d).join(', '),
				v.interestedInSermonette ? 'Yes' : 'No',
				v.sermonetteTopicIdeas ?? '',
				(v.sermonetteAvailability ?? []).map(d => DAYS[d] ?? d).join(', '),
				v.previousSermonetteExperience ? 'Yes' : 'No',
				v.interestedInUsher ? 'Yes' : 'No',
				v.interestedInAvTech ? 'Yes' : 'No',
				v.interestedInSetupTakedown ? 'Yes' : 'No',
				v.interestedInChildrenProgram ? 'Yes' : 'No',
				v.interestedInHospitality ? 'Yes' : 'No',
				v.volunteerNotes ?? ''
			];
		});

		const csvContent = [headers, ...rows]
			.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
			.join('\n');

		downloadFile(csvContent, 'cogwa-nz-feast-2026-volunteers.csv', 'text/csv');
	}

	function exportChoirCSV() {
		const headers = ['Voice Part', 'Name', 'Email', 'Phone', 'Experienced Choir Member', 'Special Music', 'Instrument'];
		const VOICE_ORDER = ['soprano', 'alto', 'tenor', 'bass', 'unspecified'];

		const rows: unknown[][] = [];
		for (const part of VOICE_ORDER) {
			const vols = choirRoster[part] ?? [];
			for (const v of vols) {
				const s = summaryFor(v.userId);
				rows.push([
					part.charAt(0).toUpperCase() + part.slice(1),
					s?.headName ?? '',
					s?.email ?? '',
					s?.phone ?? '',
					v.singsInChoir ? 'Yes' : 'No',
					v.interestedInSpecialMusic ? 'Yes' : 'No',
					v.specialMusicInstrument ?? ''
				]);
			}
		}

		const csvContent = [headers, ...rows]
			.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
			.join('\n');

		downloadFile(csvContent, 'cogwa-nz-feast-2026-choir-roster.csv', 'text/csv');
	}

	function downloadFile(content: string, filename: string, mimeType: string) {
		const blob = new Blob(['\uFEFF' + content], { type: `${mimeType};charset=utf-8;` }); // BOM for Excel compatibility
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	}

	async function handleSignOut() {
		await authStore.signOut();
		goto('/');
	}

	// ─── Status helpers ───────────────────────────────────────────────────────
	const STATUS_COLORS: Record<string, string> = {
		draft: 'rgba(255,200,50,0.2)',
		submitted: 'rgba(80,180,255,0.2)',
		confirmed: 'rgba(80,220,120,0.2)',
		cancelled: 'rgba(255,100,100,0.2)'
	};
	const STATUS_TEXT: Record<string, string> = {
		draft: '#f5d78e',
		submitted: '#90ccff',
		confirmed: '#80e0a0',
		cancelled: '#ff9090'
	};
</script>

<svelte:head>
	<title>Admin Dashboard — COGWA NZ Feast 2026</title>
</svelte:head>

<div class="min-h-screen"
	style="background: linear-gradient(135deg, #0f2027 0%, #1a3a4a 30%, #1e5f74 60%, #c8902a 85%, #e8b84b 100%);">

	<!-- Nav -->
	<nav class="px-6 py-5 border-b border-white/10">
		<div class="max-w-7xl mx-auto flex justify-between items-center">
			<a href="/" class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-full flex items-center justify-center text-lg"
					style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);">🌿</div>
				<div>
					<div class="text-white font-bold text-sm">COGWA New Zealand</div>
					<div class="text-amber-200 text-xs">Admin Dashboard · Feast 2026</div>
				</div>
			</a>
			<div class="flex items-center gap-3">
				<span class="text-white/50 text-xs hidden sm:inline">
					Pastor Jon Pinelli
				</span>
				<a href="/dashboard" class="text-white/70 hover:text-white text-sm transition-colors">My Registration</a>
				<button onclick={handleSignOut}
					class="px-4 py-2 rounded-lg text-sm font-semibold text-amber-900 transition-all hover:scale-105"
					style="background:rgba(255,220,100,0.9);">
					Sign Out
				</button>
			</div>
		</div>
	</nav>

	<div class="max-w-7xl mx-auto px-6 py-8">

		<!-- Page header -->
		<div class="mb-8 flex items-start justify-between">
			<div>
				<h1 class="text-3xl font-bold text-white">Feast Registration Dashboard</h1>
				<p class="text-white/60 mt-1 text-sm">COGWA New Zealand · Tauranga 2026</p>
			</div>
			{#if !isLoading && summaries.length > 0}
				<button onclick={() => window.location.reload()}
					class="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5">
					↻ Refresh
				</button>
			{/if}
		</div>

		{#if isLoading}
			<div class="text-center py-20">
				<div class="text-4xl mb-4 animate-pulse">⏳</div>
				<p class="text-white/60">Loading registrations from DynamoDB…</p>
			</div>

		{:else if error}
			<div class="rounded-2xl p-6 text-center"
				style="background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);">
				<div class="text-3xl mb-3">⚠️</div>
				<p class="text-red-200 mb-2">{error}</p>
				<p class="text-red-300/60 text-sm">This usually means your AWS IAM role doesn't have Scan permission on the registrations table, or the table doesn't exist yet.</p>
			</div>

		{:else}
			<!-- ── Tabs ──────────────────────────────────────────────────── -->
			<div class="flex gap-1 mb-7 p-1 rounded-xl" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.12);">
				{#each [
					{ id: 'overview', label: '📊 Overview' },
					{ id: 'registrations', label: '📋 Registrations' },
					{ id: 'volunteers', label: '🤝 Volunteers' },
					{ id: 'export', label: '📥 Export' }
				] as tab}
					<button
						onclick={() => activeTab = tab.id as typeof activeTab}
						class="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
						style="
							background: {activeTab === tab.id ? 'rgba(255,220,100,0.9)' : 'transparent'};
							color: {activeTab === tab.id ? '#1a2a00' : 'rgba(255,255,255,0.6)'};
						">
						{tab.label}
					</button>
				{/each}
			</div>

			<!-- ══ TAB: Overview ════════════════════════════════════════════ -->
			{#if activeTab === 'overview'}
				<!-- Stats grid -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
					{#each [
						{ label: 'Households', value: stats.total, icon: '🏠', color: 'rgba(255,220,100,0.15)' },
						{ label: 'Submitted', value: stats.submitted, icon: '✉️', color: 'rgba(80,180,255,0.15)' },
						{ label: 'Confirmed', value: stats.confirmed, icon: '✅', color: 'rgba(80,220,120,0.15)' },
						{ label: 'Draft / Incomplete', value: stats.draft, icon: '📝', color: 'rgba(255,255,255,0.08)' },
					] as stat}
						<div class="rounded-2xl p-5 text-center"
							style="background:{stat.color};backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.15);">
							<div class="text-3xl mb-1">{stat.icon}</div>
							<div class="text-3xl font-bold text-white">{stat.value}</div>
							<div class="text-xs mt-1" style="color:rgba(255,255,255,0.55);">{stat.label}</div>
						</div>
					{/each}
				</div>

				<!-- Attendance numbers -->
				<div class="rounded-2xl p-6 mb-6"
					style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
					<h2 class="text-white font-bold text-lg mb-5">👥 Expected Attendance</h2>
					<div class="grid grid-cols-3 gap-6 text-center">
						<div>
							<div class="text-4xl font-bold text-amber-300">{stats.totalAttendees}</div>
							<div class="text-white/50 text-sm mt-1">Total Attendees</div>
						</div>
						<div>
							<div class="text-4xl font-bold text-blue-300">{stats.totalAdults}</div>
							<div class="text-white/50 text-sm mt-1">Adults</div>
						</div>
						<div>
							<div class="text-4xl font-bold text-green-300">{stats.totalChildren}</div>
							<div class="text-white/50 text-sm mt-1">Children</div>
						</div>
					</div>
				</div>

				<!-- Volunteer summary -->
				<div class="rounded-2xl p-6"
					style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
					<h2 class="text-white font-bold text-lg mb-5">🎵 Volunteer Summary</h2>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
						{#each [
							{ label: 'Choir Members', value: volunteers.filter(v => v.interestedInChoir).length, icon: '🎵' },
							{ label: 'Special Music', value: specialMusicVolunteers.length, icon: '🎸' },
							{ label: 'Song Leaders', value: songLeadingVolunteers.length, icon: '🎶' },
							{ label: 'Sermonettes', value: sermonetteVolunteers.length, icon: '🎙' },
							{ label: 'Logistics Team', value: logisticsVolunteers.length, icon: '🤝' },
						] as v}
							<div class="rounded-xl p-4 flex items-center gap-3"
								style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
								<span class="text-2xl">{v.icon}</span>
								<div>
									<div class="text-white font-bold text-xl">{v.value}</div>
									<div class="text-white/50 text-xs">{v.label}</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Choir breakdown -->
					{#if Object.keys(choirRoster).length > 0}
						<div class="mt-5 pt-5 border-t border-white/10">
							<h3 class="text-white/70 text-sm font-medium mb-3">Choir Voice Parts</h3>
							<div class="flex flex-wrap gap-3">
								{#each ['soprano', 'alto', 'tenor', 'bass'] as part}
									{#if choirRoster[part]}
										<div class="rounded-lg px-4 py-2.5 text-center"
											style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);">
											<div class="text-white font-bold text-xl">{choirRoster[part].length}</div>
											<div class="text-white/50 text-xs capitalize">{part}</div>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>

			<!-- ══ TAB: Registrations ════════════════════════════════════════ -->
			{:else if activeTab === 'registrations'}
				<!-- Filters -->
				<div class="flex flex-col sm:flex-row gap-3 mb-5">
					<input
						type="text"
						placeholder="Search by name, email or city…"
						bind:value={searchQuery}
						class="flex-1 px-4 py-2.5 rounded-xl text-sm text-white"
						style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);outline:none;placeholder-color:rgba(255,255,255,0.3);"
					/>
					<select bind:value={statusFilter}
						class="px-4 py-2.5 rounded-xl text-sm text-white"
						style="background:rgba(30,60,80,0.9);border:1px solid rgba(255,255,255,0.18);outline:none;">
						<option value="all">All statuses</option>
						<option value="submitted">Submitted</option>
						<option value="confirmed">Confirmed</option>
						<option value="draft">Draft</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>

				<div class="text-xs text-white/40 mb-3">{filteredSummaries.length} of {summaries.length} registrations</div>

				<!-- Registration list -->
				<div class="space-y-3">
					{#each filteredSummaries as reg}
						<div class="rounded-2xl p-5"
							style="background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);">
							<div class="flex items-start justify-between gap-4">
								<div class="flex-1">
									<div class="flex items-center gap-3 flex-wrap">
										<h3 class="text-white font-semibold">{reg.headName}</h3>
										<span class="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
											style="background:{STATUS_COLORS[reg.status] ?? 'rgba(255,255,255,0.1)'};color:{STATUS_TEXT[reg.status] ?? 'white'};">
											{reg.status}
										</span>
									</div>
									<div class="mt-1 text-white/60 text-sm">{reg.email} · {reg.phone}</div>
									<div class="mt-1 text-white/40 text-xs">{reg.city}</div>
								</div>
								<div class="text-right flex-shrink-0">
									<div class="text-white font-bold text-lg">{reg.totalMembers}</div>
									<div class="text-white/40 text-xs">person{reg.totalMembers !== 1 ? 's' : ''}</div>
									<div class="text-white/40 text-xs">{reg.adultCount}A / {reg.childCount}C</div>
								</div>
							</div>
							{#if reg.volunteerRoles.length > 0}
								<div class="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
									{#each reg.volunteerRoles as role}
										<span class="text-xs px-2 py-1 rounded-full"
											style="background:rgba(255,220,100,0.12);color:rgba(255,220,100,0.8);border:1px solid rgba(255,220,100,0.2);">
											{role}
										</span>
									{/each}
								</div>
							{/if}
							{#if reg.submittedAt}
								<div class="mt-2 text-xs" style="color:rgba(255,255,255,0.3);">
									Submitted {new Date(reg.submittedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}
								</div>
							{/if}
						</div>
					{/each}

					{#if filteredSummaries.length === 0}
						<div class="text-center py-12 text-white/40">
							<div class="text-3xl mb-3">🔍</div>
							<p>No registrations match your search.</p>
						</div>
					{/if}
				</div>

			<!-- ══ TAB: Volunteers ═══════════════════════════════════════════ -->
			{:else if activeTab === 'volunteers'}
				<div class="space-y-6">

					<!-- Choir Roster -->
					<div class="rounded-2xl p-6"
						style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
						<h2 class="text-white font-bold text-lg mb-5">🎵 Choir Roster</h2>
						{#if Object.keys(choirRoster).length === 0}
							<p class="text-white/40 text-sm italic">No choir volunteers yet.</p>
						{:else}
							<div class="grid md:grid-cols-2 gap-6">
								{#each ['soprano', 'alto', 'tenor', 'bass'] as part}
									{#if choirRoster[part]}
										<div>
											<h3 class="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 capitalize">
												{part} ({choirRoster[part].length})
											</h3>
											<div class="space-y-2">
												{#each choirRoster[part] as v}
													{@const s = summaryFor(v.userId)}
													<div class="rounded-lg px-4 py-2.5 flex items-center justify-between"
														style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
														<div>
															<div class="text-white text-sm font-medium">{s?.headName ?? '—'}</div>
															<div class="text-white/40 text-xs">{s?.email ?? ''}</div>
														</div>
														{#if v.singsInChoir}
															<span class="text-xs px-2 py-0.5 rounded-full" style="background:rgba(80,220,120,0.2);color:#80e0a0;">Experienced</span>
														{/if}
													</div>
												{/each}
											</div>
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>

					<!-- Sermonettes -->
					<div class="rounded-2xl p-6"
						style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
						<h2 class="text-white font-bold text-lg mb-5">🎙 Sermonette Volunteers ({sermonetteVolunteers.length})</h2>
						{#if sermonetteVolunteers.length === 0}
							<p class="text-white/40 text-sm italic">No sermonette volunteers yet.</p>
						{:else}
							<div class="space-y-3">
								{#each sermonetteVolunteers as v}
									{@const s = summaryFor(v.userId)}
									<div class="rounded-xl p-4"
										style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
										<div class="flex items-start justify-between">
											<div>
												<div class="text-white font-medium">{s?.headName ?? '—'}</div>
												<div class="text-white/50 text-xs">{s?.email ?? ''} · {s?.phone ?? ''}</div>
											</div>
											{#if v.previousSermonetteExperience}
												<span class="text-xs px-2 py-0.5 rounded-full" style="background:rgba(80,220,120,0.2);color:#80e0a0;">Prior exp.</span>
											{/if}
										</div>
										{#if v.sermonetteTopicIdeas}
											<p class="mt-2 text-white/60 text-sm">Topics: "{v.sermonetteTopicIdeas}"</p>
										{/if}
										{#if (v.sermonetteAvailability ?? []).length > 0}
											<p class="mt-1 text-white/40 text-xs">
												Available: {(v.sermonetteAvailability ?? []).map(d => {
													const idx = parseInt(d.replace('day','')) - 1;
													const dates = ['25 Sep','26 Sep','27 Sep','28 Sep','29 Sep','30 Sep','1 Oct','2 Oct'];
													return dates[idx] ?? d;
												}).join(', ')}
											</p>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Special Music -->
					<div class="rounded-2xl p-6"
						style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
						<h2 class="text-white font-bold text-lg mb-5">🎸 Special Music ({specialMusicVolunteers.length})</h2>
						{#if specialMusicVolunteers.length === 0}
							<p class="text-white/40 text-sm italic">No special music volunteers yet.</p>
						{:else}
							<div class="space-y-3">
								{#each specialMusicVolunteers as v}
									{@const s = summaryFor(v.userId)}
									<div class="rounded-xl px-4 py-3"
										style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
										<div class="text-white font-medium">{s?.headName ?? '—'}</div>
										<div class="text-white/60 text-sm">{v.specialMusicInstrument ?? 'Instrument not specified'}</div>
										{#if v.specialMusicDetails}
											<div class="text-white/40 text-xs mt-1">"{v.specialMusicDetails}"</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Logistics -->
					<div class="rounded-2xl p-6"
						style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
						<h2 class="text-white font-bold text-lg mb-5">🤝 Logistics & Support</h2>
						<div class="grid md:grid-cols-2 gap-6">
							{#each [
								{ key: 'interestedInUsher', label: '🚪 Ushers' },
								{ key: 'interestedInAvTech', label: '📹 AV Tech' },
								{ key: 'interestedInSetupTakedown', label: '🔧 Setup & Takedown' },
								{ key: 'interestedInChildrenProgram', label: "👧 Children's Program" },
								{ key: 'interestedInHospitality', label: '💛 Hospitality' },
							] as role}
								{@const roleVols = volunteers.filter(v => (v as any)[role.key])}
								<div>
									<h3 class="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
										{role.label} ({roleVols.length})
									</h3>
									{#if roleVols.length === 0}
										<p class="text-white/30 text-xs italic">None yet</p>
									{:else}
										<div class="space-y-1.5">
											{#each roleVols as v}
												{@const s = summaryFor(v.userId)}
												<div class="text-sm text-white/70 px-3 py-1.5 rounded-lg"
													style="background:rgba(255,255,255,0.05);">
													{s?.headName ?? '—'} <span class="text-white/30 text-xs">· {s?.phone ?? ''}</span>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				</div>

			<!-- ══ TAB: Export ════════════════════════════════════════════════ -->
			{:else if activeTab === 'export'}
				<div class="space-y-5">
					<p class="text-white/60 text-sm">Download data as CSV files, compatible with Excel and Google Sheets. Files include a UTF-8 BOM for correct character encoding.</p>

					{#each [
						{
							icon: '📋',
							title: 'Master Attendance List',
							description: 'All registered households with contact details, attendance dates, family counts, and status. Use this for check-in and headcount.',
							action: exportCSV,
							filename: 'cogwa-nz-feast-2026-registrations.csv'
						},
						{
							icon: '🎵',
							title: 'Volunteer Roster (Full)',
							description: 'Complete volunteer preferences for all households — choir, music, sermonettes, and logistics. One row per registrant with all role data.',
							action: exportVolunteerCSV,
							filename: 'cogwa-nz-feast-2026-volunteers.csv'
						},
						{
							icon: '🎼',
							title: 'Choir Roster by Voice Part',
							description: 'Sorted by voice part (Soprano → Alto → Tenor → Bass) for the choir director. Includes experienced member flag and special music details.',
							action: exportChoirCSV,
							filename: 'cogwa-nz-feast-2026-choir-roster.csv'
						}
					] as exp}
						<div class="rounded-2xl p-6"
							style="background:rgba(255,255,255,0.08);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.18);">
							<div class="flex items-start gap-4">
								<span class="text-4xl">{exp.icon}</span>
								<div class="flex-1">
									<h3 class="text-white font-bold text-lg">{exp.title}</h3>
									<p class="text-white/60 text-sm mt-1 mb-4">{exp.description}</p>
									<div class="text-xs text-white/30 mb-4 font-mono">{exp.filename}</div>
									<button onclick={exp.action}
										class="px-6 py-2.5 rounded-xl font-semibold text-sm text-amber-900 transition-all hover:scale-105"
										style="background:rgba(255,220,100,0.9);">
										⬇️ Download CSV
									</button>
								</div>
							</div>
						</div>
					{/each}

					<!-- Data info -->
					<div class="rounded-2xl p-5 mt-2"
						style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
						<h3 class="text-white/60 text-sm font-medium mb-2">📊 Current Dataset</h3>
						<div class="grid grid-cols-3 gap-4 text-center">
							<div>
								<div class="text-2xl font-bold text-white">{summaries.length}</div>
								<div class="text-white/40 text-xs">Households</div>
							</div>
							<div>
								<div class="text-2xl font-bold text-white">{stats.totalAttendees}</div>
								<div class="text-white/40 text-xs">Total Attendees</div>
							</div>
							<div>
								<div class="text-2xl font-bold text-white">{volunteers.length}</div>
								<div class="text-white/40 text-xs">With Volunteer Prefs</div>
							</div>
						</div>
					</div>

					<!-- NZ Privacy Act compliance note -->
					<div class="rounded-xl p-4 text-xs" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);">
						🔒 <strong class="text-white/60">NZ Privacy Act 2020 — IPP 5 Compliance:</strong>
						Downloaded files contain personal information and must be stored securely. Do not share externally without member consent.
						As Privacy Officer, you are responsible for ensuring these files are deleted when no longer required for Feast coordination.
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>
