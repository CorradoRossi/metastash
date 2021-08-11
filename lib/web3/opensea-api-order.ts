import { UNIQUE_TOKENS_LIMIT_PER_PAGE, OPENSEA_API_KEY } from '@lib/constants';

export const apiGetAccountUniqueOrders = async (address: any, page: any) => {
  const offset = page * UNIQUE_TOKENS_LIMIT_PER_PAGE;
  const options = { method: 'GET', headers: { 'X-API-KEY': OPENSEA_API_KEY } };
  const url = `https://api.opensea.io/wyvern/v1/orders?owner=${address}&bundled=false&include_bundled=false&include_invalid=false&limit=${UNIQUE_TOKENS_LIMIT_PER_PAGE}&offset=${offset}&order_by=created_date&order_direction=desc`;
  const data = await window.fetch(url, options);
  const response = await data.json().catch(() => {
    console.log(`Failed to fetch orders`);
    throw new Error('Failed to fetch orders');
  });
  return response;
};
