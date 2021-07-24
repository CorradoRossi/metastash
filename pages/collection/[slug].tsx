import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import CollectionItem from '@components/collection/collection-item';

import { META } from '@lib/constants';
import { getAllCollectibles } from '@lib/cms/cms-api';
import { Collectible, CollectionPageProps } from '@lib/types';
import { useRouter } from 'next/router';
import { useAppState } from '../../state/state';
import { apiGetAccountUniqueTokens } from '@lib/web3/opensea-api';

const CollectibleWrapper = ({ collectible }: any) => {
  const { assets }: any = useAppState();
  const router = useRouter();
  const { slug } = router.query;
  console.log(collectible, 'collectible');
  console.log(slug, 'slug');
  return (
    <Page meta={META}>
      <Layout>
        <CollectionItem slug={slug} collectible={collectible} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<CollectionPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const assets = await apiGetAccountUniqueTokens('0xf1ff7B66afB70cA3b2B1f6594F59187bFC5897C9', 0);
  const currentAsset = assets.find((asset: any) => asset.slug === slug) || null;

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
  console.log(assets, 'assetssss');
  const slugs = assets.map((asset: any) => ({ params: { slug: asset.name } }));

  return {
    paths: slugs,
    fallback: false
  };
};

export default CollectibleWrapper;
export { getStaticProps, getStaticPaths };
