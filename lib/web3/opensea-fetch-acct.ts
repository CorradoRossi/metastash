import { OPENSEA_BASE_URL } from '@lib/constants';

export async function fetchAcct(account: string) {
  const url = `${OPENSEA_BASE_URL}account/${account}`;
  const options = { method: 'GET' };
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json();
  return response;
}
