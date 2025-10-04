<script lang="ts">
  import Heading from '$lib/components/Heading.svelte';
  import Text from '$lib/components/Text.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>Utility Components - Feast Planner</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
  <div class="max-w-5xl mx-auto space-y-12">
    
    <!-- Header -->
    <div class="text-center space-y-4">
      <Heading level={1}>🛠️ Utility Components</Heading>
      <Text>Typography and layout utilities for consistent design</Text>
      <div class="flex gap-3 justify-center">
        <Button href="/" variant="outline">← Back to Home</Button>
        <Button href="/components" variant="outline">View Other Components</Button>
      </div>
    </div>

    <Divider />

    <!-- Heading Component Section -->
    <section class="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <Heading level={2} variant="subheading">Heading Component</Heading>
        <Text>Semantic headings with consistent typography scales</Text>
      </div>

      <Divider soft={true} />

      <div class="space-y-6">
        <div>
          <Text variant="strong">Default Headings (variant="heading")</Text>
          <div class="mt-4 space-y-4 bg-slate-50 p-6 rounded-lg">
            <Heading level={1}>Heading Level 1</Heading>
            <Heading level={2}>Heading Level 2</Heading>
            <Heading level={3}>Heading Level 3</Heading>
            <Heading level={4}>Heading Level 4</Heading>
            <Heading level={5}>Heading Level 5</Heading>
            <Heading level={6}>Heading Level 6</Heading>
          </div>
        </div>

        <div>
          <Text variant="strong">Subheadings (variant="subheading")</Text>
          <div class="mt-4 space-y-4 bg-slate-50 p-6 rounded-lg">
            <Heading level={1} variant="subheading">Subheading Level 1</Heading>
            <Heading level={2} variant="subheading">Subheading Level 2</Heading>
            <Heading level={3} variant="subheading">Subheading Level 3</Heading>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Text variant="strong">Usage Example:</Text>
          <Text variant="code">{`<Heading level={1}>Page Title</Heading>`}</Text>
          <br />
          <Text variant="code">{`<Heading level={2} variant="subheading">Section Title</Heading>`}</Text>
        </div>
      </div>
    </section>

    <!-- Text Component Section -->
    <section class="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <Heading level={2} variant="subheading">Text Component</Heading>
        <Text>Body text, strong emphasis, and inline code</Text>
      </div>

      <Divider soft={true} />

      <div class="space-y-6">
        <div>
          <Text variant="strong">Default Text</Text>
          <div class="mt-4 bg-slate-50 p-6 rounded-lg space-y-3">
            <Text>This is regular body text with default styling. It uses a muted color for comfortable reading.</Text>
            <Text>Multiple paragraphs maintain consistent spacing and line height for optimal readability across devices.</Text>
          </div>
        </div>

        <div>
          <Text variant="strong">Strong Text (Bold Emphasis)</Text>
          <div class="mt-4 bg-slate-50 p-6 rounded-lg">
            <Text>
              You can use <Text variant="strong">strong text</Text> to emphasize important words or phrases within your content.
            </Text>
          </div>
        </div>

        <div>
          <Text variant="strong">Inline Code</Text>
          <div class="mt-4 bg-slate-50 p-6 rounded-lg space-y-3">
            <Text>
              Use the code variant for inline code snippets like <Text variant="code">npm install</Text> or 
              <Text variant="code">const myVariable = true</Text> in your documentation.
            </Text>
            <Text>
              It works great for file paths too: <Text variant="code">src/lib/components/Button.svelte</Text>
            </Text>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Text variant="strong">Usage Examples:</Text>
          <Text variant="code">{`<Text>Regular paragraph text</Text>`}</Text>
          <br />
          <Text variant="code">{`<Text variant="strong">Bold text</Text>`}</Text>
          <br />
          <Text variant="code">{`<Text variant="code">inline.code()</Text>`}</Text>
        </div>
      </div>
    </section>

    <!-- Divider Component Section -->
    <section class="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <Heading level={2} variant="subheading">Divider Component</Heading>
        <Text>Visual separators for organizing content sections</Text>
      </div>

      <Divider soft={true} />

      <div class="space-y-6">
        <div>
          <Text variant="strong">Default Divider</Text>
          <div class="mt-4 bg-slate-50 p-6 rounded-lg">
            <Text>Content above the divider</Text>
            <Divider />
            <Text>Content below the divider</Text>
          </div>
        </div>

        <div>
          <Text variant="strong">Soft Divider (Subtle)</Text>
          <div class="mt-4 bg-slate-50 p-6 rounded-lg">
            <Text>Content above the soft divider</Text>
            <Divider soft={true} />
            <Text>Content below the soft divider</Text>
            <Text variant="code">soft={'{true}'}</Text>
          </div>
        </div>

        <div>
          <Text variant="strong">Multiple Sections</Text>
          <div class="mt-4 bg-slate-50 p-6 rounded-lg">
            <div class="space-y-4">
              <div>
                <Heading level={3} variant="subheading">Section 1</Heading>
                <Text>First section content with important information.</Text>
              </div>
              
              <Divider soft={true} />
              
              <div>
                <Heading level={3} variant="subheading">Section 2</Heading>
                <Text>Second section content separated by a soft divider.</Text>
              </div>
              
              <Divider />
              
              <div>
                <Heading level={3} variant="subheading">Section 3</Heading>
                <Text>Third section separated by a regular divider for stronger visual separation.</Text>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Text variant="strong">Usage Examples:</Text>
          <Text variant="code">{`<Divider />`}</Text>
          <br />
          <Text variant="code">{`<Divider soft={true} />`}</Text>
        </div>
      </div>
    </section>

    <!-- Real-World Example -->
    <section class="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <Heading level={2} variant="subheading">Real-World Example</Heading>
        <Text>See how these utilities work together</Text>
      </div>

      <Divider soft={true} />

      <div class="space-y-4">
        <Heading level={3}>Planning Your Feast of Tabernacles Trip</Heading>
        
        <Text>
          The <Text variant="strong">Feast Planner</Text> helps you organize every aspect of your trip, 
          from site selection to daily activities. Use our tools to make your planning effortless.
        </Text>

        <Divider soft={true} />

        <div class="space-y-3">
          <Heading level={4} variant="subheading">Getting Started</Heading>
          <Text>
            Start by browsing available Feast sites using the <Text variant="code">Search</Text> feature. 
            Filter by location, availability, and organization to find your perfect match.
          </Text>
        </div>

        <Divider soft={true} />

        <div class="space-y-3">
          <Heading level={4} variant="subheading">Track Your Budget</Heading>
          <Text>
            <Text variant="strong">Coming soon:</Text> Monitor your expenses in real-time and stay 
            within your budget. Our intelligent tracking system helps you plan ahead.
          </Text>
        </div>

        <Divider />

        <div class="flex gap-3">
          <Button href="/sites" color="indigo">🗺️ Browse Sites</Button>
          <Button href="/" variant="outline">Learn More</Button>
        </div>
      </div>
    </section>

    <!-- Component Specifications -->
    <section class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 space-y-4">
      <Heading level={2} variant="subheading">Component Specifications</Heading>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg p-6 space-y-2">
          <Heading level={3} variant="subheading">Heading</Heading>
          <Divider soft={true} />
          <Text variant="strong">Props:</Text>
          <Text variant="code">level: 1-6</Text>
          <Text variant="code">variant</Text>
          <Text variant="code">class</Text>
        </div>

        <div class="bg-white rounded-lg p-6 space-y-2">
          <Heading level={3} variant="subheading">Text</Heading>
          <Divider soft={true} />
          <Text variant="strong">Props:</Text>
          <Text variant="code">variant</Text>
          <Text variant="code">class</Text>
        </div>

        <div class="bg-white rounded-lg p-6 space-y-2">
          <Heading level={3} variant="subheading">Divider</Heading>
          <Divider soft={true} />
          <Text variant="strong">Props:</Text>
          <Text variant="code">soft: boolean</Text>
          <Text variant="code">class</Text>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div class="text-center space-y-4 py-8">
      <Divider />
      <Text>Built with SvelteKit, Tailwind CSS v4, and Catalyst UI components</Text>
      <div class="flex gap-3 justify-center">
        <Button href="/" variant="outline" size="sm">Home</Button>
        <Button href="/components" variant="outline" size="sm">Components</Button>
        <Button href="/sites" variant="outline" size="sm">Sites</Button>
      </div>
    </div>

  </div>
</div>
