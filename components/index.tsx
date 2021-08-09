import { useCallback, useState, useEffect } from 'react';
import { HomeDataContext } from '@lib/hooks/use-home-data';
import { PageState, HomeProps, UserData } from '@lib/types';
import { useWeb3React } from '@web3-react/core';
import { useETHBalance } from '@lib/hooks/useEthBalance';
import HomeContainer from './home/home-container';
import Layout from './layout/layout';
import Hero from './home/hero';
import Form from './home/form';
import { Form as FormInput } from '../components/form/Form';
import Profile from './profile/profile';
import { fetchData } from '@lib/web3/opensea-fetch';
import { fetchUser } from '@lib/web3/opensea-fetch-user';
import { DEFAULT_USER } from '@lib/constants';
import { useAppState } from '../lib/state/state';
import { fetchUniqueTokens } from '@lib/web3/fetch-unique';
import { Token } from '../components/token/Token';
import { useLastTradedNFTs } from '../lib/hooks/useLastTradedNFTs';

const HomeContent = ({ defaultUserData, defaultPageState = 'registration' }: HomeProps) => {
  const { loading, error, nfts } = useLastTradedNFTs();
  const { library: libraryState, user, assets }: any = useAppState();
  const { setUser, setLibrary, setAssets, setEthPrice } = useAppState(
    useCallback(
      ({ setUser, setLibrary, setAssets, setEthPrice }) => ({
        setUser,
        setLibrary,
        setAssets,
        setEthPrice
      }),
      []
    )
  );
  const { library, account }: any = useWeb3React();
  const { data }: any = useETHBalance(account);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ethAccount, setEthAccount] = useState<string>('');
  const [acctBalance, setAcctBalance] = useState<string>('0.0');
  const [acctData, setAcctData] = useState<object>({ assets: [] });
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [localUser, setLocalUser] = useState<UserData>(DEFAULT_USER);

  async function doFetchData() {
    setIsLoading(true);
    if (account) {
      setEthAccount(account);
      setAcctBalance(data);
      setEthPrice(data);
      fetchData(account)
        .then(res => setAcctData(res))
        .catch(err => {
          console.error(err ? err.message : 'Error fetching data');
        });
      fetchUser(account)
        .then(res => setLocalUser(res))
        .catch(err => {
          console.error(err ? err.message : 'Error fetching user');
        });
      fetchUniqueTokens(user, assets, setAssets, account)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.error(err ? err.message : 'Error fetching unique tokens');
        });
      setUser(account);
      setUserData(user);
      setLibrary(library);
      setPageState('loggedin');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    doFetchData();
  }, []);

  useEffect(() => {
    doFetchData();
  }, [account, data]);

  return (
    <HomeDataContext.Provider value={{ acctData, userData, setUserData, setPageState }}>
      <Layout>
        <HomeContainer>
          {account && pageState === 'loggedin' && !isLoading ? (
            <>
              <FormInput />
              <Profile
                ethAccount={ethAccount}
                acctBalance={acctBalance}
                acctData={acctData}
                pageState={pageState}
                user={localUser}
              />
              {nfts.map((nft: any) => (
                <Token key={nft.transferId} {...nft} />
              ))}
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
