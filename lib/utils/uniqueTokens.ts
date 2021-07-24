import { filter, find, get, isNil, map, pick, uniq } from 'lodash';
import { ENS_NFT_CONTRACT_ADDRESS } from '@lib/constants';

export const parseAccountUniqueTokens = (data: any) => {
  const erc721s = get(data, 'data.assets', null);
  if (isNil(erc721s)) throw new Error('Invalid data from OpenSea');
  return erc721s.map(
    ({ asset_contract, background_color, collection, token_id, ...asset }: any) => ({
      ...pick(asset, [
        'animation_url',
        'current_price',
        'description',
        'external_link',
        'image_original_url',
        'image_preview_url',
        'image_thumbnail_url',
        'image_url',
        'name',
        'permalink',
        'traits',
        'owner',
        'top_bid',
        'creator'
      ]),
      asset_contract: pick(asset_contract, [
        'address',
        'name',
        'nft_version',
        'schema_name',
        'symbol',
        'total_supply'
      ]),
      background: background_color ? `#${background_color}` : null,
      collection: pick(collection, [
        'description',
        'external_url',
        'featured_image_url',
        'hidden',
        'image_url',
        'name',
        'short_description',
        'wiki_link'
      ]),
      familyImage: collection.image_url,
      familyName: asset_contract.address === ENS_NFT_CONTRACT_ADDRESS ? 'ENS' : collection.name,
      id: token_id,
      isSendable:
        asset_contract.nft_version === '1.0' ||
        asset_contract.nft_version === '3.0' ||
        asset_contract.schema_name === 'ERC1155',
      lastPrice: asset.last_sale ? Number(asset.last_sale.total_price) : null,
      type: 'nft',
      uniqueId:
        asset_contract.address === ENS_NFT_CONTRACT_ADDRESS
          ? asset.name
          : `${get(asset_contract, 'address')}_${token_id}`
    })
  );
};

export const getFamilies = (uniqueTokens: any) =>
  uniq(map(uniqueTokens, (u: any) => get(u, 'asset_contract.address', '')));

export const dedupeUniqueTokens = (assets: any, uniqueTokens: any) => {
  const uniqueTokenFamilies = getFamilies(uniqueTokens);
  let updatedAssets = assets;
  if (assets.length) {
    updatedAssets = filter(updatedAssets, (asset: any) => {
      const matchingElement = find(
        uniqueTokenFamilies,
        (uniqueTokenFamily: any) => uniqueTokenFamily === get(asset, 'asset.asset_code')
      );
      return !matchingElement;
    });
  }
  return updatedAssets;
};

export const dedupeAssetsWithFamilies = (assets: any, families: any) =>
  filter(
    assets,
    (asset: any) => !find(families, (family: any) => family === get(asset, 'address'))
  );
