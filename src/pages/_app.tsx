import Layout from '../components/Layout';
import 'src/styles/globals.css';
import React, { useEffect } from 'react';
import { useAuth } from '../lib/store';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const auth: string | null = localStorage.getItem('auth');
    if (auth) {
      useAuth.getState().setAuth(JSON.parse(auth));
    }
  }, []);

  return (
    <>
      {/* <Head>
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          crossOrigin=''
        />
        <script
          src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
          crossOrigin=''
        ></script>
      </Head> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
