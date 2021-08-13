import { concat, isEmpty } from 'lodash';
import { apiGetAccountUniqueOrders } from './opensea-api-order';
import { UNIQUE_TOKENS_LIMIT_PER_PAGE, UNIQUE_TOKENS_LIMIT_TOTAL } from '@lib/constants';

let handle = null;

export const fetchOrders = async (
  user: any,
  rawAssets: any,
  setRawAssets: any,
  showcaseAddress: any
) => {
  const acctAddress = showcaseAddress;
  const batch = isEmpty(rawAssets);
  let showcase;
  let stop = false;
  let page = 0;
  let unique: any = [];
  const filtered = (arr: any) =>
    arr
      .slice()
      .filter(
        (value: any, index: any, array: any) =>
          array.findIndex((item: any) => item.asset.id === value.asset.id) === index
      );

  const fetchPage = async () => {
    let newRes: any = await apiGetAccountUniqueOrders(acctAddress, page);
    const curr = showcaseAddress || user?.address;
    if (curr !== acctAddress) return;
    unique = concat(unique, newRes);
    stop =
      newRes.length < UNIQUE_TOKENS_LIMIT_PER_PAGE || unique.length >= UNIQUE_TOKENS_LIMIT_TOTAL;
    page += 1;
    if (batch) {
      setRawAssets(filtered(unique));
    }
    if (stop) {
      if (!batch) {
        setRawAssets(filtered(unique));
      }
      if (!showcaseAddress) {
        console.log(unique, acctAddress, 'whats going on here?');
      }
    } else {
      handle = setTimeout(fetchPage, 200);
    }
  };
  fetchPage().catch(err => {
    showcase = user?.address;
    console.log(err);
  });
};
