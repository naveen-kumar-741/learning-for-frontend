import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash.debounce';
import { AppContext } from '../../providers/AppProvider';
import { TopicsType } from '../../interfaces/DocInterface';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CHECK_ROOM_ALREADY_EXIST,
  CREATE_ROOM,
  GET_ALL_ONE_ON_ONE_ROOMS,
  GET_ALL_USER,
} from '../../queries/ChatQuery';
import {
  CheckRoomAlreadyExistResponse,
  OneOnOneRoomsType,
  UserType,
} from '../../interfaces/ChatInterface';
import CustomInput from '../../sharedComponent/CustomInput/CustomInput';
import styles from './SideBar.module.scss';
import { SidebarContext } from '../../providers/SidebarProvider';
import TopicsSideBar from './TopicsSideBar/TopicsSideBar';
import ChatSideBar from './ChatSideBar/ChatSideBar';

const SideBar: React.FC = () => {
  // const [isExpand, setIsExpand] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isExpand, setIsExpand, selectedTab, setSelectedTab } =
    useContext(SidebarContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('expandSideBar')) {
      setIsExpand(true);
      searchParams.delete('expandSideBar');
      setSearchParams(searchParams);
    }
    if (location.pathname.includes('/chat')) {
      setSelectedTab('chat');
    } else if (location.pathname.includes('/doc')) {
      setSelectedTab('topics');
    }
  }, [location]);

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarBtn}>
        <button
          className={`${styles.sideBarTab} ${
            selectedTab === 'chat' ? styles.active : ''
          }`}
          onClick={() => {
            if (selectedTab === 'chat') {
              setIsExpand((prev) => !prev);
            } else {
              navigate('/chat?expandSideBar=true');
            }
            setSelectedTab('chat');
          }}
        >
          <span className={styles.sideBarTabText}>Chat</span>
        </button>

        <button
          className={`${styles.sideBarTab} ${
            selectedTab === 'topics' ? styles.active : ''
          }`}
          onClick={() => {
            if (selectedTab === 'topics') {
              setIsExpand((prev) => !prev);
            } else {
              navigate('/doc?expandSideBar=true');
            }
            setSelectedTab('topics');
          }}
        >
          <span className={styles.sideBarTabText}>Topics</span>
        </button>
      </div>
      <div
        className={`${styles.sideBarExpandView} ${
          isExpand ? styles.isExpand : styles.isClosed
        }`}
      >
        {selectedTab === 'topics' ? (
          <TopicsSideBar />
        ) : (
          // <div className={}>
          <React.Fragment>
            <ChatSideBar />
          </React.Fragment>
          // </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
