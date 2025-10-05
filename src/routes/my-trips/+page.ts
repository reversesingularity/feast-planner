import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './';

export const load: PageLoad = async ({ parent }) => {
// This will be checked client-side via the auth store
return {};
};
