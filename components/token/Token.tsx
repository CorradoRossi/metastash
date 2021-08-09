import Link from 'next/link';

import styles from 'styles/collection-grid.module.css';
import { useTokenImage } from '../../lib/hooks/useTokenImage';
import { Owner } from '../owner/Owner';

export const Token = ({ id, uri, registry, identifier, owner }: any) => {
  const image = useTokenImage({ id, uri });

  return (
    <Link href={`/token/${id}`}>
      <a className={styles.card}>
        <div className={styles['imageWrapper holder']}>
          <div className="info">
            <div>
              ${registry?.symbol}: #{identifier}
            </div>
            <div className="owner">
              <Owner address={owner?.id} />
            </div>
          </div>
          {image && (
            <div style={{ display: 'flex', justifyContent: 'center', aspectRatio: '1', zIndex: 5 }}>
              <img className={styles.image} src={image} />
            </div>
          )}
          <div className={styles.cardBody}>
            <div>
              <div>
                <div>
                  ${registry?.symbol}: #{identifier}
                </div>
                <div className="owner">
                  <Owner address={owner?.id} />
                </div>
              </div>
              <div className={styles.nameWrapper}>
                <h2 className={styles.name}>{owner?.name}</h2>
              </div>
              <p className={styles.title}>
                {`@${owner?.creator?.user?.username}`}
                <span className={styles.company}>{''}</span>
              </p>
            </div>
          </div>
        </div>
        <style>
          {`
          a {
            position: relative;
            display: inline-block;
            overflow: hidden;
            text-align: center;
          }
          .holder {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
          }
          a:hover {
            box-shadow: 0 0 80px rgba(192, 219, 255, 0.48), 0 0 32px rgba(65, 120, 255, 0.24);
          }
          .info {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            padding: 20px 5px;
            background-color: #151c42c0;
            font-size: 0.8em;
            display: none;
          }
          a:hover .info {
            display: block;
            z-index: 10;
          }
        `}
        </style>
      </a>
    </Link>
  );
};
