import { concat, isEmpty, without } from 'lodash';
import { apiGetAccountUniqueTokens } from './opensea-api';
import { UNIQUE_TOKENS_LIMIT_PER_PAGE, UNIQUE_TOKENS_LIMIT_TOTAL } from '@lib/constants';
import { dedupeAssetsWithFamilies, getFamilies } from '../utils/uniqueTokens';
let uniqueTokensHandle = null;

import { getUniqueTokens, saveUniqueTokens } from '../utils/localStorage';
let UNIQUE_TOKENS_GET_UNIQUE_TOKENS_REQUEST = 'UNIQUE_TOKENS_GET_UNIQUE_TOKENS_REQUEST';
let UNIQUE_TOKENS_CLEAR_STATE_SHOWCASE = 'UNIQUE_TOKENS_CLEAR_STATE_SHOWCASE';
let UNIQUE_TOKENS_GET_UNIQUE_TOKENS_SUCCESS = 'UNIQUE_TOKENS_GET_UNIQUE_TOKENS_SUCCESS';
let UNIQUE_TOKENS_GET_UNIQUE_TOKENS_FAILURE = 'UNIQUE_TOKENS_GET_UNIQUE_TOKENS_FAILURE';

export const fetchUniqueTokens = (showcaseAddress: any) => async (dispatch: any, getState: any) => {
  dispatch({
    showcase: !!showcaseAddress,
    type: UNIQUE_TOKENS_GET_UNIQUE_TOKENS_REQUEST
  });
  if (showcaseAddress) {
    dispatch({
      showcase: !!showcaseAddress,
      type: UNIQUE_TOKENS_CLEAR_STATE_SHOWCASE
    });
  }
  const accountAddress = showcaseAddress || getState().settings.accountAddress;
  const { assets } = getState().data;
  const { uniqueTokens: existingUniqueTokens } = getState().uniqueTokens;
  const shouldUpdateInBatches = isEmpty(existingUniqueTokens);

  let shouldStopFetching = false;
  let page = 0;
  let uniqueTokens: any = [];

  const fetchPage = async () => {
    try {
      const newPageResults = await apiGetAccountUniqueTokens(accountAddress, page);

      // check that the account address to fetch for has not changed
      const currentAccountAddress = showcaseAddress || getState().settings.accountAddress;
      if (currentAccountAddress !== accountAddress) return;

      uniqueTokens = concat(uniqueTokens, newPageResults);
      shouldStopFetching =
        newPageResults.length < UNIQUE_TOKENS_LIMIT_PER_PAGE ||
        uniqueTokens.length >= UNIQUE_TOKENS_LIMIT_TOTAL;
      page += 1;

      if (shouldUpdateInBatches) {
        dispatch({
          payload: uniqueTokens,
          showcase: !!showcaseAddress,
          type: UNIQUE_TOKENS_GET_UNIQUE_TOKENS_SUCCESS
        });
      }

      if (shouldStopFetching) {
        if (!shouldUpdateInBatches) {
          dispatch({
            payload: uniqueTokens,
            showcase: !!showcaseAddress,
            type: UNIQUE_TOKENS_GET_UNIQUE_TOKENS_SUCCESS
          });
        }
        const existingFamilies = getFamilies(existingUniqueTokens);
        const newFamilies = getFamilies(uniqueTokens);
        const incomingFamilies = without(newFamilies, ...existingFamilies);
        if (incomingFamilies.length) {
          const dedupedAssets = dedupeAssetsWithFamilies(assets, incomingFamilies);
        }
        if (!showcaseAddress) {
          saveUniqueTokens(uniqueTokens, accountAddress);
        }
      } else {
        uniqueTokensHandle = setTimeout(fetchPage, 200);
      }
    } catch (error) {
      dispatch({
        showcase: !!showcaseAddress,
        type: UNIQUE_TOKENS_GET_UNIQUE_TOKENS_FAILURE
      });
      console.log(error);
    }
  };

  fetchPage();
};
