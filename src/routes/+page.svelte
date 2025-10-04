<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  
  // Home page for Feast Planner
  let buttonClickCount = $state(0);
  
  function handleGetStarted() {
    buttonClickCount++;
    alert(`Button clicked ${buttonClickCount} time(s)! 🎉\n\nThis shows our new Catalyst→Svelte Button component is working!`);
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
  <div class="max-w-4xl w-full">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
        🎉 Feast Planner
      </h1>
      <p class="text-xl md:text-2xl text-gray-600 mb-8">
        Your all-in-one companion for planning the Feast of Tabernacles
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button color="indigo" href="/sites">
          🗺️ Find Feast Sites
        </Button>
        <Button color="blue" outline href="/components">
          View Components
        </Button>
      </div>
    </div>

    <!-- Status Cards -->
    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <!-- Setup Card -->
      <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
        <div class="text-green-600 text-3xl mb-3">✅</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Setup Complete</h3>
        <p class="text-gray-600 text-sm">
          SvelteKit, Tailwind CSS v4, and Catalyst UI Kit are ready to go!
        </p>
      </div>

      <!-- Tech Stack Card -->
      <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
        <div class="text-blue-600 text-3xl mb-3">🚀</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Modern Stack</h3>
        <p class="text-gray-600 text-sm">
          TypeScript, Vite, and cutting-edge web technologies for a blazing-fast experience.
        </p>
      </div>

      <!-- Progress Card -->
      <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
        <div class="text-purple-600 text-3xl mb-3">📅</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">6-Month Plan</h3>
        <p class="text-gray-600 text-sm">
          Month 0 complete! Ready to start Month 1: Infrastructure & Authentication.
        </p>
      </div>
    </div>

    <!-- Feature Preview -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">✨ Now Available</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🗺️</span>
          <div>
            <h4 class="font-semibold text-gray-900">Site Search</h4>
            <p class="text-sm text-gray-600">Search and filter Feast sites with live results</p>
            <a href="/sites" class="text-sm text-indigo-600 hover:underline mt-1 inline-block">
              Try it now →
            </a>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎨</span>
          <div>
            <h4 class="font-semibold text-gray-900">Component Library</h4>
            <p class="text-sm text-gray-600">7 components ready: Button, Badge, Input, Card, Heading, Text, Divider</p>
            <div class="flex gap-2 mt-1">
              <a href="/components" class="text-sm text-indigo-600 hover:underline">
                Components →
              </a>
              <a href="/utilities" class="text-sm text-indigo-600 hover:underline">
                Utilities →
              </a>
            </div>
          </div>
        </div>
        <div class="flex items-start gap-3 opacity-50">
          <span class="text-2xl">�</span>
          <div>
            <h4 class="font-semibold text-gray-900">Trip Planning</h4>
            <p class="text-sm text-gray-600">Coming soon: Organize your entire trip</p>
          </div>
        </div>
        <div class="flex items-start gap-3 opacity-50">
          <span class="text-2xl">�</span>
          <div>
            <h4 class="font-semibold text-gray-900">Budget Tracker</h4>
            <p class="text-sm text-gray-600">Coming soon: Track expenses and costs</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center mt-8 text-gray-500 text-sm">
      <p>Built with ❤️ using SvelteKit + Tailwind CSS + Catalyst</p>
      <p class="mt-2">Month 0 - Weekend 0 ✅ Complete | October 4, 2025</p>
    </div>
  </div>
</div>
