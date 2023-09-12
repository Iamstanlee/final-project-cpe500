import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Scaffold from '@/components/scaffold';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthContextProvider } from '@/hooks/use-auth';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={cn([poppins.className, 'm-auto'])}>
      <Head>
        <title>500lvl Project | Dashboard</title>
        <meta name="description" content="500lvl Project" />
        <link rel="icon" href="/favicon.png"></link>
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      <AuthContextProvider>
        <Scaffold>
          <Component {...pageProps} />
        </Scaffold>
      </AuthContextProvider>
    </main>
  );
}
