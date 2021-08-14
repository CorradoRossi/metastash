import { useCallback, useState, useEffect } from 'react';
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

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { assets, rawAssets }: any = useAppState();
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
  const { library, account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [acctData, setAcctData] = useState<object>({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [localUser, setLocalUser] = useState<UserData>(DEFAULT_USER);

  async function doFetchData() {
    setIsLoading(true);
    if (account && data) {
      let rssi = '0x90c19feA1eF7BEBA9274217431F148094795B074';
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
          fetchOrders({ user: { address: rssi } }, rawAssets, setRawAssets, rssi).then(res => res);
        })
        .catch(err => {
          return console.error(err ? err.message : 'Error fetching user');
        });
      setPageState('loggedin');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    doFetchData();
  }, [account, data]);

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
