<script lang="ts"><script lang="ts">

	import { isAuthenticated, user } from '$lib/stores/auth';  import Button from '$lib/components/Button.svelte';

	import Button from '$lib/components/Button.svelte';  

</script>  // Home page for Feast Planner

  let buttonClickCount = $state(0);

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">  

	<!-- Auth-Aware Navigation Bar -->  function handleGetStarted() {

	<nav class="bg-white shadow-sm border-b border-gray-200">    buttonClickCount++;

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    alert(`Button clicked ${buttonClickCount} time(s)! 🎉\n\nThis shows our new Catalyst→Svelte Button component is working!`);

			<div class="flex justify-between items-center h-16">  }

				<!-- Logo --></script>

				<div class="flex items-center gap-2">

					<span class="text-3xl">🎉</span><div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">

					<span class="text-xl font-bold text-gray-900">Feast Planner</span>  <div class="max-w-4xl w-full">

				</div>    <!-- Hero Section -->

				    <div class="text-center mb-12">

				<!-- Auth-Aware Buttons -->      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4">

				<div class="flex items-center gap-3">        🎉 Feast Planner

					<Button href="/sites" outline size="sm">      </h1>

						🗺️ Sites      <p class="text-xl md:text-2xl text-gray-600 mb-8">

					</Button>        Your all-in-one companion for planning the Feast of Tabernacles

					      </p>

					{#if $isAuthenticated}      <div class="flex flex-col sm:flex-row gap-4 justify-center">

						<!-- Logged In State -->        <Button color="indigo" href="/my-trips">

						<Button href="/my-trips" color="blue" size="sm">          📅 My Trips

							📅 My Trips        </Button>

						</Button>        <Button color="blue" href="/sites">

						<div class="relative group">          🗺️ Find Feast Sites

							<button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">        </Button>

								<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">        <Button color="green" href="/forms">

									{($user?.attributes?.name || 'U').charAt(0).toUpperCase()}          📝 Form Components

								</div>        </Button>

								<span class="text-sm font-medium text-gray-700 hidden sm:inline">        <Button outline href="/components">

									{$user?.attributes?.name || 'User'}          View Components

								</span>        </Button>

								<svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">      </div>

									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>    </div>

								</svg>

							</button>    <!-- Status Cards -->

							    <div class="grid md:grid-cols-3 gap-6 mb-12">

							<!-- Dropdown Menu -->      <!-- Setup Card -->

							<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">      <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">

								<a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg">        <div class="text-green-600 text-3xl mb-3">✅</div>

									👤 My Profile        <h3 class="text-lg font-semibold text-gray-900 mb-2">Setup Complete</h3>

								</a>        <p class="text-gray-600 text-sm">

								<a href="/my-trips" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">          SvelteKit, Tailwind CSS v4, and Catalyst UI Kit are ready to go!

									📅 My Trips        </p>

								</a>      </div>

								<hr class="border-gray-200" />

								<a href="/auth/signin" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg">      <!-- Tech Stack Card -->

									🚪 Sign Out      <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">

								</a>        <div class="text-blue-600 text-3xl mb-3">🚀</div>

							</div>        <h3 class="text-lg font-semibold text-gray-900 mb-2">Modern Stack</h3>

						</div>        <p class="text-gray-600 text-sm">

					{:else}          TypeScript, Vite, and cutting-edge web technologies for a blazing-fast experience.

						<!-- Logged Out State -->        </p>

						<Button href="/auth/signin" outline size="sm">      </div>

							Sign In

						</Button>      <!-- Progress Card -->

						<Button href="/auth/signup" color="blue" size="sm">      <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">

							Sign Up Free        <div class="text-purple-600 text-3xl mb-3">📅</div>

						</Button>        <h3 class="text-lg font-semibold text-gray-900 mb-2">6-Month Plan</h3>

					{/if}        <p class="text-gray-600 text-sm">

				</div>          Month 0 complete! Ready to start Month 1: Infrastructure & Authentication.

			</div>        </p>

		</div>      </div>

	</nav>    </div>



	<!-- Hero Section -->    <!-- Feature Preview -->

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">    <div class="bg-white rounded-xl shadow-lg p-8">

		<div class="text-center max-w-3xl mx-auto">      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">✨ Now Available</h2>

			<h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">      <div class="grid sm:grid-cols-2 gap-4">

				Plan Your Perfect<br />        <div class="flex items-start gap-3">

				Feast of Tabernacles          <span class="text-2xl">🗺️</span>

			</h1>          <div>

			<p class="text-xl md:text-2xl text-gray-600 mb-10">            <h4 class="font-semibold text-gray-900">Site Search</h4>

				Discover sites, organize trips, and make the most of your Feast experience            <p class="text-sm text-gray-600">Search and filter Feast sites with live results</p>

			</p>            <a href="/sites" class="text-sm text-indigo-600 hover:underline mt-1 inline-block">

			              Try it now →

			{#if $isAuthenticated}            </a>

				<!-- Authenticated CTA -->          </div>

				<div class="flex flex-col sm:flex-row gap-4 justify-center">        </div>

					<Button color="blue" href="/my-trips" size="lg">        <div class="flex items-start gap-3">

						📅 View My Trips          <span class="text-2xl">🎨</span>

					</Button>          <div>

					<Button outline href="/sites" size="lg">            <h4 class="font-semibold text-gray-900">Component Library</h4>

						🗺️ Browse Sites            <p class="text-sm text-gray-600">7 components ready: Button, Badge, Input, Card, Heading, Text, Divider</p>

					</Button>            <div class="flex gap-2 mt-1">

				</div>              <a href="/components" class="text-sm text-indigo-600 hover:underline">

				<p class="text-sm text-gray-500 mt-6">                Components →

					Welcome back, {$user?.attributes?.name || 'Friend'}! 👋              </a>

				</p>              <a href="/utilities" class="text-sm text-indigo-600 hover:underline">

			{:else}                Utilities →

				<!-- Non-authenticated CTA -->              </a>

				<div class="flex flex-col sm:flex-row gap-4 justify-center">            </div>

					<Button color="blue" href="/auth/signup" size="lg">          </div>

						🚀 Get Started Free        </div>

					</Button>        <div class="flex items-start gap-3 opacity-50">

					<Button outline href="/sites" size="lg">          <span class="text-2xl">�</span>

						🗺️ Browse Sites          <div>

					</Button>            <h4 class="font-semibold text-gray-900">Trip Planning</h4>

				</div>            <p class="text-sm text-gray-600">Coming soon: Organize your entire trip</p>

				<p class="text-sm text-gray-500 mt-6">          </div>

					No credit card required • Free forever • 2 minutes to sign up        </div>

				</p>        <div class="flex items-start gap-3 opacity-50">

			{/if}          <span class="text-2xl">�</span>

		</div>          <div>

	</div>            <h4 class="font-semibold text-gray-900">Budget Tracker</h4>

            <p class="text-sm text-gray-600">Coming soon: Track expenses and costs</p>

	<!-- Features Grid -->          </div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">        </div>

		<h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need</h2>      </div>

		    </div>

		<div class="grid md:grid-cols-3 gap-8">

			<!-- Feature 1 -->    <!-- Footer -->

			<div class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">    <div class="text-center mt-8 text-gray-500 text-sm">

				<div class="text-blue-600 text-4xl mb-4">🗺️</div>      <p>Built with ❤️ using SvelteKit + Tailwind CSS + Catalyst</p>

				<h3 class="text-xl font-semibold text-gray-900 mb-3">Feast Sites Directory</h3>      <p class="mt-2">Month 0 - Weekend 0 ✅ Complete | October 4, 2025</p>

				<p class="text-gray-600 mb-4">    </div>

					Browse 7+ verified Feast sites from multiple organizations. View locations on interactive maps, read reviews, and find the perfect destination.  </div>

				</p></div>

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
