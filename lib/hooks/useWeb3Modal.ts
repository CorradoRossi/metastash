import { INFURA_ID, NETWORK_NAME } from '@lib/constants';
import { useCallback, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

const useWeb3Modal = (config = {}) => {
  const [provider, setProvider]: any = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME }: any = config;

  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId
        }
      }
    }
  });

  const loadWeb3Modal = useCallback(async () => {
    if (web3Modal.cachedProvider) {
      const cached = await web3Modal.connect();
      return setProvider(new Web3Provider(cached));
    }
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
      window.ethereum.on('disconnect', (error: any) => null);
    },
    [web3Modal]
  );

  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
};

export default useWeb3Modal;
