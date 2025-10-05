<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	
	interface Props {
		/** Google Maps API key */
		apiKey?: string;
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
		apiKey = 'AIzaSyBHiQWZVYNxb-7YzKqR9pQF5yP_wQT6vKc', // You'll need to replace with your API key
		lat,
		lng,
		zoom = 13,
		markerTitle = 'Location',
		height = '400px',
		class: className = ''
	}: Props = $props();
	
	let mapContainer: HTMLDivElement;
	let map: google.maps.Map | null = null;
	let marker: google.maps.Marker | null = null;
	
	onMount(async () => {
		try {
			const loader = new Loader({
				apiKey: apiKey,
				version: 'weekly'
			});
			
			await loader.load();
			
			// Initialize map
			map = new google.maps.Map(mapContainer, {
				center: { lat, lng },
				zoom: zoom,
				mapTypeControl: true,
				streetViewControl: true,
				fullscreenControl: true,
				zoomControl: true
			});
			
			// Add marker
			marker = new google.maps.Marker({
				position: { lat, lng },
				map: map,
				title: markerTitle,
				animation: google.maps.Animation.DROP
			});
			
			// Add info window
			const infoWindow = new google.maps.InfoWindow({
				content: `<div style="padding: 8px;"><strong>${markerTitle}</strong></div>`
			});
			
			marker.addListener('click', () => {
				infoWindow.open(map, marker);
			});
		} catch (error) {
			console.error('Error loading Google Maps:', error);
		}
	});
</script>

<div 
	bind:this={mapContainer}
	class="rounded-lg overflow-hidden shadow-md {className}"
	style="height: {height}; width: 100%;"
></div>
