import { OPENSEA_BASE_URL, OPENSEA_API_KEY } from '@lib/constants';

export async function fetchAcct(account: string) {
  const url = `${OPENSEA_BASE_URL}account/${account}`;
  const options = { method: 'GET', headers: {'X-API-KEY': OPENSEA_API_KEY}};
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json();
  return response;
}
