import axios from 'axios';
import { OPENSEA_BASE_URL, UNIQUE_TOKENS_LIMIT_PER_PAGE, OPENSEA_API_KEY } from '@lib/constants';

const api = axios.create({
  headers: {
    Accept: 'application/json',
    'X-API-KEY': OPENSEA_API_KEY,
  },
  timeout: 20000
});

export const fetchEventData = async (address: any, page: any) => {
  try {
    const offset = page * UNIQUE_TOKENS_LIMIT_PER_PAGE;
    const url = `${OPENSEA_BASE_URL}events?account_address=${address}&only_opensea=false&offset=${offset}&limit=${UNIQUE_TOKENS_LIMIT_PER_PAGE}`;
    const data = await api.get(url);
    return data;
  } catch (error) {
    console.log('Error getting events', error);
    throw error;
  }
};

export const fetchBidEnteredData = async (page: any) => {
  try {
    const offset = page * UNIQUE_TOKENS_LIMIT_PER_PAGE;
    const url = `${OPENSEA_BASE_URL}events?event_type=bid_entered&only_opensea=false&offset=${offset}&limit=${UNIQUE_TOKENS_LIMIT_PER_PAGE}`;
    const data = await api.get(url);
    return data;
  } catch (error) {
    console.log('Error getting bid data', error);
    throw error;
  }
};
