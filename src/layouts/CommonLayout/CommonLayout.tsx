import Header from '../../components/Header/Header';
import TopicsSideBar from '../../components/TopicsSideBar/TopicsSideBar';
import styles from './CommonLayout.module.scss';

interface PropType {
  component: React.FC;
}

const CommonLayout: React.FC<PropType> = ({ component: Component }) => {
  return (
    <div className={styles.commonLayout}>
      <Header />
      <div className={styles.childContainer}>
        <TopicsSideBar />
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
