import { useWeb3React } from '@web3-react/core';
import { parseBalance } from '../web3/web3';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSwrData';
import useSWR from 'swr';

const getETHBalance = (library: any) => {
  return async (address: any, _: any) => {
    return library.getBalance(address).then((balance: any) => parseBalance(balance));
  };
};

export const useETHBalance = (address: any, suspense = false) => {
  const { library, chainId } = useWeb3React();
  const shouldFetch = typeof address === 'string' && !!library;
  const result = useSWR(
    shouldFetch ? [address, chainId, 'ETHBalance'] : null,
    getETHBalance(library),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
};
