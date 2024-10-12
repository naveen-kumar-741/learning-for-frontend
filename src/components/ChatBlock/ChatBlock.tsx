import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ChatBlockProps, MessageType } from '../../interfaces/ChatInterface';
import styles from './ChatBlock.module.scss';
import { AppContext } from '../../providers/AppProvider';
import { ChatContext } from '../../providers/ChatProvider';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_MESSAGES } from '../../queries/ChatQuery';
import { useParams } from 'react-router-dom';

const ChatBlock: React.FC<ChatBlockProps> = ({
  roomDetails,
  scrollToBottom,
}) => {
  const { roomId } = useParams();
  const { currentUserData } = useContext(AppContext);
  const { chatSocket } = useContext(ChatContext);

  const [allMessages, setAllMessages] = useState<MessageType[]>([]);

  const [getAllMessagesByRoomId] = useLazyQuery(GET_ALL_MESSAGES, {
    onCompleted: (data) => {
      if (data.getAllMessagesByRoomId) {
        setAllMessages(data.getAllMessagesByRoomId?.messages);
      }
    },
  });

  useEffect(() => {
    if (chatSocket.connected) {
      chatSocket.emit('join_room', {
        userId: currentUserData?.id,
      });
      chatSocket.on('chat', (message) => {
        console.log('message', message);
        setAllMessages((prev) => [...prev, message]);
      });
    }
  }, [chatSocket]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages.length]);

  useEffect(() => {
    getAllMessagesByRoomId({
      variables: {
        id: roomId,
        pagination: {
          pageNo: 1,
          perPage: 100,
          searchParam: '',
        },
      },
    });
  }, [roomId]);

  if (allMessages.length === 0) {
    return (
      <div className={styles.noMessageFound}>
        <img
          className={styles.recipientProfilePic}
          src={roomDetails.recipient?.profileUrl}
          alt="recipient profile"
        />
        <span className={styles.recipientName}>
          {roomDetails.recipient?.userName ?? roomDetails.recipient?.emailId}
        </span>
        <span className={styles.startConversationText}>
          Let's Get This Chatter Party Started!
        </span>
      </div>
    );
  }

  return (
    <div className={styles.messageBlock}>
      {allMessages &&
        allMessages.map((data, index) => (
          <span
            key={data.id ?? data.message + index}
            style={{
              alignSelf:
                data.user.id === currentUserData?.id ? 'end' : 'flex-start',
            }}
            className={styles.messageText}
          >
            {data.message}
          </span>
        ))}
    </div>
  );
};

export default ChatBlock;
