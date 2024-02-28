'use client'
import React from 'react';
import Header from '@/components/header.jsx';
import About from '@/components/about.jsx';
import Portfolio from '@/components/portfolio.jsx'
// import type { AppProps } from 'next/app';
// import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <>
  <Header />
      <main>
        <About />
        <Portfolio />
      </main>
    </>
  );
}
