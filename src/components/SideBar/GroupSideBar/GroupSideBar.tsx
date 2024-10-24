import React, { useContext, useEffect, useState } from 'react';
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
  GET_ALL_GROUPS,
} from '../../../queries/ChatQuery';
import ConversationSideBar from '../../../sharedComponent/ConversationSideBar/ConversationSideBar';

const GroupSideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUserData } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAddGroup, setShowAddGroup] = useState<boolean>(false);
  const [allGroup, setAllGroups] = useState<RoomsType[]>([]);
  const [searchResult, setSearchResult] = useState<UserType[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');

  const [createRoom] = useMutation(CREATE_ROOM, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.createRoom) {
        navigate(`/chat/${data.createRoom?.id}`);
      }
    },
  });

  const [getAllGroups] = useLazyQuery(GET_ALL_GROUPS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.getAllGroups) {
        setAllGroups(data.getAllGroups?.rooms);
      }
    },
  });

  const [getAllUser] = useLazyQuery(GET_ALL_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.getAllUser?.users && currentUserData?.id) {
        setSearchResult(
          data.getAllUser?.users?.filter(
            (user: UserType) => user.id !== currentUserData.id
          )
        );
      }
    },
  });

  useEffect(() => {
    if (searchParams.get('showAddGroup')) {
      setShowAddGroup(true);
      searchParams.delete('showAddGroup');
      setSearchParams(searchParams);
    }
    if (location.pathname.includes('/chat')) {
      getAllGroups({
        variables: {
          pagination: {
            pageNo: 1,
            perPage: 100,
            searchParam: '',
          },
        },
      });
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

  const handleAddGroup = async (id: string[] | string) => {
    if (typeof id !== 'string') {
      createRoom({
        variables: {
          createRoomInput: {
            users: [
              { id: currentUserData?.id },
              // converting string[] to array of object
              ...id.map((data) => ({ id: data })),
            ],
          },
        },
      });
    }
  };

  return (
    <ConversationSideBar
      handleAddConversation={handleAddGroup}
      type={'group'}
      handleSearch={debouncedSearch}
      showAddTextField={showAddGroup}
      setShowAddTextField={setShowAddGroup}
      searchData={searchResult}
      conversationData={allGroup}
    />
  );
};

export default GroupSideBar;
