import axios from 'axios';
import { parseAccountUniqueTokens } from '../parsers/uniqueTokens';

export const UNIQUE_TOKENS_LIMIT_PER_PAGE = 50;
export const UNIQUE_TOKENS_LIMIT_TOTAL = 2000;

const api = axios.create({
  headers: {
    Accept: 'application/json'
  },
  timeout: 20000 // 20 secs
});

export const apiGetAccountUniqueTokens = async (address: any, page: any) => {
  try {
    const offset = page * UNIQUE_TOKENS_LIMIT_PER_PAGE;
    const url = `https://api.opensea.io/api/v1/assets?exclude_currencies=true&owner=${address}&limit=${UNIQUE_TOKENS_LIMIT_PER_PAGE}&offset=${offset}`;
    const data = await api.get(url);
    console.log(data, 'local to api');
    return parseAccountUniqueTokens(data);
  } catch (error) {
    console.log('Error getting unique tokens', error);
    throw error;
  }
};
