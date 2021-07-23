import { toLower } from 'lodash';

const storage = localStorage;

const UNIQUE_TOKENS = 'uniquetokens';

export const getKey = (prefix: any, accountAddress: any) => `${prefix}-${toLower(accountAddress)}`;

export const saveLocal = async (key: any = '', data: any = {}) => {
  try {
    await storage.save({
      data,
      expires: null,
      key
    });
  } catch (error) {
    console.log('Storage: error saving to local for key', key);
  }
};

export const getLocal = async (key: any = '') => {
  try {
    const result = await storage.load({
      autoSync: false,
      key,
      syncInBackground: false
    });
    if (result) {
      return result;
    }
    if (result) {
      removeLocal(key);
      return null;
    }
    return null;
  } catch (error) {
    console.log('Storage: error getting from local for key', key);
    return null;
  }
};

export const removeLocal = (key: any = '') => {
  try {
    storage.remove({ key });
  } catch (error) {
    console.log('Storage: error removing local with key', key);
  }
};

export const getGlobal = async (key: any, emptyState: any = []) => {
  const result = await getLocal(key);
  return result ? result.data : emptyState;
};

export const saveGlobal = (key: any, data: any) => saveLocal(key, { data });

export const getAccountLocal = async (prefix: any, accountAddress: any, emptyState: any = []) => {
  const key = getKey(prefix, accountAddress);
  const result = await getLocal(key);
  return result ? result.data : emptyState;
};

export const saveAccountLocal = (prefix: any, data: any, accountAddress: any) =>
  saveLocal(getKey(prefix, accountAddress), { data });

export const removeAccountLocal = (prefix: any, accountAddress: any) => {
  const key = getKey(prefix, accountAddress);
  removeLocal(key);
};

export const getUniqueTokens = (accountAddress: any) =>
  getAccountLocal(UNIQUE_TOKENS, accountAddress, []);

export const saveUniqueTokens = (uniqueTokens: any, accountAddress: any) =>
  saveAccountLocal(UNIQUE_TOKENS, uniqueTokens, accountAddress);
