import { useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import styles from 'styles/profile-section.module.css';
import GithubIcon from '@components/icons/icon-github-og';
import TwitterIcon from '@components/icons/icon-twitterr';
import { formatAddressShort, copyToClipBoard } from '@lib/utils/utils';
import { DEFAULT_PROFILE_PIC } from '@lib/constants';
import { useAppState } from '../../state/state';
import { fetchAcct } from '@lib/web3/opensea-fetch-acct';

const Profile = ({
  ethAccount,
  acctBalance,
  acctData,
  pageState,
  user
}: {
  ethAccount: string;
  acctBalance: string;
  pageState: string;
  acctData: object | any;
  user: object | any;
}) => {
  const { assets }: any = useAppState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<string>(ethAccount);
  const [balance, setBalance] = useState<string>(acctBalance);
  const [combinedBids, setCombinedBids] = useState<number>(0);
  const [combinedLastSaleprice, setCombinedLastSaleprice] = useState(0);

  useEffect(() => {
    let localCombinedBids = 0;
    let localCombinedLastSaleprice = 0;
    if (acctData) {
      setAccount(ethAccount);
      //fetchAcct(ethAccount);
      setBalance(acctBalance);
      acctData?.assets?.forEach((item: any) => {
        if (item.topBid) {
          localCombinedBids += item.topBid;
        }
        if (item.last_sale) {
          localCombinedLastSaleprice += item.last_sale_price;
        }
      });
      setCombinedBids(localCombinedBids);
      setCombinedLastSaleprice(localCombinedLastSaleprice);
    }
    setIsLoading(false);
  }, [ethAccount, acctBalance, acctData, isLoading]);

  return !isLoading && pageState === 'loggedin' && user ? (
    <>
      <div className={styles.profilecontainer}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ minWidth: '300px' }}>
            <Image
              alt={user?.name}
              title={user?.name}
              src={user?.avatar_url ? user?.avatar_url : DEFAULT_PROFILE_PIC}
              className={styles.image}
              loading="lazy"
              height={320}
              width={320}
            />
          </div>
          <div className={styles['collectible-details']}>
            <div>
              <h1 className={styles.name}>{user?.username}</h1>
              <p className={styles.title} style={{ fontWeight: 600 }}>
                {`${user?.username} @ `}
                <span className={styles.company}>{user?.username}</span>
              </p>
              <h2 className={styles['bio-header']}>Bio</h2>
              <p className={styles.bio}>{user?.bio}</p>
              <h3 className={styles['socials-header']}>Social Media</h3>
              {user?.twitter ? (
                <a
                  aria-label="Twitter"
                  href={user?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </a>
              ) : (
                <span className={styles.disabled}>
                  <TwitterIcon />
                </span>
              )}
              {user?.github ? (
                <a
                  aria-label="GitHub"
                  className={styles.githubIcon}
                  href={user?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon color="#D8D8D8" size={24} />
                </a>
              ) : (
                <span className={cn(styles.githubIcon, styles.disabled)}>
                  <GithubIcon color="#D8D8D8" size={24} />
                </span>
              )}
            </div>
          </div>
        </div>
        {user && (
          <div className={styles['talk-details']}>
            <h3 className={styles['socials-header']}>{user?.talk?.title}</h3>
            <p>{user?.talk?.description}</p>
            <p
              onClick={() => copyToClipBoard(account)}
              style={{ fontWeight: 600, cursor: 'pointer' }}
            >
              <span>Address: </span>
              {formatAddressShort(account)}
            </p>
            <p style={{ fontWeight: 600 }}>
              <span>Balance: </span>
              {balance}
            </p>
            <p style={{ fontWeight: 600 }}>
              <span>NFTs in wallet: </span>
              {assets?.length}
            </p>
            <p style={{ fontWeight: 600 }}>
              <span>Combined bids: </span>
              {combinedBids}
            </p>
            <p style={{ fontWeight: 600 }}>
              <span>Combined last sale price: </span>
              {combinedLastSaleprice}
            </p>
          </div>
        )}
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default Profile;
