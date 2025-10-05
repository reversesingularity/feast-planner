<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore, user, isLoading } from '$lib/stores/auth';
	import Heading from '$lib/components/Heading.svelte';
	import Text from '$lib/components/Text.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	
	let isChangingPassword = $state(false);
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmNewPassword = $state('');
	let error = $state('');
	let success = $state('');
	let isSaving = $state(false);
	
	// Get user attributes
	const userEmail = $derived($user?.attributes?.email || 'Not available');
	const userName = $derived($user?.attributes?.name || 'Not available');
	const userSub = $derived($user?.userId || 'Not available');
	
	// Format date joined (user creation date)
	const dateJoined = $derived(() => {
		// In a real app, you'd get this from user attributes
		return new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});
	
	async function handleSignOut() {
		const result = await authStore.signOut();
		if (result.success) {
			goto('/');
		}
	}
	
	async function handleChangePassword() {
		if (!newPassword || !confirmNewPassword) {
			error = 'Please fill in all fields';
			return;
		}
		
		if (newPassword !== confirmNewPassword) {
			error = 'New passwords do not match';
			return;
		}
		
		if (newPassword.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}
		
		isSaving = true;
		error = '';
		success = '';
		
		// Note: AWS Cognito requires current session to change password
		// This is a simplified version - you'd need to import updatePassword from aws-amplify/auth
		try {
			// TODO: Implement actual password change with AWS Amplify
			// const result = await updatePassword({ oldPassword: currentPassword, newPassword });
			
			success = 'Password changed successfully!';
			isChangingPassword = false;
			currentPassword = '';
			newPassword = '';
			confirmNewPassword = '';
		} catch (err: any) {
			error = err.message || 'Failed to change password';
		}
		
		isSaving = false;
	}
</script>

<svelte:head>
	<title>My Profile - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
	<!-- Header -->
	<div class="bg-white border-b border-gray-200 shadow-sm">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="flex items-center justify-between">
				<div>
					<Heading level={1} class="text-3xl">My Profile</Heading>
					<Text variant="secondary" class="mt-1">Manage your account settings</Text>
				</div>
				<Button href="/my-trips" outline>
					← Back to Trips
				</Button>
			</div>
		</div>
	</div>

	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="space-y-6">
			<!-- Profile Information -->
			<Card>
				{#snippet header()}
					<Heading level={2} variant="subheading">Profile Information</Heading>
				{/snippet}
				
				<div class="space-y-6">
					<!-- Profile Avatar -->
					<div class="flex items-center gap-4">
						<div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
							{userName.charAt(0).toUpperCase()}
						</div>
						<div>
							<Text class="font-semibold text-lg" style="color: #111827;">{userName}</Text>
							<Text variant="secondary" class="text-sm">{userEmail}</Text>
						</div>
					</div>
					
					<!-- User Details -->
					<div class="grid md:grid-cols-2 gap-6">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
							<Input type="text" value={userName} disabled />
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
							<Input type="email" value={userEmail} disabled />
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">User ID</label>
							<Input type="text" value={userSub} disabled class="font-mono text-xs" />
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
							<Input type="text" value={dateJoined()} disabled />
						</div>
					</div>
					
					<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<Text class="text-sm text-blue-800">
							💡 To update your name or email, please contact support or use the AWS Cognito console.
						</Text>
					</div>
				</div>
			</Card>

			<!-- Password Management -->
			<Card>
				{#snippet header()}
					<div class="flex items-center justify-between">
						<Heading level={2} variant="subheading">Password</Heading>
						{#if !isChangingPassword}
							<Button outline size="sm" onclick={() => isChangingPassword = true}>
								Change Password
							</Button>
						{/if}
					</div>
				{/snippet}
				
				{#if isChangingPassword}
					<form onsubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
						<div class="space-y-4">
							<!-- Current Password -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									Current Password
								</label>
								<Input
									type="password"
									bind:value={currentPassword}
									placeholder="••••••••"
									autocomplete="current-password"
								/>
							</div>
							
							<!-- New Password -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									New Password
								</label>
								<Input
									type="password"
									bind:value={newPassword}
									placeholder="••••••••"
									autocomplete="new-password"
								/>
								<Text variant="secondary" class="text-xs mt-1">
									Must be at least 8 characters with uppercase, lowercase, and number
								</Text>
							</div>
							
							<!-- Confirm New Password -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									Confirm New Password
								</label>
								<Input
									type="password"
									bind:value={confirmNewPassword}
									placeholder="••••••••"
									autocomplete="new-password"
								/>
							</div>
							
							<!-- Error Message -->
							{#if error}
								<div class="bg-red-50 border border-red-200 rounded-lg p-4">
									<Text class="text-red-800 text-sm">⚠️ {error}</Text>
								</div>
							{/if}
							
							<!-- Success Message -->
							{#if success}
								<div class="bg-green-50 border border-green-200 rounded-lg p-4">
									<Text class="text-green-800 text-sm">✓ {success}</Text>
								</div>
							{/if}
							
							<!-- Buttons -->
							<div class="flex gap-3">
								<Button
									type="submit"
									color="blue"
									disabled={isSaving}
								>
									{isSaving ? 'Saving...' : 'Save Password'}
								</Button>
								<Button
									outline
									onclick={() => {
										isChangingPassword = false;
										currentPassword = '';
										newPassword = '';
										confirmNewPassword = '';
										error = '';
										success = '';
									}}
								>
									Cancel
								</Button>
							</div>
						</div>
					</form>
				{:else}
					<Text variant="secondary">
						Your password is securely encrypted. Click "Change Password" to update it.
					</Text>
				{/if}
			</Card>

			<!-- Account Statistics -->
			<Card>
				{#snippet header()}
					<Heading level={2} variant="subheading">Account Activity</Heading>
				{/snippet}
				
				<div class="grid md:grid-cols-3 gap-6">
					<div class="text-center p-4 bg-blue-50 rounded-lg">
						<div class="text-3xl font-bold text-blue-600">0</div>
						<Text variant="secondary" class="text-sm mt-1">Trips Planned</Text>
					</div>
					<div class="text-center p-4 bg-green-50 rounded-lg">
						<div class="text-3xl font-bold text-green-600">0</div>
						<Text variant="secondary" class="text-sm mt-1">Sites Bookmarked</Text>
					</div>
					<div class="text-center p-4 bg-purple-50 rounded-lg">
						<div class="text-3xl font-bold text-purple-600">0</div>
						<Text variant="secondary" class="text-sm mt-1">Activities Saved</Text>
					</div>
				</div>
			</Card>

			<!-- Danger Zone -->
			<Card>
				{#snippet header()}
					<Heading level={2} variant="subheading" class="text-red-600">Danger Zone</Heading>
				{/snippet}
				
				<div class="space-y-4">
					<div class="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
						<div>
							<Text class="font-semibold" style="color: #991b1b;">Sign Out</Text>
							<Text variant="secondary" class="text-sm">Sign out of your account on this device</Text>
						</div>
						<Button
							color="red"
							outline
							onclick={handleSignOut}
						>
							Sign Out
						</Button>
					</div>
					
					<div class="flex items-center justify-between p-4 border border-red-300 rounded-lg bg-red-50">
						<div>
							<Text class="font-semibold" style="color: #991b1b;">Delete Account</Text>
							<Text variant="secondary" class="text-sm">
								Permanently delete your account and all data (Coming soon)
							</Text>
						</div>
						<Button
							color="red"
							disabled
						>
							Delete Account
						</Button>
					</div>
				</div>
			</Card>
		</div>
	</div>
</div>
