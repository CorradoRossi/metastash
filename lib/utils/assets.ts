import { INFURA_ID } from './../constants';
import BigNumber from 'bignumber.js';
import { Contract } from '@ethersproject/contracts';
import { convertAmountToBalanceDisplay, convertRawAmountToDecimalFormat } from './utilities';
import { erc20ABI } from '../references';
import { JsonRpcProvider } from '@ethersproject/providers';

type BigNumberish = number | string | BigNumber;

const infuraProjectId = INFURA_ID;

export let web3Provider = new JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraProjectId}`,
  'mainnet'
);

export async function getOnchainAssetBalance({ address, decimals, symbol }: any, userAddress: any) {
  if (address !== 'eth') {
    return getOnchainTokenBalance({ address, decimals, symbol }, userAddress);
  }
  return getOnchainEtherBalance({ address, decimals, symbol }, userAddress);
}

async function getOnchainTokenBalance(
  { address, decimals, symbol }: { address: string; decimals: number; symbol: any },
  userAddress: any
) {
  try {
    const tokenContract = new Contract(address, erc20ABI, web3Provider);
    const balance = await tokenContract.balanceOf(userAddress);
    const tokenBalance = convertRawAmountToDecimalFormat(balance.toString(), decimals);
    const displayBalance = convertAmountToBalanceDisplay(tokenBalance, {
      //@ts-ignore
      address,
      decimals,
      symbol
    });

    return {
      amount: tokenBalance,
      display: displayBalance
    };
  } catch (e) {
    return null;
  }
}

async function getOnchainEtherBalance(
  { address, decimals, symbol }: { address: string; decimals: number; symbol: any },
  userAddress: any
) {
  try {
    const balance = await web3Provider.getBalance(userAddress);
    const tokenBalance = convertRawAmountToDecimalFormat(balance.toString(), decimals);
    const displayBalance = convertAmountToBalanceDisplay(tokenBalance, {
      //@ts-ignore
      address,
      decimals,
      symbol
    });

    return {
      amount: tokenBalance,
      display: displayBalance
    };
  } catch (e) {
    return null;
  }
}
