import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import KeycloakProvider from 'next-auth/providers/keycloak';
// import { dbLoki, tabUser } from '@/run/indexModule.mjs';

export const options: NextAuthOptions = {
  // https://next-auth.js.org/configuration/options
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        if (credentials === undefined) {
          throw new TypeError();
        }

        // ;archived;        // // This is where you need to retrieve user data to verify with credentials
        // ;archived;        // // Docs: https://next-auth.js.org/configuration/providers/credentials
        // ;archived;        // const user = { id: '42', name: 'Dave', password: 'pw' };

        // !~~~//?,think,aga Am i on Server side or Client Side -- mix design 

        // ;[add http full url]; []
        // ;[add http full url]; However, in Node.js, where your server-side fetch is happening, there is no similar behavior. It expects a fully defined URL
        // ;[add http full url]; <>
        // ;[add http full url]; https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati
        // ;[add http full url]; const respond = await fetch(`/findUser`, {
        const respond = await fetch(`http://localhost:3000/findUser`, {
          // ;[use Post with body]; method: 'GET', // /api/auth/error?error=Request%20with%20GET%2FHEAD%20method%20cannot%20have%20body.
          method: 'POST',
          body: JSON.stringify(credentials),
          // body: credentials.username,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const user = await respond.json();

        if (user === null) {
          throw new TypeError('no such user');
        }

        if (credentials.username === user.username && credentials.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
      // ;[ex, return]; []
      // ;[ex, return]; From the documentation ([https://next-auth.js.org/providers/credentials#example](https://next-auth.js.org/providers/credentials#example))
      // ;[ex, return];
      // ;[ex, return]; ```javascript
      // ;[ex, return]; async authorize(credentials, req) {
      // ;[ex, return];   // Add logic here to look up the user from the credentials supplied
      // ;[ex, return];   const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // ;[ex, return];
      // ;[ex, return];   if (user) {
      // ;[ex, return];     // Any object returned will be saved in `user` property of the JWT
      // ;[ex, return];     return user
      // ;[ex, return];   } else {
      // ;[ex, return];     // If you return null or false then the credentials will be rejected
      // ;[ex, return];     return null
      // ;[ex, return];     // You can also Reject this callback with an Error or with a URL:
      // ;[ex, return];     // throw new Error('error message') // Redirect to error page
      // ;[ex, return];     // throw '/path/to/redirect'        // Redirect to a URL
      // ;[ex, return];   }
      // ;[ex, return]; }
      // ;[ex, return];
      // ;[ex, return]; ```
      // ;[ex, return];
      // ;[ex, return]; You are not currently returning a user or `null` from the `authorize` callback.
      // ;[ex, return]; <>
      // ;[ex, return]; https://stackoverflow.com/questions/68142134/next-auth-signin-with-credentials-is-not-working-in-nextjs
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  // // @: use default is good
  // pages: {
  //   signIn: '/signin'
  // }
  // session:
};
