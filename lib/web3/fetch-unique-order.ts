import { concat, isEmpty } from 'lodash';
import { apiGetAccountUniqueOrders as getOrders } from './opensea-api-order';
import { UNIQUE_TOKENS_LIMIT_PER_PAGE as uniqueLimit, UNIQUE_TOKENS_LIMIT_TOTAL as totalLimit } from '@lib/constants';

export const fetchOrders = async (user: any, assets: object[], setAssets: Function, address: string) => {
  let localAddress: string = address;
  let batch: boolean = isEmpty(assets);
  let stop: boolean = false;
  let unique: any[] = [];
  let handle: any = null;
  let page: number = 0;
  let filtered = (arr: object[]) =>
    arr
      .slice()
      .filter(
        (value: any, index: number, array: object[]) =>
          array.findIndex((item: any) => item.asset.id === value.asset.id) === index
      )
      .sort(
        (a: any, b: any) =>
          a.asset.collection.name.localeCompare(b.asset.collection.name) ||
          parseFloat(b.current_price) - parseFloat(a.current_price)
      );

  const fetchPage = async () => {
    let newRes: any = await getOrders(localAddress, page);
    let curr = address || user?.address;
    if (curr !== localAddress) return;
    unique = concat(unique, newRes);
    stop = newRes.length < uniqueLimit || unique.length >= totalLimit;
    page += 1;
    if (batch) {
      setAssets(filtered(unique));
    }
    if (stop) {
      if (!batch) {
        setAssets(filtered(unique));
      }
      if (!address) {
        console.log(unique, localAddress, 'address returned false');
      }
    } else {
      handle = setTimeout(fetchPage, 200);
    }
  };
  fetchPage().catch(err => {
    console.log(err);
  });
};
