import { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/collection-section.module.css';
import GithubIcon from '@components/icons/icon-github-og';
import TwitterIcon from '@components/icons/icon-twitterr';
import { formatAddressShort, copyToClipBoard } from '@lib/utils/utils';

const Profile = ({
  ethAccount,
  acctBalance,
  assetArray,
  pageState
}: {
  ethAccount: string;
  acctBalance: number;
  assetArray: object | any;
  pageState: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState(ethAccount);
  const [balance, setBalance] = useState(acctBalance);
  const [combinedBids, setCombinedBids] = useState(0);
  const [combinedLastSaleprice, setCombinedLastSaleprice] = useState(0);

  useEffect(() => {
    let localCombinedBids = 0;
    let localCombinedLastSaleprice = 0;
    if (assetArray) {
      setAccount(ethAccount);
      setBalance(acctBalance);
      assetArray?.assets?.forEach((item: any) => {
        if (item.topBid) {
          item.topBid = true;
          localCombinedBids += item.bid;
        }
        if (item.last_sale) {
          item.last_sale = true;
          localCombinedLastSaleprice += item.last_sale_price;
        }
      });
      setCombinedBids(localCombinedBids);
      setCombinedLastSaleprice(localCombinedLastSaleprice);
    }
    setIsLoading(false);
  }, [ethAccount, acctBalance, assetArray, isLoading]);

  return !isLoading && pageState === 'loggedin' && assetArray?.assets?.length ? (
    <>
      <div className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <Image
            alt={assetArray?.assets[0].name}
            title={assetArray?.assets[0].name}
            src={assetArray?.assets[0].owner.profile_img_url}
            className={styles.image}
            loading="lazy"
            height={320}
            width={320}
          />
        </div>
        <div className={styles['collectible-details']}>
          <div>
            <h1 className={styles.name}>{assetArray?.assets[0].owner.user.username}</h1>
            <p className={styles.title} style={{ fontWeight: 600 }}>
              {`${assetArray?.assets[0].owner.user.username} @ `}
              <span className={styles.company}>{assetArray?.assets[0].owner.user.username}</span>
            </p>
            <h2 className={styles['bio-header']}>Bio</h2>
            <p className={styles.bio}>{assetArray?.assets[0].bio}</p>
            <h3 className={styles['socials-header']}>Social Media</h3>
            {assetArray?.assets[0].twitter ? (
              <a
                aria-label="Twitter"
                href={assetArray?.assets[0].twitter}
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
            {assetArray?.assets[0].github ? (
              <a
                aria-label="GitHub"
                className={styles.githubIcon}
                href={assetArray?.assets[0].github}
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
      {assetArray?.assets[0] && (
        <div className={styles['talk-details']}>
          <h3 className={styles['socials-header']}>{assetArray?.assets[0].talk?.title}</h3>
          <p>{assetArray?.assets[0].talk?.description}</p>
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
            {assetArray?.assets?.length}
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
    </>
  ) : (
    <div></div>
  );
};

export default Profile;
