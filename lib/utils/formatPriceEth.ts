import { BigNumberish, utils } from 'ethers';
import BigNumber from 'bignumber.js';

export const DEFAULT_DECIMALS = 18;

export const formatPriceEth = (price: BigNumberish, ethPrice: string = '0') =>
  new Intl.NumberFormat('us-GB', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(utils.formatEther(price)) * Number(ethPrice));

export const formatPriceEthNum = (price: number, ethPrice: string = '0') =>
  new Intl.NumberFormat('us-GB', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(price * Number(ethPrice)));

//

export function toUnitAmount(baseAmount: any, tokenContract: any = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null ? tokenContract.decimals : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(baseAmount.toString());
  return amountBN.div(new BigNumber(10).pow(decimals));
}

export function toBaseUnitAmount(unitAmount: any, tokenContract: any = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null ? tokenContract.decimals : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(unitAmount.toString());
  return amountBN.times(new BigNumber(10).pow(decimals));
}
