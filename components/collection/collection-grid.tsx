import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/collection-grid.module.css';
import { useAppState } from '../../state/state';
import { DataObject } from '@lib/types';

const CollectionGrid = () => {
  const { assets }: any = useAppState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataObject>({ assets: [] });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await setData({ assets: assets });
      await setIsLoading(false);
    }
    fetchData();
  }, []);

  return !isLoading ? (
    <div className={styles.grid}>
      {data?.assets?.length ? (
        data?.assets?.map((asset: any) => (
          <Link key={asset?.permalink} href={`/collection/${asset?.name}`}>
            <a role="button" tabIndex={0} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  alt={asset?.name}
                  src={asset?.image_preview_url}
                  className={styles.image}
                  loading="lazy"
                  quality="50"
                  title={asset?.name}
                  width={300}
                  height={300}
                />
              </div>
              <div className={styles.cardBody}>
                <div>
                  <div className={styles.nameWrapper}>
                    <h2 className={styles.name}>{asset?.name}</h2>
                  </div>
                  <p className={styles.title}>
                    {`@${asset?.creator?.user?.username}`}
                    <span className={styles.company}>{''}</span>
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))
      ) : (
        <>
          <h2 className={styles.name}>There are no NFT's in your collection!</h2>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default CollectionGrid;
