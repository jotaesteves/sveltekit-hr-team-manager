import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';

// Create i18n with error handling
export const i18n = createI18n(runtime);
