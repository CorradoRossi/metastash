import axios from 'axios';
import { parseAccountUniqueTokens } from '../utils/uniqueTokens';
import {
  OPENSEA_BASE_URL,
  OPENSEA_ASSETS,
  UNIQUE_TOKENS_LIMIT_PER_PAGE,
  UNIQUE_TOKENS_LIMIT_TOTAL,
  OPENSEA_API_KEY
} from '@lib/constants';

const api = axios.create({
  headers: {
    Accept: 'application/json',
    'X-API-KEY': OPENSEA_API_KEY,
  },
  timeout: 20000
});

export const apiGetAccountUniqueTokens = async (address: any, page: any) => {
  try {
    const offset = page * UNIQUE_TOKENS_LIMIT_PER_PAGE;
    const url = `${
      OPENSEA_BASE_URL + OPENSEA_ASSETS
    }?exclude_currencies=true&owner=${address}&limit=${UNIQUE_TOKENS_LIMIT_PER_PAGE}&offset=${offset}`;
    const data = await api.get(url);
    return parseAccountUniqueTokens(data);
  } catch (error) {
    console.log('Error getting unique tokens', error);
    throw error;
  }
};
