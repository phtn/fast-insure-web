
#### Ways to authenticate

##### This library provides a variety of ways to authenticate to your Google services.

Application Default Credentials - Use Application Default Credentials when you use a single identity for all users in your application. Especially useful for applications running on Google Cloud. Application Default Credentials also support workload identity federation to access Google Cloud resources from non-Google Cloud platforms.


OAuth 2 - Use OAuth2 when you need to perform actions on behalf of the end user.

JSON Web Tokens - Use JWT when you are using a single identity for all users. Especially useful for server->server or server->API communication.

Google Compute - Directly use a service account on Google Cloud Platform. Useful for server->server or server->API communication.

Workload Identity Federation - Use workload identity federation to access Google Cloud resources from Amazon Web Services (AWS), Microsoft Azure or any identity provider that supports OpenID Connect (OIDC).

Workforce Identity Federation - Use workforce identity federation to access Google Cloud resources using an external identity provider (IdP) to authenticate and authorize a workforce—a group of users, such as employees, partners, and contractors—using IAM, so that the users can access Google Cloud services.

Impersonated Credentials Client - access protected resources on behalf of another service account.

Downscoped Client - Use Downscoped Client with Credential Access Boundary to generate a short-lived credential with downscoped, restricted IAM permissions that can use for Cloud Storage.
