import { createEmotionCache } from '@/utils/emotion';
import type { AppProps } from 'next/app';
import { EmotionCache, CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { ThemeProvider } from '@/theme/provider';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

export default function App(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
