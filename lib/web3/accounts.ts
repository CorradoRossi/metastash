import { get, isNil, map, toUpper } from 'lodash';
import { dedupeUniqueTokens } from '../utils/uniqueTokens';
import {
  add,
  convertAmountAndPriceToNativeDisplay,
  convertAmountToNativeDisplay,
  convertAmountToPercentageDisplay,
  convertRawAmountToBalance
} from '../utils/utilities';
import getTokenMetadata from '../utils/getTokenMetadata';
import isLowerCaseMatch from '../utils/isLowercaseMatch';

export const parseAccountAssets = (data: any, uniqueTokens: any) => {
  const dedupedAssets = dedupeUniqueTokens(data, uniqueTokens);
  return dedupedAssets.map((assetData: any) => {
    const asset = parseAsset(assetData.asset);
    return {
      ...asset,
      balance: convertRawAmountToBalance(assetData.quantity, asset)
    };
  });
};

// eslint-disable-next-line no-useless-escape
const sanitize = (s: any) => s.replace(/[^a-z0-9áéíóúñü \.,_@:-]/gim, '');

export const parseAssetName = (metadata: any, name: any) => {
  if (metadata?.name) return metadata?.name;
  return name ? sanitize(name) : 'Unknown Token';
};

export const parseAssetSymbol = (metadata: any, symbol: any) => {
  if (metadata?.symbol) return metadata?.symbol;
  return symbol ? toUpper(sanitize(symbol)) : '———';
};

export const parseAsset = ({ asset_code: address, ...asset }: any = {}) => {
  const metadata = getTokenMetadata(address);
  const name = parseAssetName(metadata, asset.name);
  const symbol = parseAssetSymbol(metadata, asset.symbol);
  const type = 'token';

  const parsedAsset = {
    ...asset,
    ...metadata,
    address,
    name,
    symbol,
    type,
    uniqueId: address || name
  };

  return parsedAsset;
};

export const parseAssetsNativeWithTotals = (assets: any, nativeCurrency: any) => {
  const assetsNative = parseAssetsNative(assets, nativeCurrency);
  const totalAmount = assetsNative.reduce(
    (total, asset) => add(total, get(asset, 'native.balance.amount', 0)),
    0
  );
  const totalDisplay = convertAmountToNativeDisplay(totalAmount, nativeCurrency);
  const total = { amount: totalAmount, display: totalDisplay };
  return { assetsNativePrices: assetsNative, total };
};

export const parseAssetsNative = (assets: any, nativeCurrency: any) =>
  map(assets, asset => {
    const assetNativePrice = get(asset, 'price');
    if (isNil(assetNativePrice)) {
      return asset;
    }

    const priceUnit = get(assetNativePrice, 'value', 0);
    const nativeDisplay = convertAmountAndPriceToNativeDisplay(
      get(asset, 'balance.amount', 0),
      priceUnit,
      nativeCurrency
    );
    return {
      ...asset,
      native: {
        balance: nativeDisplay,
        change: isLowerCaseMatch(get(asset, 'symbol'), nativeCurrency)
          ? null
          : assetNativePrice.relative_change_24h
          ? convertAmountToPercentageDisplay(assetNativePrice.relative_change_24h)
          : '',
        price: {
          amount: priceUnit,
          display: convertAmountToNativeDisplay(priceUnit, nativeCurrency)
        }
      }
    };
  });
