import { useCallback, useState, useEffect } from 'react';
import * as etherscanApi from 'etherscan-api';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { useWeb3React } from '@web3-react/core';
import { useETHBalance } from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './home/form';
import Profile from './profile/profile';
import { fetchData } from '@lib/web3/opensea-fetch';
import { fetchUser } from '@lib/web3/opensea-fetch-user';
import { DEFAULT_USER } from '@lib/constants';
import { useAppState } from '@lib/apollo/state';
import { fetchUniqueTokens } from '@lib/web3/fetch-unique';
import { fetchOrders } from '@lib/web3/fetch-unique-order';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { responseInterface } from 'swr';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { assets, rawAssets }: { assets: object[]; rawAssets: object[] } = useAppState();
  const { setUser, setLibrary, setAssets, setRawAssets, setEthPrice }: any = useAppState(
    useCallback(
      ({ setUser, setLibrary, setAssets, setRawAssets, setEthPrice }) => ({
        setUser,
        setLibrary,
        setAssets,
        setRawAssets,
        setEthPrice
      }),
      []
    )
  );
  const { library, account }: Web3ReactContextInterface = useWeb3React();
  const { data }: responseInterface<string, Error> = useETHBalance(account);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [acctData, setAcctData] = useState<object>({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [localUser, setLocalUser] = useState<UserData>(DEFAULT_USER);
  const [scanData, setScanData] = useState<object>({});
  const [txList, setTxList] = useState<object>({});

  async function fetchEtherscanData(address: string) {
    let api = etherscanApi.init('');
    let balanceData = api.account.balance(address);
    let txlist = api.account.txlist(address, 1, 'latest', 1, 100, 'asc');

    balanceData
      .then((res: any) => {
        let data = {
          status: res.status,
          result: res.result,
          message: res.message
        };
        setScanData(data);
      })
      .catch((err: Error) => {
        console.log(err);
      });

    txlist
      .then((res: object) => {
        setTxList(res);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  async function doFetchData() {
    setIsLoading(true);
    if (account && data) {
      setLibrary(library);
      setUser(account);
      setEthPrice(data);
      fetchData(account)
        .then(res => setAcctData(res))
        .catch(err => {
          return console.error(err ? err.message : 'Error fetching data');
        });
      fetchUser(account)
        .then(res => {
          setLocalUser(res);
          setUserData(res);
          fetchUniqueTokens(res, assets, setAssets, account).then(res => res);
          fetchOrders(res, rawAssets, setRawAssets, account).then(res => res);
        })
        .catch(err => {
          return console.error(err ? err.message : 'Error fetching user');
        });
      if (Object.keys(scanData).length === 0) {
        fetchEtherscanData(account);
      }
      setPageState('loggedin');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    doFetchData();
  }, [account, data]);

  console.log('scanData', scanData);
  console.log('txList', txList);
  return (
    <HomeDataContext.Provider value={{ acctData, userData, setUserData, setPageState }}>
      <Layout>
        <HomeContainer>
          {account && data && pageState === 'loggedin' && !isLoading ? (
            <>
              <Profile
                ethAccount={account}
                acctBalance={data}
                acctData={acctData}
                pageState={pageState}
                user={localUser}
              />
            </>
          ) : (
            <>
              <Hero />
              <Form />
            </>
          )}
        </HomeContainer>
      </Layout>
    </HomeDataContext.Provider>
  );
};

export default HomeContent;
