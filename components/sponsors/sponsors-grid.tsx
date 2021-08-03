import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Sponsor, SponsorsGridProps } from '@lib/types';
import styles from 'styles/sponsors-grid.module.css';

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => {
  return (
    <Link key={sponsor.name} href={`/links/${sponsor.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card, {
          [styles.diamond]: sponsor.tier === 'diamond',
          [styles.gold]: sponsor.tier === 'gold'
        })}
      >
        <div className={styles.imageWrapper}>
          <Image
            alt={sponsor.name}
            src={sponsor.cardImage.url}
            className={cn(styles.image, {
              [styles.silver]: sponsor.tier === 'silver'
            })}
            loading="lazy"
            title={sponsor.name}
            width={900}
            height={900}
          />
        </div>
        {sponsor.tier !== 'silver' && (
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{sponsor.name}</h2>
              <p className={styles.description}>{sponsor.description}</p>
            </div>
          </div>
        )}
      </a>
    </Link>
  );
};

const SponsorsGrid = ({ sponsors }: SponsorsGridProps) => {
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const otherSponsors = sponsors.filter(s => s.tier !== 'silver');

  return (
    <>
      <div className={styles.grid}>
        {otherSponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
      <div className={styles.grid}>
        {silverSponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </>
  );
};

export default SponsorsGrid;
