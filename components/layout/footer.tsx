import cn from 'classnames';
import MetastashLogo from '@components/icons/icon-logo-3';
import styles from 'styles/footer.module.css';
import { COPYRIGHT_HOLDER, SITE_NAME, CODE_OF_CONDUCT, LEGAL_URL, REPO } from '@lib/constants';

const Hosted = () => {
  return (
    <a
      href="https://metastash.com/discord"
      className={cn(styles['footer-link'], styles['footer-logo'])}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className={styles['secondary-text']}>Don't take it too seriously </div>
      <MetastashLogo color="white" />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className={cn(styles.footer)} style={{ marginTop: '1em' }}>
      <div className={styles['footer-legal']}>
        <div className={styles['footer-hostedby']}>
          <div className={styles['footer-separator']} />
        </div>
        <div className={styles['footer-copyright']}>
          Copyright © {`${new Date().getFullYear()} `} {`${SITE_NAME}`}
        </div>
        <div className={styles['footer-center-group']}>
          <p className={styles['footer-paragraph']}>
            <a
              href={REPO}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </p>
          <div className={styles['footer-separator']} />
          <p className={styles['footer-paragraph']}>
            <a
              href={CODE_OF_CONDUCT}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct
            </a>
          </p>
          {LEGAL_URL && (
            <>
              <div className={styles['footer-separator']} />
              <p className={styles['footer-paragraph']}>
                <a
                  href={LEGAL_URL}
                  className={styles['footer-link']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Legal
                </a>
              </p>
            </>
          )}
        </div>
        {<Hosted />}
      </div>
    </footer>
  );
};

export default Footer;
