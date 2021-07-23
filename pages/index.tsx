import { SkipNavContent } from '@reach/skip-nav';

import Page from '@components/layout/page';
import HomeContent from '@components/index';
import { DEFAULT_USER, META } from '@lib/constants';

const Home = () => {
  return (
    <Page meta={META} fullViewport>
      <SkipNavContent />
      <HomeContent defaultUserData={DEFAULT_USER} defaultPageState={'registration'} />
    </Page>
  );
};

export default Home;
