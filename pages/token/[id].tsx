import { useRouter } from 'next/router';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import { META } from '@lib/constants';
import styles from 'styles/collection-section.module.css';
import { useTokenDetails } from '../../lib/hooks/useTokenDetails';
import { useTokenImage } from '../../lib/hooks/useTokenImage';
import { LinkedOwner } from '../../components/owner/Owner';

const Token = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, token } = useTokenDetails({
    id: id as string
  });

  const image = useTokenImage(token);

  return (
    <Page meta={META}>
      <Layout>
        {loading && <p>Loading...</p>}
        {error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.container}>
            <main>
              <h1>{token?.registry?.name}</h1>
              <h2>
                ${token?.registry?.symbol}: #{token?.identifier}
              </h2>
              <img src={image} style={{ width: '300px' }} />
              <div>
                Metadata URI:{' '}
                <a target="_blank" href={token?.uri}>
                  {token?.uri}
                </a>
              </div>
              <div>
                Owner: <LinkedOwner address={token?.owner?.id} enclosingDigits={8} />
              </div>

              <h2>Previous owners</h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center'
                }}
              >
                {token?.transfers?.map((transfer: any) => (
                  <div>
                    <LinkedOwner address={transfer?.from?.id} enclosingDigits={8} />
                  </div>
                ))}
              </div>
            </main>
          </div>
        )}
      </Layout>
    </Page>
  );
};

export default Token;
