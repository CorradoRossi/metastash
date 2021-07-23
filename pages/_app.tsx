import '@styles/global.css';
import '@styles/nprogress.css';
import '@styles/chrome-bug.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SSRProvider, OverlayProvider } from 'react-aria';
import NProgress from '@components/loading/nprogress';
import ResizeHandler from '@components/loading/resize-handler';
import { Web3ReactProvider } from '@web3-react/core';
import Web3Manager from '@lib/web3/web3manager';
import { Web3Provider } from '@ethersproject/providers';
import { useAppState } from '../state/state';

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

const App = ({ Component, pageProps }: AppProps) => {
  const { setLibrary } = useAppState();

  useEffect(() => {
    document.body.classList?.remove('loading');
    setLibrary(getLibrary);
  }, []);

  return (
    <SSRProvider>
      <OverlayProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3Manager>
            <Component {...pageProps} />
          </Web3Manager>
          <ResizeHandler />
          <NProgress />
        </Web3ReactProvider>
      </OverlayProvider>
    </SSRProvider>
  );
};

export default App;
