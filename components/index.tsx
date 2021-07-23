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

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [ethAccount, setEthAccount] = useState('');
  const [acctBalance, setAcctBalance] = useState(0);
  const [acctData, setAcctData] = useState({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  useEffect(() => {
    setEthAccount(account);
    setAcctBalance(data);
    if (account) {
      fetchData(account).then(res => setAcctData(res));
    }
  }, []);

  useEffect(() => {
    setEthAccount(account);
    setAcctBalance(data);
    if (account) {
      fetchData(account).then(res => setAcctData(res));
    }
    console.log(account, 'account');
  }, [account, data]);

  return (
    <HomeDataContext.Provider value={{ acctData, userData, setUserData, setPageState }}>
      <Layout>
        <HomeContainer>
          {account ? (
            <>
              <Profile ethAccount={ethAccount} acctBalance={acctBalance} assetArray={acctData} />
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
