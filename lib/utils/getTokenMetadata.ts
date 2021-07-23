import { toLower, keyBy, map } from 'lodash';
import { RainbowToken } from '@lib/types';
import { RAINBOW_TOKEN_LIST_DATA } from '@lib/utils/refs';

const ethWithAddress: RainbowToken = {
  address: 'eth',
  decimals: 18,
  isRainbowCurated: true,
  isVerified: true,
  name: 'Ethereum',
  symbol: 'ETH',
  uniqueId: 'eth'
};

const tokenList: RainbowToken[] = map(RAINBOW_TOKEN_LIST_DATA.tokens, (token: any) => {
  const { address: rawAddress, decimals, name, symbol, extensions } = token;
  const address = toLower(rawAddress);
  return {
    address,
    decimals,
    name,
    symbol,
    uniqueId: address,
    ...extensions
  };
});

const tokenListWithEth: RainbowToken[] = [ethWithAddress, ...tokenList];

const RAINBOW_TOKEN_LIST: Record<string, RainbowToken> = keyBy(tokenListWithEth, 'address');

export default function getTokenMetadata(tokenAddress: string): RainbowToken | undefined {
  return RAINBOW_TOKEN_LIST[toLower(tokenAddress)];
}
