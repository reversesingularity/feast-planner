<script lang="ts">
	import { goto } from '$app/navigation';
	import { isAuthenticated, user, authStore } from '$lib/stores/auth';
	import {
		saveHousehold,
		addFamilyMember,
		deleteFamilyMember,
		saveVolunteerPreferences,
		updateRegistrationStatus,
		getFullRegistration
	} from '$lib/services/registrationDb';
	import type {
		CreateHouseholdInput,
		CreateFamilyMemberInput,
		CreateVolunteerInput,
		FamilyMember
	} from '$lib/types/registration';
	import { onMount } from 'svelte';

	// ── Step state ──────────────────────────────────────────────────────────
	let step = $state(1);
	let isSaving = $state(false);
	let error = $state('');
	let isDraftSaved = $state(false);

	// ── Step 1: Household ───────────────────────────────────────────────────
	let household = $state<CreateHouseholdInput>({
		headFirstName: '',
		headLastName: '',
		email: '',
		phone: '',
		streetAddress: '',
		suburb: '',
		city: '',
		postcode: '',
		region: '',
		attendingAllDays: true,
		arrivalDate: '',
		departureDate: ''
	});

	// ── Step 2: Family members ──────────────────────────────────────────────
	let savedMembers = $state<FamilyMember[]>([]);
	let showAddMember = $state(false);
	let newMember = $state<CreateFamilyMemberInput>({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		isChild: false,
		relationship: 'spouse',
		dietaryRequirements: 'none',
		dietaryNotes: '',
		accessibilityNeeds: '',
		medicalNotes: ''
	});

	// ── Step 3: Volunteer ───────────────────────────────────────────────────
	let volunteer = $state<CreateVolunteerInput>({
		interestedInChoir: false,
		voicePart: undefined,
		singsInChoir: false,
		interestedInSpecialMusic: false,
		specialMusicInstrument: '',
		specialMusicDetails: '',
		interestedInSongLeading: false,
		interestedInSermonette: false,
		interestedInUsher: false,
		interestedInAvTech: false,
		interestedInSetupTakedown: false,
		interestedInChildrenProgram: false,
		interestedInHospitality: false,
		volunteerNotes: '',
		availabilityNotes: ''
	});

	// ── Load existing data ──────────────────────────────────────────────────
	onMount(async () => {
		// Wait for the auth store to finish initialising before checking.
		// Without this, the race between layout onMount (which calls authStore.initialize)
		// and this page's onMount means isAuthenticated is always false on first load,
		// causing a spurious redirect to /auth/signin even when the user is signed in.
		await new Promise<void>((resolve) => {
			const unsub = authStore.subscribe(state => {
				if (!state.isLoading) { unsub(); resolve(); }
			});
		});

		if (!$isAuthenticated) { goto('/auth/signin'); return; }
		if ($user?.attributes?.email) household.email = $user.attributes.email;
		if ($user?.attributes?.name) {
			const [first, ...rest] = ($user.attributes.name as string).split(' ');
			household.headFirstName = first;
			household.headLastName = rest.join(' ');
		}
		try {
			const existing = await getFullRegistration();
			if (existing) {
				const h = existing.household;
				household = {
					headFirstName: h.headFirstName, headLastName: h.headLastName,
					email: h.email, phone: h.phone,
					streetAddress: h.streetAddress, suburb: h.suburb ?? '',
					city: h.city, postcode: h.postcode, region: h.region,
					attendingAllDays: h.attendingAllDays,
					arrivalDate: h.arrivalDate ?? '', departureDate: h.departureDate ?? ''
				};
				savedMembers = existing.members;
				if (existing.volunteer) volunteer = { ...existing.volunteer };
				isDraftSaved = true;
			}
		} catch (_) { /* fresh registration */ }
	});

	// ── Navigation ──────────────────────────────────────────────────────────
	async function next() {
		error = '';
		isSaving = true;
		try {
			if (step === 1) await saveHousehold(household);
			else if (step === 3) await saveVolunteerPreferences(volunteer);
			isDraftSaved = true;
			step++;
		} catch (e: any) {
			error = e.message ?? 'Failed to save. Please try again.';
		} finally { isSaving = false; }
	}

	function back() { step = Math.max(1, step - 1); error = ''; }

	async function submit() {
		error = '';
		isSaving = true;
		try {
			await saveVolunteerPreferences(volunteer);
			await updateRegistrationStatus('submitted');
			step = 5;
		} catch (e: any) {
			error = e.message ?? 'Submission failed. Please try again.';
		} finally { isSaving = false; }
	}

	// ── Family members ──────────────────────────────────────────────────────
	async function handleAddMember() {
		if (!newMember.firstName || !newMember.lastName) {
			error = 'Please enter first and last name for the family member.'; return;
		}
		isSaving = true;
		try {
			const saved = await addFamilyMember(newMember);
			savedMembers = [...savedMembers, saved];
			showAddMember = false;
			newMember = { firstName: '', lastName: '', dateOfBirth: '', isChild: false,
				relationship: 'spouse', dietaryRequirements: 'none',
				dietaryNotes: '', accessibilityNeeds: '', medicalNotes: '' };
			error = '';
		} catch (e: any) { error = e.message ?? 'Failed to add member.'; }
		finally { isSaving = false; }
	}

	async function handleDeleteMember(memberId: string) {
		try {
			await deleteFamilyMember(memberId);
			savedMembers = savedMembers.filter(m => m.memberId !== memberId);
		} catch (e: any) { error = e.message ?? 'Failed to remove member.'; }
	}

	// ── Constants ────────────────────────────────────────────────────────────
	const DAYS = [
		{ value: 'day1', label: 'Day 1 — 25 Sep (Holy Day)' },
		{ value: 'day2', label: 'Day 2 — 26 Sep' },
		{ value: 'day3', label: 'Day 3 — 27 Sep' },
		{ value: 'day4', label: 'Day 4 — 28 Sep' },
		{ value: 'day5', label: 'Day 5 — 29 Sep' },
		{ value: 'day6', label: 'Day 6 — 30 Sep' },
		{ value: 'day7', label: 'Day 7 — 1 Oct' },
		{ value: 'day8', label: 'Day 8 — 2 Oct' },
		{ value: 'day9', label: 'Day 9 — 3 Oct (Last Great Day)' },
	];

	const REGIONS = ['Northland','Auckland','Waikato','Bay of Plenty','Gisborne',
		"Hawke's Bay",'Taranaki','Manawatū-Whanganui','Wellington','Tasman',
		'Nelson','Marlborough','West Coast','Canterbury','Otago','Southland','Other/International'];

	const LOGISTICS_ROLES = [
		{ key: 'interestedInUsher', label: 'Usher / Seating' },
		{ key: 'interestedInAvTech', label: 'AV Tech (sound, projector, recording)' },
		{ key: 'interestedInSetupTakedown', label: 'Setup & Takedown crew' },
		{ key: 'interestedInChildrenProgram', label: "Children's Program helper" },
		{ key: 'interestedInHospitality', label: 'Hospitality / Welcome team' }
	];

	const stepLabels = ['Household', 'Family', 'Service', 'Review'];

	function hasNoVolunteerRoles() {
		return !volunteer.interestedInChoir && !volunteer.interestedInSpecialMusic &&
			!volunteer.interestedInUsher && !volunteer.interestedInAvTech &&
			!volunteer.interestedInSetupTakedown && !volunteer.interestedInChildrenProgram &&
			!volunteer.interestedInHospitality;
	}
