import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { cn } from '@/lib/utils';
import { AuthContextProvider } from '@/hooks/use-auth';
import Scaffold from '@/components/scaffold';

import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: '400',
});

export type AppPage<P = {}, IP = P> = NextPage<P, IP> & {
  removeDefaultScaffold?: boolean;
  isNotAuthProtected?: boolean;
};

type Props = AppProps & {
  Component: AppPage;
};

export default function App({ Component, pageProps }: Props) {
  console.log(Component.removeDefaultScaffold);
  return (
    <main className={cn([poppins.className, 'm-auto'])}>
      <Head>
        <title>500lvl Project | Dashboard</title>
        <meta name="description" content="500lvl Project" />
        <link rel="icon" href="/favicon.png"></link>
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      {Component.isNotAuthProtected ? (
        <Component {...pageProps} />
      ) : (
        <AuthContextProvider>
          {Component.removeDefaultScaffold ? (
            <Component {...pageProps} />
          ) : (
            <Scaffold>
              <Component {...pageProps} />
            </Scaffold>
          )}
          <ToastContainer hideProgressBar />
        </AuthContextProvider>
      )}
    </main>
  );
}
