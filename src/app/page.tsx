import Link from 'next/link';

import cookie from 'cookie';
import jwt from 'jsonwebtoken';

// ;cant; // import cookie from 'cookie';
// ;cant; // import jwt from 'jsonwebtoken';
// ;cant; // import { NextRequest, NextResponse } from 'next/server';
// ;cant; // import * as http from 'http';
// ;cant; //
// ;cant; // const secret = 'my-secret';
// ;cant; //
// ;cant; // export function setSession(res: http.ServerResponse, session: any) {
// ;cant; //   const token = jwt.sign(session, secret);
// ;cant; //   const cookieValue = cookie.serialize('session', token, {
// ;cant; //     httpOnly: true,
// ;cant; //     secure: process.env.NODE_ENV === 'production',
// ;cant; //     maxAge: 60 * 60 * 24 * 7, // 1 week
// ;cant; //     sameSite: 'strict',
// ;cant; //     path: '/',
// ;cant; //   });
// ;cant; //   res.setHeader('Set-Cookie', cookieValue);
// ;cant; // }
// ;cant; //
// ;cant; // export function getSession(req: http.IncomingMessage) {
// ;cant; //   const cookies = cookie.parse(req.headers.cookie || '');
// ;cant; //   const token = cookies.session;
// ;cant; //   if (!token) return null;
// ;cant; //   try {
// ;cant; //     return jwt.verify(token, secret);
// ;cant; //   } catch (err) {
// ;cant; //     return null;
// ;cant; //   }
// ;cant; // }
// ;cant; //
// ;cant; // export function destroySession(res: http.ServerResponse) {
// ;cant; //   res.setHeader(
// ;cant; //     'Set-Cookie',
// ;cant; //     cookie.serialize('session', '', {
// ;cant; //       httpOnly: true,
// ;cant; //       secure: process.env.NODE_ENV === 'production',
// ;cant; //       expires: new Date(0),
// ;cant; //       sameSite: 'strict',
// ;cant; //       path: '/',
// ;cant; //     })
// ;cant; //   );
// ;cant; // }
// ;cant;
// ;cant; //https://xerosource.com/best-way-to-manage-sessions-in-nextjs/
// ;cant;
// ;cant; // seems related posts: \
// ;cant; // https://github.com/vercel/next.js/discussions/42732 Access Request Object in New App Directory Page Route #42732 \
// ;cant; // https://www.reddit.com/r/nextjs/comments/yef3xc/nextjs_13_how_do_you_access_the_request_object/ \
// ;cant; // seems not possible idk why
// ;cant;
// >> // just gg, cuz no access to req -- cannot access cookie to determine (though .. dk client server side pb aga .. )

export default function Home() {
  return (
    <>
      <div>Home</div>
      <Link href="tool/codeCommentRemove">codeCommentRemove</Link>
      {/* <button onClick={() => {}}></button>
      Error: Event handlers cannot be passed to Client Component props.
      */}
    </>
  );
}

