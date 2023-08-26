import NextAuth from 'next-auth';
import { options } from './options';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
//need_check dk

// ;[route handler]; []
// ;[route handler]; Internally, NextAuth.js detects that it is being initialized in a Route Handler (by understanding that it is passed a Web Request instance), and will return a handler that returns a Response instance.
// ;[route handler]; <>
// ;[route handler]; https://next-auth.js.org/configuration/initialization#route-handlers-app
