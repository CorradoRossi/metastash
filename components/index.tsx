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
import { apiGetAccountUniqueTokens } from '@lib/web3/opensea-api';
import { parseAccountAssets } from '@lib/web3/accounts';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ethAccount, setEthAccount] = useState('');
  const [acctBalance, setAcctBalance] = useState(0);
  const [acctData, setAcctData] = useState({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setEthAccount(account);
      setAcctBalance(data);
      if (account) {
        await apiGetAccountUniqueTokens(account, 0)
          .then((res: any) => {
            setAcctData({ assets: res });
          })
          .then((res: any) => {
            let parsed = parseAccountAssets(res, res);
            console.log(parsed, 'parsed');
          })
          .then(() => setIsLoading(false));
      }
    }
    console.log(acctData, 'acctData');
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setEthAccount(account);
      setAcctBalance(data);
      if (account) {
        await apiGetAccountUniqueTokens(account, 0)
          .then((res: any) => {
            setAcctData({ assets: res });
          })
          .then((res: any) => {
            let parsed = parseAccountAssets(res, res);
            console.log(parsed, 'parsed');
          })
          .then(() => {
            setPageState('loggedin');
          })
          .then(() => setIsLoading(false));
      }
    }
    console.log(acctData, 'acctData');
    fetchData();
  }, [account, data]);

  return (
    <HomeDataContext.Provider value={{ acctData, userData, setUserData, setPageState }}>
      <Layout>
        <HomeContainer>
          {account && pageState === 'loggedin' && !isLoading ? (
            <>
              <Profile
                ethAccount={ethAccount}
                acctBalance={acctBalance}
                assetArray={acctData}
                pageState={pageState}
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
