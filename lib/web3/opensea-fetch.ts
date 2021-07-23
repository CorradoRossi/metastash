import { OPENSEA_BASE_URL, OPENSEA_ASSETS } from '@lib/constants';

export async function fetchData(account: string) {
  const url = `${
    OPENSEA_BASE_URL + OPENSEA_ASSETS
  }?owner=${account}&order_direction=desc&offset=0&limit=50`;
  const options = { method: 'GET' };
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json();
  return response;
}
