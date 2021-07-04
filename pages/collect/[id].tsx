import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/layout/page';
import Layout from '@components/layout/layout';
import CollectionItem from '@components/collection/collect-item';
import fetchData from 'lib/hooks/fetchData';

import { META } from '@lib/constants';

const CollectibleWrapper = ({ params }: any) => {
  const id = params?.id;
  const collectibles: any = fetchData();
  console.log(collectibles, 'collectibles');
  const currentCollectible = collectibles.find((s: any) => s.id === id) || null;
  return (
    <Page meta={META}>
      <Layout>
        <CollectionItem parameters={params} collectible={currentCollectible} />
      </Layout>
    </Page>
  );
};

const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  return {
    props: {
      params: params
    },
    revalidate: 60
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const collectibles: any = fetchData();
  const ids = collectibles.assets;
  return {
    paths: ids,
    fallback: false
  };
};

export default CollectibleWrapper;
export { getStaticProps, getStaticPaths };
