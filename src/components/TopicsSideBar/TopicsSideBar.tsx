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
import styles from './TopicsSideBar.module.scss';
import { SidebarContext } from '../../providers/SidebarProvider';

const TopicsSideBar: React.FC = () => {
  // const [isExpand, setIsExpand] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isExpand, setIsExpand, selectedTab, setSelectedTab } =
    useContext(SidebarContext);
  const { currentUserData } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [oneOnOneRooms, setOneOnOneRooms] = useState<OneOnOneRoomsType[]>([]);
  const [allUser, setAllUser] = useState<UserType[]>([]);
  const [showAddPeople, setShowAddPeople] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');

  const [createRoom] = useMutation(CREATE_ROOM, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.createRoom) {
        navigate(`/chat/${data.createRoom?.id}`);
      }
    },
  });

  const [getAllOneOnOneRooms] = useLazyQuery(GET_ALL_ONE_ON_ONE_ROOMS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.getAllOneOnOneRooms) {
        setOneOnOneRooms(data.getAllOneOnOneRooms);
      }
    },
  });

  const [getAllUser] = useLazyQuery(GET_ALL_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.getAllUser?.users && currentUserData) {
        setAllUser(
          data.getAllUser?.users?.filter(
            (user: UserType) => user.id !== currentUserData.id
          )
        );
      }
    },
  });

  const [checkRoomAlreadyExist] = useLazyQuery(CHECK_ROOM_ALREADY_EXIST, {
    fetchPolicy: 'no-cache',
  });

  const topics: TopicsType[] = useMemo(
    () => [
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
    ],
    []
  );

  const selectedMenu: TopicsType | undefined = useMemo(() => {
    return topics.find((topic) => location.pathname === topic.route);
  }, [topics, location]);

  useEffect(() => {
    if (searchParams.get('expandSideBar')) {
      setIsExpand(true);
      searchParams.delete('expandSideBar');
      setSearchParams(searchParams);
    }
    if (searchParams.get('showAddPeople')) {
      setShowAddPeople(true);
      searchParams.delete('showAddPeople');
      setSearchParams(searchParams);
    }
    if (location.pathname.includes('/chat')) {
      getAllOneOnOneRooms();
      setSelectedTab('chat');
    } else if (location.pathname.includes('/doc')) {
      setSelectedTab('topics');
    }
  }, [location]);

  useEffect(() => {
    if (showAddPeople) {
      inputRef.current?.focus();
    }
  }, [showAddPeople]);

  const debouncedSearch = debounce((value) => {
    setSearchKey(value);
    getAllUser({
      variables: {
        pagination: {
          pageNo: 1,
          perPage: 10,
          searchParam: value,
        },
      },
    });
  }, 300);

  const handleAddPeople = async (id: string) => {
    const roomData: unknown = await checkRoomAlreadyExist({
      variables: {
        senderId: currentUserData?.id,
        recipientId: id,
      },
    });
    if (
      (roomData as CheckRoomAlreadyExistResponse).checkRoomAlreadyExist
        ?.length > 0
    ) {
      navigate(
        `/chat/${
          (roomData as CheckRoomAlreadyExistResponse).checkRoomAlreadyExist?.[0]
            ?.id
        }`
      );
    } else {
      createRoom({
        variables: {
          createRoomInput: {
            users: [{ id: currentUserData?.id }, { id }],
          },
        },
      });
    }
  };

  return (
    <div className={styles.topicsSideBar}>
      <div className={styles.topicsSideBarBtn}>
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
          topics.map((topic) => (
            <Link
              key={topic.route}
              to={selectedMenu?.route === topic.route ? '#' : topic.route}
              className={`${styles.tabMenu} ${
                (selectedMenu?.route === topic.route && styles.activeTab) || ''
              }`}
            >
              {topic.name}
            </Link>
          ))
        ) : (
          // <div className={}>
          <React.Fragment>
            <div className={styles.chatSection}>
              <div className={styles.sectionHeader}>
                {showAddPeople ? (
                  <CustomInput
                    type="text"
                    theme="dark"
                    className={styles.addPeopleTextField}
                    placeholder="Search User"
                    ref={inputRef}
                    onChange={(event) => {
                      debouncedSearch(event.target.value);
                    }}
                  />
                ) : (
                  <span className={styles.addPeopleText}>Direct Messages</span>
                )}
                <img
                  className={styles.addPeopleIcon}
                  onClick={() => {
                    setShowAddPeople((prev) => !prev);
                  }}
                  src={`/assets/icons/${
                    showAddPeople ? 'ic-close.svg' : 'ic-add.svg'
                  }`}
                />
              </div>
              {showAddPeople
                ? allUser.map((user) => (
                    <span
                      key={user.id}
                      className={`${styles.userName} ${
                        roomId === user.id
                          ? styles.selectedUser
                          : styles.notSelectedUser
                      }`}
                      onClick={() => handleAddPeople(user.id)}
                      title={user?.userName ?? user?.emailId}
                    >
                      {user?.userName ?? user?.emailId}
                    </span>
                  ))
                : oneOnOneRooms.map((room) => {
                    const recipient = room?.users?.find(
                      (user) => user.id !== currentUserData?.id
                    );
                    return (
                      <span
                        key={room.id}
                        className={`${styles.userName} ${
                          roomId === room?.id
                            ? styles.selectedUser
                            : styles.notSelectedUser
                        }`}
                        onClick={() => navigate(`/chat/${room?.id}`)}
                        title={recipient?.userName ?? recipient?.emailId}
                      >
                        {recipient?.userName ?? recipient?.emailId}
                      </span>
                    );
                  })}
            </div>
            <div className={styles.chatSection}>
              <span className={styles.sectionHeader}>Groups</span>
            </div>
          </React.Fragment>
          // </div>
        )}
      </div>
    </div>
  );
};

export default TopicsSideBar;
