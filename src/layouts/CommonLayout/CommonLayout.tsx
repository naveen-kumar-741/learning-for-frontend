import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import styles from './CommonLayout.module.scss';

interface PropType {
  component: React.FC;
}

const CommonLayout: React.FC<PropType> = ({ component: Component }) => {
  return (
    <div className={styles.commonLayout}>
      <Header />
      <div className={styles.childContainer}>
        <SideBar />
        <div className={styles.componentContainer}>
          <div className={styles.componentBlock}>
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
