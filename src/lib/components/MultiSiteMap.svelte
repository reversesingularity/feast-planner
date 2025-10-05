<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	
	interface MapSite {
		id: number;
		slug: string;
		name: string;
		lat: number;
		lng: number;
		organization: string;
		status: string;
	}
	
	interface Props {
		/** Google Maps API key */
		apiKey?: string;
		/** Array of sites to display */
		sites: MapSite[];
		/** Map height */
		height?: string;
		/** Initial zoom level */
		zoom?: number;
		/** Additional CSS classes */
		class?: string;
		/** Callback when marker is clicked */
		onMarkerClick?: (site: MapSite) => void;
	}
	
	let {
		apiKey = 'AIzaSyBHiQWZVYNxb-7YzKqR9pQF5yP_wQT6vKc', // Replace with your API key
		sites,
		height = '500px',
		zoom = 4,
		class: className = '',
		onMarkerClick
	}: Props = $props();
	
	let mapContainer: HTMLDivElement;
	let map: google.maps.Map | null = null;
	let markers: google.maps.Marker[] = [];
	
	// Get marker color based on status
	function getMarkerColor(status: string): string {
		switch (status) {
			case 'available':
				return 'green';
			case 'limited':
				return 'yellow';
			case 'full':
				return 'red';
			default:
				return 'blue';
		}
	}
	
	// Get marker icon URL
	function getMarkerIcon(status: string): string {
		const color = getMarkerColor(status);
		return `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
	}
	
	onMount(async () => {
		try {
			const loader = new Loader({
				apiKey: apiKey,
				version: 'weekly'
			});
			
			await loader.load();
			
			// Calculate center point (average of all coordinates)
			const avgLat = sites.reduce((sum, site) => sum + site.lat, 0) / sites.length;
			const avgLng = sites.reduce((sum, site) => sum + site.lng, 0) / sites.length;
			
			// Initialize map
			map = new google.maps.Map(mapContainer, {
				center: { lat: avgLat, lng: avgLng },
				zoom: zoom,
				mapTypeControl: true,
				streetViewControl: false,
				fullscreenControl: true,
				zoomControl: true
			});
			
			// Create bounds to fit all markers
			const bounds = new google.maps.LatLngBounds();
			
			// Add markers for each site
			sites.forEach((site) => {
				const marker = new google.maps.Marker({
					position: { lat: site.lat, lng: site.lng },
					map: map,
					title: site.name,
					icon: getMarkerIcon(site.status),
					animation: google.maps.Animation.DROP
				});
				
				// Create info window
				const infoWindow = new google.maps.InfoWindow({
					content: `
						<div style="padding: 8px; max-width: 250px;">
							<h3 style="font-weight: 600; font-size: 16px; margin: 0 0 4px 0;">${site.name}</h3>
							<p style="font-size: 13px; color: #666; margin: 0 0 8px 0;">${site.organization}</p>
							<p style="font-size: 12px; margin: 0;">
								<span style="display: inline-block; padding: 2px 8px; border-radius: 12px; background: ${
									site.status === 'available' ? '#10b981' :
									site.status === 'limited' ? '#f59e0b' : '#ef4444'
								}; color: white; font-weight: 500;">
									${site.status === 'available' ? 'Available' : 
									  site.status === 'limited' ? 'Limited' : 'Full'}
								</span>
							</p>
							<a 
								href="/sites/${site.slug}" 
								style="display: inline-block; margin-top: 8px; color: #2563eb; text-decoration: none; font-weight: 500; font-size: 13px;"
							>
								View Details →
							</a>
						</div>
					`
				});
				
				// Add click listener
				marker.addListener('click', () => {
					infoWindow.open(map, marker);
					if (onMarkerClick) {
						onMarkerClick(site);
					}
				});
				
				markers.push(marker);
				bounds.extend(marker.getPosition()!);
			});
			
			// Fit map to show all markers
			if (sites.length > 1) {
				map.fitBounds(bounds);
			}
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
