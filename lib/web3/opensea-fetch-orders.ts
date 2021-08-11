import { OPENSEA_API_KEY } from '@lib/constants';

export async function fetchOrders(account: string) {
  const url = `https://api.opensea.io/wyvern/v1/orders?owner=${account}&bundled=false&include_bundled=false&include_invalid=false&limit=20&offset=0&order_by=created_date&order_direction=desc`;
  const options = { method: 'GET', headers: { 'X-API-KEY': OPENSEA_API_KEY } };
  const fetcher = await window.fetch(url, options);
  const response = await fetcher.json().catch(() => {
    console.log(`Failed to fetch orders`);
    throw new Error('Failed to fetch orders');
  });
  return response;
}
