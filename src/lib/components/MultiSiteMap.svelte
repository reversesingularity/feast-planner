<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	
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
		sites,
		height = '500px',
		zoom = 4,
		class: className = '',
		onMarkerClick
	}: Props = $props();
	
	let mapContainer: HTMLDivElement;
	let map: L.Map | null = null;
	let markers: L.Marker[] = [];
	
	// Get marker color based on status
	function getMarkerColor(status: string): string {
		switch (status) {
			case 'available':
				return '#10b981'; // green
			case 'limited':
				return '#f59e0b'; // yellow
			case 'full':
				return '#ef4444'; // red
			default:
				return '#3b82f6'; // blue
		}
	}
	
	// Get status text
	function getStatusText(status: string): string {
		switch (status) {
			case 'available':
				return 'Available';
			case 'limited':
				return 'Limited';
			case 'full':
				return 'Full';
			default:
				return 'Unknown';
		}
	}
	
	// Create custom marker icon
	function createMarkerIcon(status: string): L.DivIcon {
		const color = getMarkerColor(status);
		return L.divIcon({
			html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
			className: 'custom-marker',
			iconSize: [30, 30],
			iconAnchor: [15, 30],
			popupAnchor: [0, -30]
		});
	}
	
	onMount(async () => {
		try {
			// Calculate center point (average of all coordinates)
			const avgLat = sites.reduce((sum, site) => sum + site.lat, 0) / sites.length;
			const avgLng = sites.reduce((sum, site) => sum + site.lng, 0) / sites.length;
			
			// Initialize map
			map = L.map(mapContainer).setView([avgLat, avgLng], zoom);
			
			// Add OpenStreetMap tiles
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				maxZoom: 19
			}).addTo(map);
			
			// Create bounds to fit all markers
			const bounds = L.latLngBounds([]);
			
			// Add markers for each site
			sites.forEach((site) => {
				const marker = L.marker([site.lat, site.lng], {
					icon: createMarkerIcon(site.status)
				}).addTo(map!);
				
				// Create popup content
				const popupContent = `
					<div style="padding: 8px; max-width: 250px;">
						<h3 style="font-weight: 600; font-size: 16px; margin: 0 0 4px 0;">${site.name}</h3>
						<p style="font-size: 13px; color: #666; margin: 0 0 8px 0;">${site.organization}</p>
						<p style="font-size: 12px; margin: 0 0 8px 0;">
							<span style="display: inline-block; padding: 2px 8px; border-radius: 12px; background: ${getMarkerColor(site.status)}; color: white; font-weight: 500;">
								${getStatusText(site.status)}
							</span>
						</p>
						<a 
							href="/sites/${site.slug}" 
							style="display: inline-block; color: #2563eb; text-decoration: none; font-weight: 500; font-size: 13px;"
						>
							View Details →
						</a>
					</div>
				`;
				
				marker.bindPopup(popupContent);
				
				// Add click listener
				marker.on('click', () => {
					if (onMarkerClick) {
						onMarkerClick(site);
					}
				});
				
				markers.push(marker);
				bounds.extend([site.lat, site.lng]);
			});
			
			// Fit map to show all markers
			if (sites.length > 1) {
				map.fitBounds(bounds, { padding: [50, 50] });
			}
			
			// Cleanup on destroy
			return () => {
				if (map) {
					map.remove();
				}
			};
		} catch (error) {
			console.error('Error loading Leaflet map:', error);
		}
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
