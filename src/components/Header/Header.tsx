import React, { useContext } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../../providers/AppProvider';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { currentUserData, handleSignOut } = useContext(AppContext);
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img
          className={styles.logo}
          src="/assets/images/logo_final.jpg"
          alt="logo"
        />
        <OverlayTrigger
          placement="bottom-end"
          rootClose
          trigger={'click'}
          overlay={
            <Popover id="profileIcon">
              <div className={styles.profilePopover}>
                {currentUserData ? (
                  <React.Fragment>
                    <Link className={styles.profileOption} to={'/profile'}>
                      EditProfile
                    </Link>
                    <span
                      className={styles.profileOption}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </span>
                  </React.Fragment>
                ) : (
                  <Link className={styles.profileOption} to={'/sign-in'}>
                    Sign In
                  </Link>
                )}
              </div>
            </Popover>
          }
        >
          {currentUserData?.profileUrl ? (
            <img
              src={currentUserData.profileUrl}
              className={styles.profileIcon}
            />
          ) : (
            <div className={`${styles.profileIcon} ${styles.default}`} />
          )}
        </OverlayTrigger>
      </div>
    </header>
  );
};

export default Header;
