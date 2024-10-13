import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AppContext } from '../../../providers/AppProvider';
import debounce from 'lodash.debounce';
import CustomInput from '../../../sharedComponent/CustomInput/CustomInput';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  CheckRoomAlreadyExistResponse,
  OneOnOneRoomsType,
  UserType,
} from '../../../interfaces/ChatInterface';
import {
  CREATE_ROOM,
  GET_ALL_ONE_ON_ONE_ROOMS,
  GET_ALL_USER,
  CHECK_ROOM_ALREADY_EXIST,
} from '../../../queries/ChatQuery';
import styles from './ChatSideBar.module.scss';

const ChatSideBar: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUserData } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAddPeople, setShowAddPeople] = useState<boolean>(false);
  const [oneOnOneRooms, setOneOnOneRooms] = useState<OneOnOneRoomsType[]>([]);
  const [allUser, setAllUser] = useState<UserType[]>([]);
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

  useEffect(() => {
    if (searchParams.get('showAddPeople')) {
      setShowAddPeople(true);
      searchParams.delete('showAddPeople');
      setSearchParams(searchParams);
    }
    if (location.pathname.includes('/chat')) {
      getAllOneOnOneRooms();
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
          src={`/assets/icons/${showAddPeople ? 'ic-close.svg' : 'ic-add.svg'}`}
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
  );
};

export default ChatSideBar;
