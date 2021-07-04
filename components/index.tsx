import { useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './form/form';
import Profile from './collection/profile';
import { OPENSEA_BASE_URL, OPENSEA_ASSETS } from '@lib/constants';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [ethAccount, setEthAccount] = useState('');
  const [acctBalance, setAcctBalance] = useState(0);
  const [acctData, setAcctData] = useState({ assets: [] });

  useEffect(() => {
    setEthAccount(account);
    setAcctBalance(data);
  }, [account, data]);

  useEffect(() => {
    setEthAccount(account);
    setAcctBalance(data);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const url = `${
        OPENSEA_BASE_URL + OPENSEA_ASSETS
      }?owner=${account}&order_direction=desc&offset=0&limit=100`;
      const options = { method: 'GET' };
      setIsLoading(true);
      const fetcher = await window.fetch(url, options);
      const response = await fetcher.json();
      setAcctData(response);
      console.log(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <HomeDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <Layout>
        <HomeContainer>
          {ethAccount ? (
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
