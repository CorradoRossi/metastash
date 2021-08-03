import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import CollectionItem from '@components/collection/collection-item';
import { META } from '@lib/constants';
import { CollectionPageProps } from '@lib/types';
import { apiGetAccountUniqueTokens } from '@lib/web3/opensea-api';

const CollectibleWrapper = (props: any) => {
  const { collectible } = props;
  return (
    <Page meta={META}>
      <Layout>
        <CollectionItem collectible={collectible} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<CollectionPageProps> = async ({ params }: any) => {
  const slug = params?.collectible;
  const assets = await apiGetAccountUniqueTokens('0xf1ff7B66afB70cA3b2B1f6594F59187bFC5897C9', 0);
  const currentAsset = assets?.find((asset: any) => {
    const regex = '^[^_]+'; 
    const match = asset.uniqueId.match(regex);
    const id = match ? match[0] : asset.uniqueId;
    if (id === slug) {
      return asset;
    }
  });
  if (!currentAsset) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      collectible: currentAsset
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const assets = await apiGetAccountUniqueTokens('0xf1ff7B66afB70cA3b2B1f6594F59187bFC5897C9', 0);
  const collectibles = assets?.map((asset: any) => {
    const regex = '^[^_]+'; 
    const match = asset.uniqueId.match(regex);
    const id = match ? match[0] : asset.uniqueId;
    return { params: { collectible: id } };
  });

  return {
    paths: collectibles,
    fallback: false
  };
};

export default CollectibleWrapper;
export { getStaticProps, getStaticPaths };
