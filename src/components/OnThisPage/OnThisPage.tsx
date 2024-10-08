import React from 'react';
import { OnThisPageProps } from '../../interfaces/DocInterface';
import styles from './OnThisPage.module.scss';

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
