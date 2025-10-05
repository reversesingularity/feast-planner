/**
 * AWS Amplify Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to AWS Console → Cognito
 * 2. Create a User Pool with these settings:
 *    - Sign-in options: Email
 *    - Password policy: Default
 *    - MFA: Optional
 *    - Email verification: Required
 * 3. Create an App Client (no client secret)
 * 4. Replace the placeholders below with your actual values
 */

export const amplifyConfig = {
	Auth: {
		Cognito: {
			userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || 'us-east-1_XXXXXXXXX',
			userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
			region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
			loginWith: {
				email: true
			},
			signUpVerificationMethod: 'code',
			userAttributes: {
				email: {
					required: true
				},
				name: {
					required: true
				}
			},
			passwordFormat: {
				minLength: 8,
				requireLowercase: true,
				requireUppercase: true,
				requireNumbers: true,
				requireSpecialCharacters: false
			}
		}
	}
};
