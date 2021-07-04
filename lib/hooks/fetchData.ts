import { useWeb3React } from '@web3-react/core';
import { OPENSEA_BASE_URL, OPENSEA_ASSETS } from '@lib/constants';

const fetchAcctData = () => {
  const { account } = useWeb3React();
  async function fetchData() {
    const url = `${
      OPENSEA_BASE_URL + OPENSEA_ASSETS
    }?owner=${account}&order_direction=desc&offset=0&limit=100`;
    const options = { method: 'GET' };
    const fetcher = await window.fetch(url, options);
    const response = await fetcher.json();
    return response;
  }
  return fetchData();
};

export default fetchAcctData;
