import cn from 'classnames';
import Tilt from 'vanilla-tilt';
import { useRef, useEffect, useState } from 'react';
import { TicketGenerationState } from '@lib/types';
import isMobileOrTablet from '@lib/is-mobile-or-tablet';
import { scrollTo } from '@lib/smooth-scroll';
import styles from 'styles/ticket.module.css';
import styleUtils from 'styles/utils.module.css';
import TicketForm from './ticket-form';
import TicketVisual from './ticket-visual';
import TicketActions from './ticket-actions';
import TicketCopy from './ticket-copy';
import { SITE_NAME } from '@lib/constants';
import Form from '../form/form';
import { format } from 'date-fns';
import { TicketProps } from '@lib/types';

const Ticket = ({ username, name, ticketNumber, sharePage }: TicketProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [ticketGenerationState, setTicketGenerationState] = useState<TicketGenerationState>(
    'default'
  );

  useEffect(() => {
    if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 5,
        'max-glare': 0.16,
        'full-page-listening': true
      });
    }
  }, [ticketRef]);

  useEffect(() => {
    if (!sharePage && divRef && divRef.current && isMobileOrTablet()) {
      scrollTo(divRef.current, -30);
    }
  }, [divRef, sharePage]);

  return (
    <div
      className={cn(styles['ticket-layout'], {
        [styles['ticket-share-layout']]: sharePage
      })}
    >
      <div ref={divRef}>
        <div className={styles['ticket-text']}>
          <h2 className={cn(styles.hero, styleUtils.appear, styleUtils['appear-first'])}>
            {sharePage ? (
              name ? (
                <>{name}’s Ticket</>
              ) : (
                <>{SITE_NAME}</>
              )
            ) : (
              <>
                You're in. <br /> Make it unique.
              </>
            )}
          </h2>
          <p className={cn(styles.description, styleUtils.appear, styleUtils['appear-second'])}>
            {sharePage ? (
              <>
                Join {name ?? 'them'} on {format(new Date(), 'MMM, dd, yyyy')}.
              </>
            ) : (
              <>
                Generate a unique ticket image with <br className={styleUtils['hide-on-mobile']} />
                your GitHub profile.
              </>
            )}
          </p>
        </div>
        <div className={cn(styleUtils.appear, styleUtils['appear-third'])}>
          {!sharePage ? (
            <TicketForm
              defaultUsername={username}
              setTicketGenerationState={setTicketGenerationState}
            />
          ) : (
            <Form sharePage />
          )}
        </div>
      </div>
      <div className={styles['ticket-visual-wrapper']}>
        <div
          ref={ticketRef}
          className={cn(styles['ticket-visual'], styleUtils.appear, styleUtils['appear-fourth'])}
        >
          <TicketVisual
            username={username}
            name={name}
            ticketNumber={ticketNumber}
            ticketGenerationState={ticketGenerationState}
          />
        </div>
        {!sharePage && (
          <>
            {username ? (
              <div>
                <div className={styles['ticket-actions']}>
                  <TicketActions username={username} />
                </div>
                <div className={styles['ticket-copy']}>
                  <TicketCopy username={username} />
                </div>
              </div>
            ) : (
              <div className={styles['ticket-actions-placeholder']} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Ticket;
