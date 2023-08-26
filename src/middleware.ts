// Without a defined matcher, this one line applies next-auth to the entire project
export { default } from 'next-auth/middleware';

// ;ref; Applies next-auth only to matching routes - can be regex
// ;ref; Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/randomTest/secureMsg'] };
// userHome is secured individually, not globally here
