import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ChatComponentProps,
  GetRoomByIdResponse,
  RoomDataType,
} from '../../interfaces/ChatInterface';
import { useLazyQuery } from '@apollo/client';
import { GET_ROOM_BY_ID } from '../../queries/ChatQuery';
import { useParams, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../providers/AppProvider';
import ChatBlock from '../../components/ChatBlock/ChatBlock';
import ChatTextBox from '../../components/ChatTextBox/ChatTextBox';
import styles from './ChatComponent.module.scss';

const ChatComponent: React.FC<ChatComponentProps> = () => {
  const { roomId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUserData } = useContext(AppContext);
  const [roomDetails, setRoomDetails] = useState<RoomDataType>();
  const [getRoomById] = useLazyQuery(GET_ROOM_BY_ID, {
    fetchPolicy: 'no-cache',
    onCompleted: (data: { getRoomById: GetRoomByIdResponse }) => {
      const formattedData: RoomDataType = {
        id: data.getRoomById.id,
        roomName: data.getRoomById.roomName,
        recipient: data.getRoomById.users.find(
          (user) => user.id !== currentUserData?.id
        ),
      };
      setRoomDetails(formattedData);
    },
  });

  useEffect(() => {
    getRoomById({
      variables: {
        id: roomId,
      },
    });
  }, [roomId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <section className={styles.chatComponent}>
      <div className={styles.chatHeader}>
        {roomDetails?.recipient?.profileUrl && (
          <img
            className={styles.recipientProfilePic}
            src={roomDetails?.recipient?.profileUrl}
            alt="profile pic"
          />
        )}
        <span>
          {roomDetails?.recipient?.userName ?? roomDetails?.recipient?.emailId}
        </span>
      </div>
      <section
        ref={chatContainerRef}
        className={`${styles.chatSection} hide-scroll-bar`}
      >
        {roomId && roomDetails ? (
          <ChatBlock
            roomDetails={roomDetails}
            scrollToBottom={scrollToBottom}
          />
        ) : (
          <div className={styles.conversationNotSelected}>
            <span>No Conversation Selected</span>
            <button
              className={styles.startConversationBtn}
              onClick={() => {
                searchParams.append('showAddPeople', 'true');
                setSearchParams(searchParams);
              }}
            >
              Start Conversation
            </button>
          </div>
        )}
      </section>
      <ChatTextBox />
    </section>
  );
};

export default ChatComponent;
