import { DEFAULT_USER, META } from '@lib/constants';
import { SkipNavContent } from '@reach/skip-nav';
import HomeContent from '@components/index';
import Page from '@components/layout/page';

const Home = () => {
  return (
    <Page meta={META} fullViewport>
      <SkipNavContent />
      <HomeContent defaultUserData={DEFAULT_USER} defaultPageState={'registration'} />
    </Page>
  );
};

export default Home;
