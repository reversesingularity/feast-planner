<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	interface Props {
		/** Latitude */
		lat: number;
		/** Longitude */
		lng: number;
		/** Zoom level (1-20) */
		zoom?: number;
		/** Marker title */
		markerTitle?: string;
		/** Map height */
		height?: string;
		/** Additional CSS classes */
		class?: string;
	}
	
	let {
		lat,
		lng,
		zoom = 13,
		markerTitle = 'Location',
		height = '400px',
		class: className = ''
	}: Props = $props();
	
	let mapContainer: HTMLDivElement;
	let map: any = null;
	let marker: any = null;
	
	onMount(() => {
		if (!browser) return;

		(async () => {
			try {
				// Dynamically import Leaflet only on client side
				// @ts-ignore - no @types/leaflet; using dynamic import with any
				const L = (await import('leaflet')).default;

				// Initialize map
				map = L.map(mapContainer).setView([lat, lng], zoom);

				// Add OpenStreetMap tiles
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					maxZoom: 19
				}).addTo(map);

				// Create custom icon
				const customIcon = L.divIcon({
					html: '<div style="background-color: #3b82f6; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
					className: 'custom-marker',
					iconSize: [30, 30],
					iconAnchor: [15, 30],
					popupAnchor: [0, -30]
				});

				// Add marker
				marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

				// Add popup
				marker.bindPopup(`<div style="padding: 4px; font-weight: 600;">${markerTitle}</div>`).openPopup();
			} catch (error) {
				console.error('Error loading Leaflet map:', error);
			}
		})();

		return () => {
			if (map) {
				map.remove();
			}
		};
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
		crossorigin=""/>
</svelte:head>

<div 
	bind:this={mapContainer}
	class="rounded-lg overflow-hidden shadow-md {className}"
	style="height: {height}; width: 100%;"
></div>
