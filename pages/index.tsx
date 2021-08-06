import { SkipNavContent } from '@reach/skip-nav';

import Page from '@components/layout/page';
import HomeContent from '@components/index';
import { DEFAULT_USER, META } from '@lib/constants';

import { useLastTradedNFTs } from '../lib/hooks/useLastTradedNFTs';
import { Token } from '../components/Token';
import { Form } from '../components/Form';

const Home = () => {
  const { loading, error, nfts } = useLastTradedNFTs();
  return (
    <Page meta={META} fullViewport>
      <SkipNavContent />
      <Form />
      <HomeContent defaultUserData={DEFAULT_USER} defaultPageState={'registration'} />
      {nfts.map((nft: any) => (
        <Token key={nft.transferId} {...nft} />
      ))}
    </Page>
  );
};

export default Home;
