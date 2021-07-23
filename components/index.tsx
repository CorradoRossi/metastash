import { useCallback, useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { useWeb3React } from '@web3-react/core';
import useETHBalance from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './home/form';
import Profile from './profile/profile';
import { fetchData } from '@lib/web3/opensea-fetch';
import { fetchUser } from '@lib/web3/opensea-fetch-user';
import { DEFAULT_USER } from '@lib/constants';
import { useAppState } from '../state/state';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { user } = useAppState();
  const { setStateUser } = useAppState(
    useCallback(
      ({ setStateUser }) => ({
        setStateUser
      }),
      []
    )
  );
  const { account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ethAccount, setEthAccount] = useState('');
  const [acctBalance, setAcctBalance] = useState(0);
  const [acctData, setAcctData] = useState({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [localUser, setUser] = useState<UserData>(DEFAULT_USER);

  useEffect(() => {
    async function doFetchData() {
      setIsLoading(true);
      setEthAccount(account);
      setAcctBalance(data);
      if (account) {
        fetchData(account).then(res => setAcctData(res));
        fetchUser(account).then((res: any) => setUser(res));
        setStateUser(account);
        setPageState('loggedin');
        setIsLoading(false);
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
        fetchData(account).then(res => setAcctData(res));
        fetchUser(account).then((res: any) => setUser(res));
        setStateUser(account);
        setPageState('loggedin');
        setIsLoading(false);
      }
    }
    doFetchData();
    console.log(user, 'user');
    console.log(localUser, 'localUser');
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
