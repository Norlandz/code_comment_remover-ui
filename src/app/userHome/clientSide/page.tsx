'use client';
// Remember you must use an AuthProvider for client components to useSession

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import Link from 'next/link';

export default function ClientPage() {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/api/auth/signin?callbackUrl=/client');
  //   },
  // });

  // const sessionData = useSession({
  //   required: true,
  // });

  const sessionData = useSession();
  const session = sessionData.data;

  return (
    <div>
      {session ? (
        <>
          <div>authorized access</div>
          <div>user: {JSON.stringify(session.user)}</div>
          <Link href="/api/auth/signout">/api/auth/signout</Link>
        </>
      ) : (
        <>
          <div>forbidden access</div>
          <Link href="/api/auth/signin">/api/auth/signin</Link>
          <br />
          <Link href="/authPage/authCustom/register">/authPage/authCustom/register</Link>
        </>
      )}
    </div>
  );
}
