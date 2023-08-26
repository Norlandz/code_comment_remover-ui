import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';

import Link from 'next/link';

export default async function Index() {
  const session = await getServerSession(options);

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
