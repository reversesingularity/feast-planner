<script lang="ts">
	/**
	 * Toast Notification Component
	 * 
	 * Shows success, error, info, or warning messages to the user.
	 * Auto-dismisses after a timeout or can be manually closed.
	 */
	
	type ToastType = 'success' | 'error' | 'info' | 'warning';
	
	interface Props {
		message: string;
		type?: ToastType;
		duration?: number;
		onClose?: () => void;
	}
	
	let {
		message,
		type = 'info',
		duration = 5000,
		onClose
	}: Props = $props();
	
	let visible = $state(true);
	
	// Auto-dismiss after duration
	$effect(() => {
		if (duration > 0) {
			const timer = setTimeout(() => {
				visible = false;
				if (onClose) {
					setTimeout(onClose, 300); // Wait for exit animation
				}
			}, duration);
			
			return () => clearTimeout(timer);
		}
	});
	
	function handleClose() {
		visible = false;
		if (onClose) {
			setTimeout(onClose, 300);
		}
	}
	
	const icons = {
		success: '✅',
		error: '❌',
		info: 'ℹ️',
		warning: '⚠️'
	};
	
	const colors = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800',
		warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
	};
</script>

{#if visible}
	<div 
		class="fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in"
		role="alert"
	>
		<div class="border-l-4 p-4 rounded-lg shadow-lg {colors[type]} transition-all">
			<div class="flex items-start gap-3">
				<span class="text-2xl flex-shrink-0">{icons[type]}</span>
				<div class="flex-1 min-w-0">
					<p class="text-sm font-medium">{message}</p>
				</div>
				<button
					on:click={handleClose}
					class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close notification"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-in {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	
	.animate-slide-in {
		animation: slide-in 0.3s ease-out;
	}
</style>
