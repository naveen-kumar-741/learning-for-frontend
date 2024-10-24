import React from 'react';
import { OnThisPageProps } from '../../interfaces/DocInterface';
import styles from './OnThisPage.module.scss';

const OnThisPage: React.FC<OnThisPageProps> = ({
  referenceLink,
  externalReferenceLink,
}) => {
  return (
    <div className={styles.onThisPage}>
      <span className={styles.onThisPageHeading}>On this page</span>
      {referenceLink.map((linkDetails) => (
        <a
          key={linkDetails.name}
          className={styles.links}
          href={linkDetails.link}
        >
          {linkDetails.name}
        </a>
      ))}
      <span className={styles.onThisPageHeading}>External Reference Links</span>
      {externalReferenceLink.map((linkDetails) => (
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