</script>

<svelte:head>
	<title>Register — COGWA NZ Feast 2026</title>
</svelte:head>

<div class="min-h-screen py-12 px-4"
	style="background: linear-gradient(135deg, #0f2027 0%, #1a3a4a 30%, #1e5f74 60%, #c8902a 85%, #e8b84b 100%);">
	<div class="max-w-2xl mx-auto">

		<!-- Header -->
		<div class="text-center mb-8">
			<a href="/" class="text-amber-200 text-sm hover:text-white transition-colors">← Back to Home</a>
			<h1 class="text-3xl font-bold text-white mt-3">Feast Registration 2026</h1>
			<p class="text-white/60 text-sm mt-1">Tauranga · 25 Sep – 3 Oct 2026 · Hotel Armitage & Conference Centre</p>
		</div>

		<!-- Step indicator -->
		{#if step <= 4}
			<div class="flex items-center justify-center gap-2 mb-8">
				{#each stepLabels as label, i}
					<div class="flex items-center gap-2">
						<div class="flex items-center gap-1.5">
							<div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
								style="
									background: {step > i + 1 ? 'rgba(100,200,100,0.7)' : step === i + 1 ? 'rgba(255,220,100,0.9)' : 'rgba(255,255,255,0.12)'};
									color: {step >= i + 1 ? '#1a2a00' : 'rgba(255,255,255,0.5)'};
									border: 1px solid {step === i + 1 ? 'rgba(255,220,100,0.5)' : 'transparent'};
								">
								{step > i + 1 ? '✓' : i + 1}
							</div>
							<span class="text-xs hidden sm:block"
								style="color: {step === i + 1 ? 'rgba(255,220,100,0.9)' : 'rgba(255,255,255,0.4)'};">
								{label}
							</span>
						</div>
						{#if i < stepLabels.length - 1}
							<div class="w-8 h-px" style="background: rgba(255,255,255,0.15);"></div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Glass card -->
		<div class="rounded-3xl p-8"
			style="background: rgba(255,255,255,0.08); backdrop-filter: blur(20px);
			       border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 16px 48px rgba(0,0,0,0.25);">

			{#if error}
				<div class="mb-6 rounded-xl px-4 py-3 text-sm"
					style="background: rgba(220,50,50,0.15); border: 1px solid rgba(220,50,50,0.3); color: #ffaaaa;">
					⚠️ {error}
				</div>
			{/if}

			<!-- ══ STEP 1: Household ════════════════════════════════════════ -->
			{#if step === 1}
				<h2 class="text-xl font-bold text-white mb-6">Your Household Details</h2>
				<div class="space-y-5">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="hh-first-name" class="block text-sm text-white/70 mb-1.5">First Name *</label>
							<input id="hh-first-name" bind:value={household.headFirstName} type="text" placeholder="John" class="glass-input" />
						</div>
						<div>
							<label for="hh-last-name" class="block text-sm text-white/70 mb-1.5">Last Name *</label>
							<input id="hh-last-name" bind:value={household.headLastName} type="text" placeholder="Smith" class="glass-input" />
						</div>
					</div>
					<div>
						<label for="hh-email" class="block text-sm text-white/70 mb-1.5">Email Address *</label>
						<input id="hh-email" bind:value={household.email} type="email" class="glass-input" />
					</div>
					<div>
						<label for="hh-phone" class="block text-sm text-white/70 mb-1.5">Phone Number *</label>
						<input id="hh-phone" bind:value={household.phone} type="tel" placeholder="021 123 4567" class="glass-input" />
					</div>
					<div>
						<label for="hh-street" class="block text-sm text-white/70 mb-1.5">Street Address *</label>
						<input id="hh-street" bind:value={household.streetAddress} type="text" placeholder="123 Main Street" class="glass-input" />
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="hh-suburb" class="block text-sm text-white/70 mb-1.5">Suburb</label>
							<input id="hh-suburb" bind:value={household.suburb} type="text" class="glass-input" />
						</div>
						<div>
							<label for="hh-city" class="block text-sm text-white/70 mb-1.5">City *</label>
							<input id="hh-city" bind:value={household.city} type="text" placeholder="Hamilton" class="glass-input" />
						</div>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="hh-postcode" class="block text-sm text-white/70 mb-1.5">Postcode *</label>
							<input id="hh-postcode" bind:value={household.postcode} type="text" placeholder="3204" class="glass-input" />
						</div>
						<div>
							<label for="hh-region" class="block text-sm text-white/70 mb-1.5">Region *</label>
							<select id="hh-region" bind:value={household.region} class="glass-input">
								<option value="">Select region…</option>
								{#each REGIONS as r}<option value={r}>{r}</option>{/each}
							</select>
						</div>
					</div>
					<label class="flex items-center gap-3 cursor-pointer">
						<input type="checkbox" bind:checked={household.attendingAllDays} class="w-4 h-4 rounded" />
						<span class="text-sm text-white/80">Attending all 9 days (25 Sep – 3 Oct 2026)</span>
					</label>
					{#if !household.attendingAllDays}
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label for="hh-arrival" class="block text-sm text-white/70 mb-1.5">Arrival Date</label>
								<input id="hh-arrival" bind:value={household.arrivalDate} type="date" min="2026-09-25" max="2026-10-03" class="glass-input" />
							</div>
							<div>
								<label for="hh-departure" class="block text-sm text-white/70 mb-1.5">Departure Date</label>
								<input id="hh-departure" bind:value={household.departureDate} type="date" min="2026-09-25" max="2026-10-03" class="glass-input" />
							</div>
						</div>
					{/if}
				</div>

			<!-- ══ STEP 2: Family Members ═══════════════════════════════════ -->
			{:else if step === 2}
				<h2 class="text-xl font-bold text-white mb-2">Family Members</h2>
				<p class="text-white/60 text-sm mb-6">Add anyone else in your household who will be attending. You are automatically registered as Head of Household.</p>

				{#if savedMembers.length}
					<div class="space-y-3 mb-5">
						{#each savedMembers as m}
							<div class="flex items-center justify-between rounded-xl px-4 py-3"
								style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);">
								<div>
									<span class="text-white font-medium">{m.firstName} {m.lastName}</span>
									<span class="ml-2 text-xs text-white/50 capitalize">{m.relationship}</span>
									{#if m.isChild}<span class="ml-2 text-xs px-2 py-0.5 rounded-full" style="background:rgba(100,180,255,0.2);color:#90ccff;">Child</span>{/if}
								</div>
								<button onclick={() => handleDeleteMember(m.memberId)} class="text-red-400 hover:text-red-300 text-sm">Remove</button>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-white/40 text-sm italic mb-4">No additional members added yet.</p>
				{/if}

				{#if showAddMember}
					<div class="rounded-2xl p-5 mb-4" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);">
						<h3 class="text-white font-semibold mb-4">Add Family Member</h3>
						<div class="space-y-4">
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label for="mem-first-name" class="block text-sm text-white/70 mb-1.5">First Name *</label>
									<input id="mem-first-name" bind:value={newMember.firstName} type="text" class="glass-input" />
								</div>
								<div>
									<label for="mem-last-name" class="block text-sm text-white/70 mb-1.5">Last Name *</label>
									<input id="mem-last-name" bind:value={newMember.lastName} type="text" class="glass-input" />
								</div>
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label for="mem-relationship" class="block text-sm text-white/70 mb-1.5">Relationship</label>
									<select id="mem-relationship" bind:value={newMember.relationship} class="glass-input">
										<option value="spouse">Spouse</option>
										<option value="child">Child</option>
										<option value="parent">Parent</option>
										<option value="sibling">Sibling</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div>
									<label for="mem-dob" class="block text-sm text-white/70 mb-1.5">Date of Birth</label>
									<input id="mem-dob" bind:value={newMember.dateOfBirth} type="date" class="glass-input" />
								</div>
							</div>
							<label class="flex items-center gap-3 cursor-pointer">
								<input type="checkbox" bind:checked={newMember.isChild} class="w-4 h-4" />
								<span class="text-sm text-white/80">Under 18 (child)</span>
							</label>
							<div>
							<label for="mem-accessibility" class="block text-sm text-white/70 mb-1.5">Accessibility Needs</label>
							 <input id="mem-accessibility" bind:value={newMember.accessibilityNeeds} type="text" placeholder="e.g. wheelchair, hearing loop" class="glass-input" />
							</div>
							<div class="flex gap-3 pt-2">
								<button onclick={handleAddMember} disabled={isSaving} class="glass-btn-primary flex-1" style="color:#1a2a00;">
									{isSaving ? 'Saving…' : '+ Add Member'}
								</button>
								<button onclick={() => { showAddMember = false; error = ''; }} class="glass-btn-secondary flex-1">Cancel</button>
							</div>
						</div>
					</div>
				{:else}
					<button onclick={() => showAddMember = true}
						class="w-full rounded-xl py-3 text-sm font-medium transition-all hover:opacity-80"
						style="background:rgba(255,255,255,0.08);border:1px dashed rgba(255,255,255,0.25);color:rgba(255,255,255,0.7);">
						+ Add a Family Member
					</button>
				{/if}

			<!-- ══ STEP 3: Service / Volunteer ══════════════════════════════ -->
			{:else if step === 3}
				<h2 class="text-xl font-bold text-white mb-2">Service Opportunities</h2>
				<p class="text-white/60 text-sm mb-6">The Feast is a time of joyful service. Please let us know where you'd like to help. All roles are voluntary — no obligation.</p>

				<div class="space-y-7">
					<!-- Music Ministry -->
					<section>
						<h3 class="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">🎵 Music Ministry</h3>
						<div class="space-y-4">
							<label class="flex items-start gap-3 cursor-pointer">
								<input type="checkbox" bind:checked={volunteer.interestedInChoir} class="mt-0.5 w-4 h-4" />
								<span class="text-white/80 text-sm">Sing in the choir</span>
							</label>
							{#if volunteer.interestedInChoir}
								<div class="ml-7 grid grid-cols-2 gap-4">
									<div>
										<label for="vol-voice-part" class="block text-sm text-white/60 mb-1.5">Voice Part</label>
										<select id="vol-voice-part" bind:value={volunteer.voicePart} class="glass-input text-sm">
											<option value="">Select…</option>
											<option value="soprano">Soprano</option>
											<option value="alto">Alto</option>
											<option value="tenor">Tenor</option>
											<option value="bass">Bass</option>
										</select>
									</div>
									<div class="flex items-end">
										<label class="flex items-center gap-2 cursor-pointer pb-2">
											<input type="checkbox" bind:checked={volunteer.singsInChoir} class="w-4 h-4" />
											<span class="text-xs text-white/70">Experienced choir member</span>
										</label>
									</div>
								</div>
							{/if}

							<label class="flex items-start gap-3 cursor-pointer">
								<input type="checkbox" bind:checked={volunteer.interestedInSpecialMusic} class="mt-0.5 w-4 h-4" />
								<span class="text-white/80 text-sm">Offer special music (solo, ensemble, instrumental)</span>
							</label>
							{#if volunteer.interestedInSpecialMusic}
								<div class="ml-7 space-y-3">
									<div>
										<label for="vol-instrument" class="block text-sm text-white/60 mb-1.5">Instrument / Type</label>
										<input id="vol-instrument" bind:value={volunteer.specialMusicInstrument} type="text" placeholder="e.g. Piano, Violin, Vocal solo" class="glass-input text-sm" />
									</div>
									<div>
										<label for="vol-details" class="block text-sm text-white/60 mb-1.5">Details</label>
										<textarea id="vol-details" bind:value={volunteer.specialMusicDetails} rows="2" placeholder="e.g. A piano solo approx. 4 minutes" class="glass-input text-sm resize-none"></textarea>
									</div>
								</div>
							{/if}

							</div>
							</section>



					<!-- Logistics Ministry -->
					<section>
						<h3 class="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">🤝 Logistics Ministry</h3>
						<div class="space-y-3">
							{#each LOGISTICS_ROLES as role}
								<label class="flex items-center gap-3 cursor-pointer">
									<input type="checkbox"
										checked={volunteer[role.key as keyof typeof volunteer] as boolean}
										onchange={() => { (volunteer as any)[role.key] = !(volunteer as any)[role.key]; }}
										class="w-4 h-4" />
									<span class="text-white/80 text-sm">{role.label}</span>
								</label>
							{/each}
						</div>
					</section>

					<div>
						<label for="vol-notes" class="block text-sm text-white/60 mb-1.5">Additional notes for the ministry team</label>
						<textarea id="vol-notes" bind:value={volunteer.volunteerNotes} rows="3" placeholder="Anything else about your availability or abilities…" class="glass-input text-sm resize-none"></textarea>
					</div>
				</div>

			<!-- ══ STEP 4: Review ════════════════════════════════════════════ -->
			{:else if step === 4}
				<h2 class="text-xl font-bold text-white mb-6">Review & Submit</h2>
				<div class="space-y-5 text-sm">

					<div class="rounded-xl p-4" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
						<div class="flex justify-between items-center mb-3">
							<h3 class="text-white font-semibold">Household</h3>
							<button onclick={() => step = 1} class="text-amber-300 text-xs hover:text-amber-200">Edit</button>
						</div>
						<div class="text-white/70 space-y-1">
							<p><span class="text-white/40">Name:</span> {household.headFirstName} {household.headLastName}</p>
							<p><span class="text-white/40">Email:</span> {household.email}</p>
							<p><span class="text-white/40">Phone:</span> {household.phone}</p>
							<p><span class="text-white/40">City:</span> {household.city}, {household.region}</p>
							<p><span class="text-white/40">Attendance:</span> {household.attendingAllDays ? 'All 9 days' : `${household.arrivalDate} – ${household.departureDate}`}</p>
						</div>
					</div>

					<div class="rounded-xl p-4" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
						<div class="flex justify-between items-center mb-3">
							<h3 class="text-white font-semibold">Family ({savedMembers.length + 1} attending)</h3>
							<button onclick={() => step = 2} class="text-amber-300 text-xs hover:text-amber-200">Edit</button>
						</div>
						<div class="text-white/70 space-y-1">
							<p>• {household.headFirstName} {household.headLastName} <span class="text-white/40">(Head of Household)</span></p>
							{#each savedMembers as m}
								<p>• {m.firstName} {m.lastName} <span class="text-white/40 capitalize">({m.relationship}{m.isChild ? ', child' : ''})</span></p>
							{/each}
						</div>
					</div>

					<div class="rounded-xl p-4" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
						<div class="flex justify-between items-center mb-3">
							<h3 class="text-white font-semibold">Service Opportunities</h3>
							<button onclick={() => step = 3} class="text-amber-300 text-xs hover:text-amber-200">Edit</button>
						</div>
						<div class="text-white/70 space-y-1">
							{#if volunteer.interestedInChoir}<p>• Choir {volunteer.voicePart ? `(${volunteer.voicePart})` : ''}</p>{/if}
							{#if volunteer.interestedInSpecialMusic}<p>• Special Music — {volunteer.specialMusicInstrument}</p>{/if}
							{#if volunteer.interestedInUsher}<p>• Usher</p>{/if}
							{#if volunteer.interestedInAvTech}<p>• AV Tech</p>{/if}
							{#if volunteer.interestedInSetupTakedown}<p>• Setup & Takedown</p>{/if}
							{#if volunteer.interestedInChildrenProgram}<p>• Children's Program</p>{/if}
							{#if volunteer.interestedInHospitality}<p>• Hospitality</p>{/if}
							{#if hasNoVolunteerRoles()}<p class="text-white/40 italic">No service roles selected</p>{/if}
						</div>
					</div>

					<div class="rounded-xl p-4 text-xs" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);">
						🔒 By submitting, you agree your information will be used solely for Feast of Tabernacles 2026 coordination by COGWA New Zealand, in accordance with the NZ Privacy Act 2020. Contact Pastor Jon Pinelli to request access to or correction of your data.
					</div>
				</div>

			<!-- ══ SUCCESS ════════════════════════════════════════════════════ -->
			{:else if step === 5}
				<div class="text-center py-6">
					<div class="text-6xl mb-5">🎉</div>
					<h2 class="text-2xl font-bold text-white mb-3">Registration Submitted!</h2>
					<p class="text-white/70 mb-6 leading-relaxed">Thank you for registering for the Feast of Tabernacles 2026 at Hotel Armitage & Conference Centre, Tauranga. First service is Friday 25 September at 7pm. Pastor Jon Pinelli will be in touch with further details.</p>
					<div class="flex flex-col gap-3">
						<a href="/dashboard" class="block py-3 rounded-xl font-semibold text-amber-900 transition-all hover:scale-105" style="background:rgba(255,220,100,0.9);">
							📋 View My Registration
						</a>
						<a href="/" class="block py-3 rounded-xl font-medium transition-all hover:opacity-80" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);">
							← Back to Home
						</a>
					</div>
				</div>
			{/if}

			<!-- Navigation buttons -->
			{#if step >= 1 && step <= 4}
				<div class="flex gap-4 mt-8 pt-6 border-t border-white/10">
					{#if step > 1}
						<button onclick={back} class="glass-btn-secondary flex-1">← Back</button>
					{/if}
					{#if step < 4}
						<button onclick={next} disabled={isSaving} class="glass-btn-primary flex-1" style="color:#1a2a00;">
							{isSaving ? 'Saving…' : 'Continue →'}
						</button>
					{:else}
						<button onclick={submit} disabled={isSaving} class="glass-btn-primary flex-1" style="color:#1a2a00;">
							{isSaving ? 'Submitting…' : '✓ Submit Registration'}
						</button>
					{/if}
				</div>
				{#if isDraftSaved && step < 4}
					<p class="text-center text-xs mt-3" style="color:rgba(255,255,255,0.35);">✓ Progress saved — you can return and continue later</p>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.glass-input) {
		width: 100%;
		padding: 0.6rem 0.875rem;
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
	:global(.glass-input option) { background: #1a3a4a; color: white; }
	:global(.glass-btn-primary) {
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 0.95rem;
		background: rgba(255, 220, 100, 0.9);
		border: none;
		cursor: pointer;
		transition: all 0.15s;
	}
	:global(.glass-btn-primary:hover:not(:disabled)) { transform: translateY(-1px); background: rgba(255, 225, 120, 0.95); }
	:global(.glass-btn-primary:disabled) { opacity: 0.5; cursor: not-allowed; }
	:global(.glass-btn-secondary) {
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 500;
		font-size: 0.95rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.18);
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		transition: all 0.15s;
	}
	:global(.glass-btn-secondary:hover) { background: rgba(255, 255, 255, 0.14); color: white; }
</style>
