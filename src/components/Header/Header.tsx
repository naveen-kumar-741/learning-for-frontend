import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img
          className={styles.logo}
          src="/assets/images/logo_final.jpg"
          alt="logo"
        />
        <div className={styles.profileIcon} />
      </div>
    </header>
  );
};

export default Header;
