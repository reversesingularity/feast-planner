/**
 * AWS Amplify Configuration
 * 
 * Includes Cognito User Pool for authentication and Identity Pool for AWS resource access
 */

export const amplifyConfig = {
	Auth: {
		Cognito: {
			userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || 'us-east-1_XXXXXXXXX',
			userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
			identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID || 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
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
