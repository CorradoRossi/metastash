import { SkipNavContent } from '@reach/skip-nav';

import Page from '@components/layout/page';
import HomeContent from '@components/index';
import { META } from '@lib/constants';

const Home = () => {
  return (
    <Page meta={META} fullViewport>
      <SkipNavContent />
      <HomeContent defaultUserData={{}} />
    </Page>
  );
};

export default Home;
