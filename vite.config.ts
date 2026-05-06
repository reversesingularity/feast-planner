import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// For SSR, keep AWS SDK / Amplify packages as Node.js externals (default
	// behaviour). Forcing them into the Rollup bundle via noExternal causes
	// "Cannot access X before initialization" TDZ errors because Rollup
	// flattens their circular ES-module graph in the wrong order.
	//
	// For the client build, list them in optimizeDeps.include so esbuild
	// pre-bundles them during dev. esbuild handles circular deps correctly.
	optimizeDeps: {
		include: [
			'aws-amplify',
			'@aws-amplify/auth',
			'@aws-amplify/core',
			'@aws-sdk/client-dynamodb',
			'@aws-sdk/lib-dynamodb',
			'@smithy/smithy-client'
		]
	}
});
