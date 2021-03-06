import cn from 'classnames';
import styleUtils from 'styles/utils.module.css';
import styles from 'styles/hero.module.css';
import { BRAND_NAME, SITE_DESCRIPTION } from '@lib/constants';
import { format } from 'date-fns';
import  Discord from '@components/icons/icon-discord';
import Twitter from '@components/icons/icon-twitter';
import Github from '@components/icons/icon-github';

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-mobile'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <h1 className={cn(styleUtils.appear, styleUtils['appear-third'], styles.hero)}>
        {BRAND_NAME}
        <br className={styleUtils['show-on-desktop']} />
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-tablet'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info)}>
        <p>A <strong>web3</strong> experiment</p>
        <div className={styles['description-separator']} />
          <div className="icons">
            <a className="icon" href="https://twitter.com/metastash">
              <Twitter />
            </a>
            <a className="icon" href="https://github.com/CorradoRossi/metastash">
              <Github />
            </a>
            <a className="icon" href="https://discord.gg/U2sKKjqZ2n">
              <Discord />
            </a>
          </div>
        {/*<p>{format(new Date(), 'MMM, dd, yyyy')}</p>*/}
        <div className={styles['description-separator']} />
        <p>home of <strong>$STASH</strong> token</p>
      </div>
    </div>
  );
};

export default Hero;
