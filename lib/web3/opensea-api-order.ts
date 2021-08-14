import axios from 'axios';
import { UNIQUE_TOKENS_LIMIT_PER_PAGE, OPENSEA_API_KEY } from '@lib/constants';

const api = axios.create({
  headers: {
    Accept: 'application/json',
    'X-API-KEY': OPENSEA_API_KEY
  },
  timeout: 20000
});

export const apiGetAccountUniqueOrders = async (address: any, page: any) => {
  try {
    const offset = page * UNIQUE_TOKENS_LIMIT_PER_PAGE;
    const url = `https://api.opensea.io/wyvern/v1/orders?owner=${address}&bundled=false&include_bundled=false&include_invalid=false&side=0&limit=${UNIQUE_TOKENS_LIMIT_PER_PAGE}&offset=${offset}&order_by=created_date&order_direction=desc`;
    const data = await api.get(url);
    return data.data.orders;
  } catch (error) {
    console.log('Error getting unique tokens', error);
    throw error;
  }
};
