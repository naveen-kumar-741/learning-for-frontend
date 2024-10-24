import React, { KeyboardEvent, useContext, useRef } from 'react';
import { ChatTextBoxProps } from '../../interfaces/ChatInterface';
import CustomInput from '../../sharedComponent/CustomInput/CustomInput';
import { AppContext } from '../../providers/AppProvider';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../../providers/ChatProvider';
import styles from './ChatTextBox.module.scss';

const ChatTextBox: React.FC<ChatTextBoxProps> = () => {
  const { roomId } = useParams();
  const { currentUserData } = useContext(AppContext);
  const { chatSocket } = useContext(ChatContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (inputRef.current) {
      chatSocket.emit('chat', {
        message: inputRef.current.value,
        user: {
          id: currentUserData?.id,
        },
        room: {
          id: roomId,
        },
      });
      //   createMessage({
      //     variables: {
      //       createMessageInput: {
      //         message: inputRef.current.value,
      //         user: {
      //           id: currentUserData?.id,
      //         },
      //         room: {
      //           id: roomId,
      //         },
      //       },
      //     },
      //   });
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        sendMessage();
      }
    }
  };
  return (
    <div className={styles.chatMessageField}>
      <CustomInput
        type="text"
        theme="dark"
        placeholder="Enter your message"
        style={{ border: '0.5px solid rgba(255, 255, 255, 0.1)' }}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <img
        className={styles.sendIcon}
        src="/learning-for-frontend/assets/icons/ic-send.svg"
        alt="sendIcon"
        onClick={() => sendMessage()}
      />
    </div>
  );
};

export default ChatTextBox;
