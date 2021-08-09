import { useRouter } from 'next/router';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import { META } from '@lib/constants';
import { Form } from '../../components/form/Form';
import { Owner } from '../../components/owner/Owner';
import { Token } from '../../components/token/Token';
import { useNFTsOfOwner } from '../../lib/hooks/useNFTsOfOwner';
import styles from 'styles/collection-grid.module.css';

const OwnerPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { loading, error, nfts } = useNFTsOfOwner({
    address: address as string
  });

  return (
    <Page meta={META}>
      <Layout>
        <main>
          <Form initialAddress={address as string} />
          <h1>
            NFTs owned by <Owner address={address} />:
          </h1>
          <div className={styles.grid}>
            {nfts.map((nft: any) => (
              <Token key={nft.id} {...nft} />
            ))}
          </div>
        </main>
      </Layout>
    </Page>
  );
};

export default OwnerPage;
