import Link from 'next/link';
import React from 'react';

export default function Home() {
  // const [count, set_count] = React.useState<number>(0);

  return (
    <>
      <div>Home</div>
      <Link href="v0.1/user/tools/codeCommentRemove">codeCommentRemove</Link>
      {/* <button onClick={() => set_count(count + 1)}>count {count}</button> */}
      {/* <a href="tools/codeCommentRemove">Eslint error here?</a> */}
    </>
  );
}
