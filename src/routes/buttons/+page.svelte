<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	
	let clickCount = $state(0);
	
	function handleClick(variant: string) {
		clickCount++;
		console.log(`${variant} button clicked! Total clicks: ${clickCount}`);
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-900 mb-2">
				🎨 Button Component Gallery
			</h1>
			<p class="text-lg text-gray-600">
				Converted from Catalyst UI Kit (React) → Svelte 5
			</p>
			<p class="text-sm text-gray-500 mt-2">
				Click counter: <span class="font-bold text-indigo-600">{clickCount}</span>
			</p>
		</div>

		<!-- Solid Buttons - Color Variants -->
		<section class="bg-white rounded-xl shadow-lg p-8 mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Solid Buttons (All Colors)</h2>
			
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<div class="flex flex-col gap-2">
					<Button color="dark/zinc" onclick={() => handleClick('Dark/Zinc')}>
						Dark/Zinc
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="light" onclick={() => handleClick('Light')}>
						Light
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="blue" onclick={() => handleClick('Blue')}>
						Blue
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="indigo" onclick={() => handleClick('Indigo')}>
						Indigo
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="green" onclick={() => handleClick('Green')}>
						Green
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="emerald" onclick={() => handleClick('Emerald')}>
						Emerald
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="red" onclick={() => handleClick('Red')}>
						Red
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="orange" onclick={() => handleClick('Orange')}>
						Orange
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="yellow" onclick={() => handleClick('Yellow')}>
						Yellow
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="purple" onclick={() => handleClick('Purple')}>
						Purple
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="pink" onclick={() => handleClick('Pink')}>
						Pink
					</Button>
				</div>
				
				<div class="flex flex-col gap-2">
					<Button color="cyan" onclick={() => handleClick('Cyan')}>
						Cyan
					</Button>
				</div>
			</div>
		</section>

		<!-- Button Variants -->
		<section class="bg-white rounded-xl shadow-lg p-8 mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Button Variants</h2>
			
			<div class="flex flex-wrap gap-4">
				<Button color="indigo" onclick={() => handleClick('Solid')}>
					Solid Button (Default)
				</Button>
				
				<Button outline onclick={() => handleClick('Outline')}>
					Outline Button
				</Button>
				
				<Button plain onclick={() => handleClick('Plain')}>
					Plain Button
				</Button>
			</div>
		</section>

		<!-- Link Buttons -->
		<section class="bg-white rounded-xl shadow-lg p-8 mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Link Buttons</h2>
			
			<div class="flex flex-wrap gap-4">
				<Button href="/" color="blue">
					Internal Link (Home)
				</Button>
				
				<Button href="https://github.com/reversesingularity/feast-planner" color="green">
					External Link (GitHub)
				</Button>
				
				<Button href="/buttons" outline>
					Outline Link
				</Button>
			</div>
		</section>

		<!-- States -->
		<section class="bg-white rounded-xl shadow-lg p-8 mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Button States</h2>
			
			<div class="flex flex-wrap gap-4">
				<Button color="indigo">
					Normal State
				</Button>
				
				<Button color="indigo" disabled>
					Disabled State
				</Button>
				
				<Button outline disabled>
					Disabled Outline
				</Button>
			</div>
		</section>

		<!-- Touch Targets -->
		<section class="bg-white rounded-xl shadow-lg p-8 mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">
				Touch-Optimized (44x44px minimum)
			</h2>
			<p class="text-gray-600 mb-4">
				All buttons have a minimum 44×44px touch target for accessibility. 
				This is especially useful on mobile devices like your Surface Pro!
			</p>
			
			<div class="flex flex-wrap gap-4">
				<Button color="purple">
					📱 Touch Me!
				</Button>
				
				<Button color="pink">
					👆 Easy to Tap
				</Button>
			</div>
		</section>

		<!-- Code Example -->
		<section class="bg-white rounded-xl shadow-lg p-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-4">Usage Examples</h2>
			
			<div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
				<pre class="text-sm"><code>{`<!-- Solid button with color -->
<Button color="indigo" onclick={handleClick}>
  Click Me
</Button>

<!-- Outline button -->
<Button outline>
  Outline Style
</Button>

<!-- Plain button -->
<Button plain>
  Minimal Style
</Button>

<!-- Link button -->
<Button href="/somewhere" color="blue">
  Go Somewhere
</Button>

<!-- Disabled button -->
<Button color="red" disabled>
  Cannot Click
</Button>`}</code></pre>
			</div>
		</section>

		<!-- Back to Home -->
		<div class="text-center mt-8">
			<Button href="/" color="dark/zinc">
				← Back to Home
			</Button>
		</div>
	</div>
</div>

<style>
	pre {
		margin: 0;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
	}
</style>
