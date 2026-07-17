import { AuthConfig } from 'angular-oauth2-oidc';

export const auth: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '900837367731-uqc5kkstvhkjm4jpauke4enc3uiu7mtt.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
}