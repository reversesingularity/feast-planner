import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

// Redirect legacy routes from the original multi-site trip planner.
// These routes no longer exist — anyone with old bookmarks is redirected gracefully.
const DASHBOARD_REDIRECTS = ['/my-trips', '/profile'];
const HOME_REDIRECTS = ['/sites', '/utilities', '/buttons', '/components', '/forms'];

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;

	if (DASHBOARD_REDIRECTS.some((prefix) => path === prefix || path.startsWith(prefix + '/'))) {
		throw redirect(302, '/dashboard');
	}

	if (HOME_REDIRECTS.some((prefix) => path === prefix || path.startsWith(prefix + '/'))) {
		throw redirect(302, '/');
	}

	return resolve(event);
};
