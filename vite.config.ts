import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		include: ['@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb']
	},
	build: {
		rollupOptions: {
			output: {
				// AWS SDK v3 has circular deps that cause TDZ errors when Rollup
				// splits them across chunks. Grouping them in one chunk fixes it.
				manualChunks(id) {
					if (
						id.includes('@aws-sdk') ||
						id.includes('@smithy') ||
						id.includes('@aws-amplify') ||
						id.includes('aws-amplify')
					) {
						return 'vendor-aws';
					}
				}
			}
		}
	}
});
