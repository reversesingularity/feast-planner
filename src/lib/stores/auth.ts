import { writable, derived } from 'svelte/store';
import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { amplifyConfig } from '$lib/config/amplify';

// Initialize Amplify
Amplify.configure(amplifyConfig);

// Auth state store
interface AuthState {
	user: any | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

const createAuthStore = () => {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		isAuthenticated: false,
		isLoading: true,
		error: null
	});

	return {
		subscribe,
		
		// Initialize auth state (call on app load)
		initialize: async () => {
			try {
				const user = await getCurrentUser();
				const attributes = await fetchUserAttributes();
				update(state => ({
					...state,
					user: { ...user, attributes },
					isAuthenticated: true,
					isLoading: false,
					error: null
				}));
			} catch (error) {
				update(state => ({
					...state,
					user: null,
					isAuthenticated: false,
					isLoading: false,
					error: null
				}));
			}
		},

		// Sign in
		signIn: async (email: string, password: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));
			try {
				const { isSignedIn } = await signIn({ username: email, password });
				if (isSignedIn) {
					const user = await getCurrentUser();
					const attributes = await fetchUserAttributes();
					update(state => ({
						...state,
						user: { ...user, attributes },
						isAuthenticated: true,
						isLoading: false,
						error: null
					}));
					return { success: true };
				}
				// isSignedIn is false — Cognito requires an additional challenge step.
				// Reset loading so the UI doesn't hang indefinitely.
				update(state => ({ ...state, isLoading: false }));
				return { success: false, error: 'Sign-in could not be completed. Please try again.' };
			} catch (error: any) {
				update(state => ({
					...state,
					isLoading: false,
					error: error.message || 'Failed to sign in'
				}));
				// Surface a clear flag when the account exists but hasn't been verified yet.
				const needsConfirmation = error.name === 'UserNotConfirmedException';
				return { success: false, error: error.message, needsConfirmation };
			}
		},

		// Sign up
		signUp: async (email: string, password: string, name: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));
			try {
				const { isSignUpComplete, userId, nextStep } = await signUp({
					username: email,
					password,
					options: {
						userAttributes: {
							email,
							name
						}
					}
				});
				update(state => ({ ...state, isLoading: false, error: null }));
				return { success: true, isSignUpComplete, userId, nextStep };
			} catch (error: any) {
				update(state => ({
					...state,
					isLoading: false,
					error: error.message || 'Failed to sign up'
				}));

				// An account with this email already exists in Cognito.
				// Try to resend the confirmation code — if that succeeds the account
				// is still UNCONFIRMED and the user just needs to verify their email.
				// If it fails the account is already confirmed and the user should sign in.
				if (error.name === 'UsernameExistsException') {
					try {
						await resendSignUpCode({ username: email });
						return { success: false, error: error.message, needsConfirmation: true };
					} catch {
						// resendSignUpCode throws when the account is already confirmed.
						return { success: false, error: error.message, alreadyConfirmed: true };
					}
				}

				return { success: false, error: error.message };
			}
		},

		// Confirm sign up (email verification)
		confirmSignUp: async (email: string, code: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));
			try {
				const { isSignUpComplete } = await confirmSignUp({
					username: email,
					confirmationCode: code
				});
				update(state => ({ ...state, isLoading: false, error: null }));
				return { success: true, isSignUpComplete };
			} catch (error: any) {
				update(state => ({
					...state,
					isLoading: false,
					error: error.message || 'Failed to confirm sign up'
				}));
				return { success: false, error: error.message };
			}
		},

		// Resend confirmation code
		resendConfirmationCode: async (email: string) => {
			try {
				await resendSignUpCode({ username: email });
				return { success: true };
			} catch (error: any) {
				return { success: false, error: error.message };
			}
		},

		// Reset password
		resetPassword: async (email: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));
			try {
				const { nextStep } = await resetPassword({ username: email });
				update(state => ({ ...state, isLoading: false, error: null }));
				return { success: true, nextStep };
			} catch (error: any) {
				update(state => ({
					...state,
					isLoading: false,
					error: error.message || 'Failed to reset password'
				}));
				// Cognito throws NotAuthorizedException when the account is unconfirmed.
				// Surface a dedicated flag so the UI can guide the user to verify first.
				const needsConfirmation =
					error.name === 'NotAuthorizedException' ||
					error.name === 'InvalidParameterException';
				return { success: false, error: error.message, needsConfirmation };
			}
		},

		// Confirm reset password
		confirmResetPassword: async (email: string, code: string, newPassword: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));
			try {
				await confirmResetPassword({
					username: email,
					confirmationCode: code,
					newPassword
				});
				update(state => ({ ...state, isLoading: false, error: null }));
				return { success: true };
			} catch (error: any) {
				update(state => ({
					...state,
					isLoading: false,
					error: error.message || 'Failed to confirm password reset'
				}));
				return { success: false, error: error.message };
			}
		},

		// Sign out
		signOut: async () => {
			update(state => ({ ...state, isLoading: true, error: null }));
			try {
				await signOut();
				set({
					user: null,
					isAuthenticated: false,
					isLoading: false,
					error: null
				});
				return { success: true };
			} catch (error: any) {
				update(state => ({
					...state,
					isLoading: false,
					error: error.message || 'Failed to sign out'
				}));
				return { success: false, error: error.message };
			}
		},

		// Clear error
		clearError: () => {
			update(state => ({ ...state, error: null }));
		}
	};
};

export const authStore = createAuthStore();

// Derived stores for convenience
export const user = derived(authStore, $auth => $auth.user);
export const isAuthenticated = derived(authStore, $auth => $auth.isAuthenticated);
export const isLoading = derived(authStore, $auth => $auth.isLoading);
export const authError = derived(authStore, $auth => $auth.error);
