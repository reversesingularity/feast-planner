<script lang="ts">
	import { isAuthenticated, user } from '$lib/stores/auth';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
	<!-- Auth-Aware Navigation Bar -->
	<nav class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo -->
				<div class="flex items-center gap-2">
					<span class="text-3xl">🎉</span>
					<span class="text-xl font-bold text-gray-900">Feast Planner</span>
				</div>
				
				<!-- Auth-Aware Buttons -->
				<div class="flex items-center gap-3">
					<Button href="/sites" outline size="sm">
						🗺️ Sites
					</Button>
					
					{#if $isAuthenticated}
						<!-- Logged In State -->
						<Button href="/my-trips" color="blue" size="sm">
							📅 My Trips
						</Button>
						<div class="relative group">
							<button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
								<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
									{($user?.attributes?.name || 'U').charAt(0).toUpperCase()}
								</div>
								<span class="text-sm font-medium text-gray-700 hidden sm:inline">
									{$user?.attributes?.name || 'User'}
								</span>
								<svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
								</svg>
							</button>
							
							<!-- Dropdown Menu -->
							<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
								<a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg">
									👤 My Profile
								</a>
								<a href="/my-trips" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									📅 My Trips
								</a>
								<hr class="border-gray-200" />
								<a href="/auth/signin" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg">
									🚪 Sign Out
								</a>
							</div>
						</div>
					{:else}
						<!-- Logged Out State -->
						<Button href="/auth/signin" outline size="sm">
							Sign In
						</Button>
						<Button href="/auth/signup" color="blue" size="sm">
							Sign Up Free
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center max-w-3xl mx-auto">
			<h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
				Plan Your Perfect<br />
				Feast of Tabernacles
			</h1>
			<p class="text-xl md:text-2xl text-gray-600 mb-10">
				Discover sites, organize trips, and make the most of your Feast experience
			</p>
			
			{#if $isAuthenticated}
				<!-- Authenticated CTA -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button color="blue" href="/my-trips" size="lg">
						📅 View My Trips
					</Button>
					<Button outline href="/sites" size="lg">
						🗺️ Browse Sites
					</Button>
				</div>
				<p class="text-sm text-gray-500 mt-6">
					Welcome back, {$user?.attributes?.name || 'Friend'}! 👋
				</p>
			{:else}
				<!-- Non-authenticated CTA -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button color="blue" href="/auth/signup" size="lg">
						🚀 Get Started Free
					</Button>
					<Button outline href="/sites" size="lg">
						🗺️ Browse Sites
					</Button>
				</div>
				<p class="text-sm text-gray-500 mt-6">
					No credit card required • Free forever • 2 minutes to sign up
				</p>
			{/if}
		</div>
	</div>

	<!-- Features Grid -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
		<h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need</h2>
		
		<div class="grid md:grid-cols-3 gap-8">
			<!-- Feature 1 -->
			<div class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
				<div class="text-blue-600 text-4xl mb-4">🗺️</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Feast Sites Directory</h3>
				<p class="text-gray-600 mb-4">
					Browse 7+ verified Feast sites from multiple organizations. View locations on interactive maps, read reviews, and find the perfect destination.
				</p>
				<a href="/sites" class="text-blue-600 hover:underline text-sm font-medium">
					Explore Sites →
				</a>
			</div>

			<!-- Feature 2 -->
			<div class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
				<div class="text-green-600 text-4xl mb-4">📅</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Trip Planner</h3>
				<p class="text-gray-600 mb-4">
					{#if $isAuthenticated}
						Create and manage your Feast trips. Add flights, hotels, and activities. Keep everything organized in one place.
					{:else}
						Create and manage your Feast trips. Add flights, hotels, and activities. Sign up to get started!
					{/if}
				</p>
				<a href={$isAuthenticated ? "/my-trips" : "/auth/signup"} class="text-green-600 hover:underline text-sm font-medium">
					{$isAuthenticated ? 'My Trips →' : 'Sign Up to Start →'}
				</a>
			</div>

			<!-- Feature 3 -->
			<div class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
				<div class="text-purple-600 text-4xl mb-4">🔒</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
				<p class="text-gray-600 mb-4">
					Your data is encrypted and secure with AWS Cognito. We never share your information. All your plans stay private.
				</p>
				{#if !$isAuthenticated}
					<a href="/auth/signup" class="text-purple-600 hover:underline text-sm font-medium">
						Create Free Account →
					</a>
				{:else}
					<span class="text-purple-600 text-sm font-medium">✓ Account Secured</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	{#if !$isAuthenticated}
		<div class="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
					Ready to Plan Your Feast?
				</h2>
				<p class="text-xl text-blue-100 mb-8">
					Join hundreds of members planning their perfect Feast experience
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button href="/auth/signup" size="lg" class="bg-white text-blue-600 hover:bg-gray-100">
						🚀 Sign Up Free
					</Button>
					<Button href="/sites" outline size="lg" class="text-white border-white hover:bg-white/10">
						🗺️ Browse Sites First
					</Button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Stats Section -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid md:grid-cols-4 gap-8 text-center">
			<div>
				<div class="text-4xl font-bold text-blue-600 mb-2">7+</div>
				<div class="text-gray-600">Feast Sites</div>
			</div>
			<div>
				<div class="text-4xl font-bold text-green-600 mb-2">5</div>
				<div class="text-gray-600">Organizations</div>
			</div>
			<div>
				<div class="text-4xl font-bold text-purple-600 mb-2">100%</div>
				<div class="text-gray-600">Free Forever</div>
			</div>
			<div>
				<div class="text-4xl font-bold text-orange-600 mb-2">2min</div>
				<div class="text-gray-600">To Get Started</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="bg-white border-t border-gray-200 py-8">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<div class="text-gray-600 text-sm">
					© 2025 Feast Planner. Built with ❤️ for the Church community.
				</div>
				<div class="flex gap-6 text-sm">
					<a href="/sites" class="text-gray-600 hover:text-gray-900">Sites</a>
					{#if $isAuthenticated}
						<a href="/my-trips" class="text-gray-600 hover:text-gray-900">My Trips</a>
						<a href="/profile" class="text-gray-600 hover:text-gray-900">Profile</a>
					{:else}
						<a href="/auth/signin" class="text-gray-600 hover:text-gray-900">Sign In</a>
						<a href="/auth/signup" class="text-gray-600 hover:text-gray-900">Sign Up</a>
					{/if}
				</div>
			</div>
		</div>
	</footer>
</div>
