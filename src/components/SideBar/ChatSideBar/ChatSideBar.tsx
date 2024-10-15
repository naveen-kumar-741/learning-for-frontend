import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AppContext } from '../../../providers/AppProvider';
import debounce from 'lodash.debounce';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckRoomAlreadyExistResponse,
  RoomsType,
  UserType,
} from '../../../interfaces/ChatInterface';
import {
  CREATE_ROOM,
  GET_ALL_ONE_ON_ONE_ROOMS,
  GET_ALL_USER,
  CHECK_ROOM_ALREADY_EXIST,
} from '../../../queries/ChatQuery';
import ConversationSideBar from '../../../sharedComponent/ConversationSideBar/ConversationSideBar';

const ChatSideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUserData } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAddPeople, setShowAddPeople] = useState<boolean>(false);
  const [oneOnOneRooms, setOneOnOneRooms] = useState<RoomsType[]>([]);
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
      if (data.getAllUser?.users && currentUserData?.id) {
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

  const handleAddPeople = async (id: string[] | string) => {
    if (typeof id === 'string') {
      const roomData = await checkRoomAlreadyExist({
        variables: {
          senderId: currentUserData?.id,
          recipientId: id,
        },
      });
      if (
        (roomData.data as CheckRoomAlreadyExistResponse).checkRoomAlreadyExist
          ?.length > 0
      ) {
        navigate(
          `/chat/${
            (roomData.data as CheckRoomAlreadyExistResponse)
              .checkRoomAlreadyExist?.[0]?.id
          }`
        );
      } else {
        createRoom({
          variables: {
            createRoomInput: {
              users: [{ id: currentUserData?.id }, { id: id }],
            },
          },
        });
      }
    }
  };

  return (
    <ConversationSideBar
      handleAddConversation={handleAddPeople}
      type={'chat'}
      handleSearch={debouncedSearch}
      showAddTextField={showAddPeople}
      setShowAddTextField={setShowAddPeople}
      searchData={allUser}
      conversationData={oneOnOneRooms}
    />
  );
};

export default ChatSideBar;
