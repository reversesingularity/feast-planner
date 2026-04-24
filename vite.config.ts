import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// Prevent Rollup from splitting AWS SDK / Amplify packages across multiple
	// chunks. These packages have circular ES module dependencies that cause
	// "Cannot access X before initialization" TDZ errors when reordered.
	ssr: {
		noExternal: [
			'aws-amplify',
			'@aws-amplify/auth',
			'@aws-amplify/core',
			'@aws-amplify/api',
			'@aws-amplify/api-graphql',
			'@aws-amplify/storage',
			'@aws-sdk/client-dynamodb',
			'@aws-sdk/lib-dynamodb',
			'@smithy/smithy-client'
		]
	},
	optimizeDeps: {
		include: ['@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb']
	}
});
