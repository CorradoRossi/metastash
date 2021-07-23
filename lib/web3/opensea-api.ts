import axios from 'axios';
import { parseAccountUniqueTokens } from '../parsers/uniqueTokens';
import {
  OPENSEA_BASE_URL,
  OPENSEA_ASSETS,
  UNIQUE_TOKENS_LIMIT_PER_PAGE,
  UNIQUE_TOKENS_LIMIT_TOTAL
} from '@lib/constants';

const api = axios.create({
  headers: {
    Accept: 'application/json'
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
    console.log(data, 'local to api');
    return parseAccountUniqueTokens(data);
  } catch (error) {
    console.log('Error getting unique tokens', error);
    throw error;
  }
};
