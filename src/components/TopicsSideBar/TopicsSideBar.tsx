import React, { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarContext } from '../../providers/AppProvider';
import styles from './TopicsSideBar.module.scss';

interface TopicsType {
  name: string;
  route: string;
}

const TopicsSideBar: React.FC = () => {
  // const [isExpand, setIsExpand] = useState<boolean>(false);
  const { isExpand, setIsExpand } = useContext(sidebarContext);
  const location = useLocation();

  const topics: TopicsType[] = useMemo(
    () => [
      {
        name: 'Home',
        route: '/home',
      },
      {
        name: 'Image Preview Demo',
        route: '/img-preview-demo',
      },
      {
        name: 'Maintaining Context',
        route: '/maintain-context',
      },
    ],
    []
  );

  const selectedMenu: TopicsType | undefined = useMemo(() => {
    return topics.find((topic) => location.pathname === topic.route);
  }, [topics, location]);

  return (
    <div className={styles.topicsSideBar}>
      <button
        className={styles.sideBarTab}
        onClick={() => {
          setIsExpand((prev) => !prev);
        }}
      >
        <span className={styles.sideBarTabText}>Topics</span>
      </button>
      <div
        className={`${styles.sideBarExpandView} ${
          isExpand ? styles.isExpand : styles.isClosed
        }`}
      >
        {topics.map((topic) => (
          <Link
            key={topic.route}
            to={selectedMenu?.route === topic.route ? '#' : topic.route}
            className={`${styles.tabMenu} ${
              (selectedMenu?.route === topic.route && styles.activeTab) || ''
            }`}
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsSideBar;
