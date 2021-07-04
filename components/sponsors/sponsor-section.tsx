import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { SponsorSectionProps } from '@lib/types';
import styles from 'styles/sponsor-section.module.css';
import styleUtils from 'styles/utils.module.css';

const SponsorSection = ({ sponsor }: SponsorSectionProps) => {
  return (
    <>
      <Link href="/collection">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to collection
        </a>
      </Link>
      <div className={styles.layout}>
        <iframe
          className={cn(styles.video, styleUtils.appear, styleUtils['appear-first'])}
          allow="picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="100%"
          src={`https://youtube.com/embed/${sponsor.youtubeSlug}`}
          title={sponsor.name}
          width="100%"
        />
        <div className={styles.container}>
          <div className={styles['name-and-logo']}>
            <Image
              alt={sponsor.name}
              src={sponsor.logo.url}
              className={styles.image}
              loading="lazy"
              title={sponsor.name}
              height={64}
              width={64}
            />
            <h1 className={styles.name}>{sponsor.name}</h1>
          </div>
          <p className={styles.description}>{sponsor.description}</p>
          <div className={styles['sponsor-details']}>
            <a
              href={sponsor.callToActionLink}
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              className={styles.button}
            >
              {sponsor.callToAction}
            </a>
            <a
              href={sponsor.discord}
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              className={cn(styles.button, styles['button-link'])}
            >
              Chat on Discord
            </a>
          </div>
          <div className={styles.resources}>
            <h2 className={styles.heading}>Resources</h2>
            {sponsor.links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.button, styles['button-resource'])}
              >
                <span className={styles.truncate}>{link.text}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorSection;
