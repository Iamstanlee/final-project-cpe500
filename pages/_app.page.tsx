import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Scaffold from "@/components/scaffold";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "@/hooks/use-auth";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={cn([rubik.className, "m-auto"])}>
      <Head>
        <title>wano finance | Dashboard</title>
        <meta
          name="description"
          content="web3 payment infrastructure with Enhanced payment experience for 20M+ users in web3"
        />
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
