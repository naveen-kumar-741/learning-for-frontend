import React, { useMemo } from 'react';
import { TopicsType } from '../../../interfaces/DocInterface';
import { Link, useLocation } from 'react-router-dom';
import styles from './TopicsSideBar.module.scss';

const TopicsSideBar: React.FC = () => {
  const location = useLocation();
  const topics: TopicsType[] = [
    {
      name: 'Introduction',
      route: '/doc',
    },
    {
      name: 'Image Preview Demo',
      route: '/img-preview-demo',
    },
    {
      name: 'Maintaining Context',
      route: '/maintain-context',
    },
  ];

  const selectedMenu: TopicsType | undefined = useMemo(() => {
    return topics.find((topic) => location.pathname === topic.route);
  }, [topics, location]);
  return topics.map((topic) => (
    <Link
      key={topic.route}
      to={selectedMenu?.route === topic.route ? '#' : topic.route}
      className={`${styles.tabMenu} ${
        (selectedMenu?.route === topic.route && styles.activeTab) || ''
      }`}
    >
      {topic.name}
    </Link>
  ));
};

export default TopicsSideBar;
