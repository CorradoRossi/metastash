import { concat, isEmpty, without } from 'lodash';
import { apiGetAccountUniqueTokens } from './opensea-api';
import { UNIQUE_TOKENS_LIMIT_PER_PAGE, UNIQUE_TOKENS_LIMIT_TOTAL } from '@lib/constants';
import { dedupeAssetsWithFamilies, getFamilies } from '../utils/uniqueTokens';
import { useAppState } from '../../state/state';
let uniqueTokensHandle = null;

import { getUniqueTokens, saveUniqueTokens } from '../utils/localStorage';

export const fetchUniqueTokens = async (showcaseAddress: any) => {
  const { user, assets, setAssets } = useAppState();
  const accountAddress = showcaseAddress;
  const { uniqueTokens: existingUniqueTokens } = assets;
  const shouldUpdateInBatches = isEmpty(existingUniqueTokens);

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
      showcase = user?.address;
      console.log(error);
    }
  };

  fetchPage();
};
