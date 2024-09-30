import React from 'react';
import { ReferenceLinkType } from '../../sharedComponent/ContentRenderer';
import styles from './OnThisPage.module.scss';

interface OnThisPageProps {
  // sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  referenceLink: ReferenceLinkType[];
}

const OnThisPage: React.FC<OnThisPageProps> = ({ referenceLink }) => {
  return (
    <div className={styles.onThisPage}>
      <span className={styles.onThisPageHeading}>Reference Links</span>
      {referenceLink.map((linkDetails) => (
        <a
          key={linkDetails.name}
          className={styles.links}
          href={linkDetails.link}
          target="_blank"
          rel="noreferrer"
        >
          {linkDetails.name}
        </a>
      ))}
    </div>
  );
};

export default OnThisPage;
