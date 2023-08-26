// 'use server'
// // dfk . no res no nothing. .. just not calling the damn server dfk why

// import { prisma } from '@/lib/prisma';
// import Loki from 'lokijs';
import { dbLoki, tabUser } from '@/run/indexModule.mjs';

import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // try {
  const { username, email, password } = (await req.json()) as {
    username: string;
    email: string;
    password: string;
  };

  // const user_existing = tabUser.findOne({ username });
  const respond = await fetch(`http://localhost:3000/findUser`, {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user_existing = await respond.json();

  if (user_existing !== null) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'username already existsed',
      }),
      { status: 409 }
    );
  }

  // const hashed_password = await hash(password, 12);
  const hashed_password = password;

  // const user = await prisma.user.create({
  //   data: {
  //     username,
  //     email: email.toLowerCase(),
  //     password: hashed_password,
  //   },
  // });

  // const user = tabUser.insert({
  //   username,
  //   email: email.toLowerCase(),
  //   password: hashed_password,
  // });

  const respond2 = await fetch(`http://localhost:3000/putUser`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      email: email.toLowerCase(),
      password: hashed_password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = await respond2.json();

  // ok must return else error 
  return NextResponse.json({
    user: {
      username: user.username,
      email: user.email,
    },
  });
  // } catch (error: any) {
  //   return new NextResponse(
  //     JSON.stringify({
  //       status: 'error',
  //       message: error.message,
  //     }),
  //     { status: 500 }
  //   );
  // }
}
