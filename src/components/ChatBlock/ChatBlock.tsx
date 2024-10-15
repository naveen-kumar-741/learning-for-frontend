import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ChatBlockProps, MessageType } from '../../interfaces/ChatInterface';
import styles from './ChatBlock.module.scss';
import { AppContext } from '../../providers/AppProvider';
import { ChatContext } from '../../providers/ChatProvider';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_MESSAGES } from '../../queries/ChatQuery';
import { useParams } from 'react-router-dom';
import { compareWithCurrentTime, formatTimestamp } from '../../utils/helper';

const ChatBlock: React.FC<ChatBlockProps> = ({
  roomDetails,
  scrollToBottom,
}) => {
  const { roomId } = useParams();
  const { currentUserData } = useContext(AppContext);
  const { chatSocket } = useContext(ChatContext);

  const [allMessages, setAllMessages] = useState<MessageType[]>([]);

  const [getAllMessagesByRoomId] = useLazyQuery(GET_ALL_MESSAGES, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data.getAllMessagesByRoomId) {
        setAllMessages([...data.getAllMessagesByRoomId?.messages]);
      }
    },
  });

  useEffect(() => {
    if (chatSocket.connected) {
      const handleMessage = (message: MessageType) => {
        if (message.room.id === roomId) {
          setAllMessages((prev) => [...prev, message]);
        }
      };
      chatSocket.emit('join_room', {
        userId: currentUserData?.id,
      });
      chatSocket.on('chat', handleMessage);
      return () => {
        chatSocket.removeListener('chat', handleMessage);
      };
    }
  }, [chatSocket, roomId, currentUserData?.id]);

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
          searchParam: null,
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
          {roomDetails.roomName ??
            roomDetails.recipient?.userName ??
            roomDetails.recipient?.emailId}
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
          <div
            className={styles.textBlock}
            key={data.id ?? data.message + index}
            style={{
              alignSelf:
                data.user.id === currentUserData?.id
                  ? 'flex-end'
                  : 'flex-start',
              textAlign: data.user.id === currentUserData?.id ? 'end' : 'start',
            }}
          >
            <div
              className={styles.userInfo}
              style={{
                justifyContent:
                  data.user.id === currentUserData?.id
                    ? 'flex-end'
                    : 'flex-start',
              }}
            >
              <img
                className={styles.userImg}
                src={data.user.profileUrl}
                alt="userImg"
              />
              {data.createdAt && (
                <MessageSentOrReceivedAt time={data.createdAt} />
              )}
            </div>
            <span
              className={styles.messageText}
              style={{
                borderRadius:
                  data.user.id === currentUserData?.id
                    ? '10px 10px 0px 10px'
                    : '10px 10px 10px 0px',
              }}
            >
              {data.message}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ChatBlock;

const MessageSentOrReceivedAt: React.FC<{ time: Date }> = ({ time }) => {
  const [currentMinutes, setCurrentMinutes] = useState(
    Math.floor(new Date().getTime() / (1000 * 60))
  );
  const inputTime = new Date(time);

  // Extract minute-level timestamps by removing seconds and milliseconds
  const timeInMinutes = Math.floor(inputTime.getTime() / (1000 * 60));
  const difference = currentMinutes - timeInMinutes;

  useEffect(() => {
    if (difference <= 5) {
      // Update every minute
      const intervalId = setInterval(() => {
        setCurrentMinutes(Math.floor(new Date().getTime() / (1000 * 60)));
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [difference]);

  if (difference === 0) {
    return <span>Now</span>;
  } else if (difference <= 5) {
    return <span>{`${difference} min${difference > 1 ? 's' : ''} ago`}</span>;
  }
  return <span>{formatTimestamp(time)}</span>;
};
