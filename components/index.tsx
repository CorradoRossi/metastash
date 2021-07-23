import { useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './home/form';
import Profile from './home/profile';
import { fetchData } from '@lib/web3/opensea-fetch';
import { fetchUser } from '@lib/web3/get-user';
import { apiGetAccountUniqueTokens } from '@lib/web3/opensea-api';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ethAccount, setEthAccount] = useState('');
  const [acctBalance, setAcctBalance] = useState(0);
  const [acctData, setAcctData] = useState({ assets: [] });
  const [assetArray, setAssetArray] = useState({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function doFetchData() {
      setIsLoading(true);
      setEthAccount(account);
      setAcctBalance(data);
      if (account) {
        fetchData(account).then(res => setAssetArray(res));
        fetchUser(account).then((res: any) => setUser(res));
        await apiGetAccountUniqueTokens(account, 0)
          .then((res: any) => {
            setAcctData({ assets: res });
          })
          .then(() => setIsLoading(false));
      }
    }
    doFetchData();
  }, []);

  useEffect(() => {
    async function doFetchData() {
      setIsLoading(true);
      setEthAccount(account);
      setAcctBalance(data);
      if (account) {
        fetchData(account).then(res => setAssetArray(res));
        fetchUser(account).then((res: any) => setUser(res));
        await apiGetAccountUniqueTokens(account, 0)
          .then((res: any) => {
            setAcctData({ assets: res });
          })
          .then(() => {
            setPageState('loggedin');
          })
          .then(() => setIsLoading(false));
      }
    }
    doFetchData();
  }, [account, data]);

  console.log(user, 'user index');
  return (
    <HomeDataContext.Provider value={{ acctData, userData, setUserData, setPageState }}>
      <Layout>
        <HomeContainer>
          {account && pageState === 'loggedin' && !isLoading ? (
            <>
              <Profile
                ethAccount={ethAccount}
                acctBalance={acctBalance}
                assetArray={assetArray}
                pageState={pageState}
                user={user}
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
