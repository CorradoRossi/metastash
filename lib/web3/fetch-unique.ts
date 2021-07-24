import { concat, isEmpty, without } from 'lodash';
import { apiGetAccountUniqueTokens } from './opensea-api';
import { UNIQUE_TOKENS_LIMIT_PER_PAGE, UNIQUE_TOKENS_LIMIT_TOTAL } from '@lib/constants';
import { dedupeAssetsWithFamilies, getFamilies } from '../utils/uniqueTokens';

let uniqueTokensHandle = null;

export const fetchUniqueTokens = async (
  user: any,
  assets: any,
  setAssets: any,
  showcaseAddress: any
) => {
  const accountAddress = showcaseAddress;
  const shouldUpdateInBatches = isEmpty(assets);

  let showcase;
  let shouldStopFetching = false;
  let page = 0;
  let uniqueTokens: any = [];

  const fetchPage = async () => {
    try {
      const newPageResults = await apiGetAccountUniqueTokens(accountAddress, page);

      // check that the account address to fetch for has not changed
      const currentAccountAddress = showcaseAddress || user?.address;
      if (currentAccountAddress !== accountAddress) return;

      uniqueTokens = concat(uniqueTokens, newPageResults);
      shouldStopFetching =
        newPageResults.length < UNIQUE_TOKENS_LIMIT_PER_PAGE ||
        uniqueTokens.length >= UNIQUE_TOKENS_LIMIT_TOTAL;
      page += 1;

      if (shouldUpdateInBatches) {
        setAssets(uniqueTokens);
      }

      if (shouldStopFetching) {
        if (!shouldUpdateInBatches) {
          setAssets(uniqueTokens);
        }
        const existingFamilies = getFamilies(uniqueTokens);
        const newFamilies = getFamilies(uniqueTokens);
        const incomingFamilies = without(newFamilies, ...existingFamilies);
        if (incomingFamilies.length) {
          const dedupedAssets = dedupeAssetsWithFamilies(assets, incomingFamilies);
        }
        if (!showcaseAddress) {
          console.log(uniqueTokens, accountAddress, 'whats going on here?');
        }
      } else {
        uniqueTokensHandle = setTimeout(fetchPage, 200);
      }
    } catch (error) {
      showcase = user?.address;
      console.log(error);
    }
  };

  fetchPage();
};
