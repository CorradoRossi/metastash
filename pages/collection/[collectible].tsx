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
    if (asset.name === slug) {
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
    return { params: { collectible: asset.name } };
  });

  return {
    paths: collectibles,
    fallback: false
  };
};

export default CollectibleWrapper;
export { getStaticProps, getStaticPaths };
