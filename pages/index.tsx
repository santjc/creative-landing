import Head from 'next/head';

import Overlay from '@components/Overlay';

export default function Home() {
  return (
    <>
      <Head>
        <title>santco.site</title>
      </Head>
      <Overlay>
        <div>Hello</div>
      </Overlay>
    </>
  );
}
