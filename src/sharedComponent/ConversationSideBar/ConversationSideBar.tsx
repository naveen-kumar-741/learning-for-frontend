import React, { useContext, useEffect, useRef } from 'react';
import { ConversationSideBarProps } from '../../interfaces/ChatInterface';
import CustomInput from '../CustomInput/CustomInput';
import styles from './ConversationSideBar.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../providers/AppProvider';

const ConversationSideBar: React.FC<ConversationSideBarProps> = ({
  handleAddConversation,
  type,
  handleSearch,
  showAddTextField,
  setShowAddTextField,
  searchData,
  conversationData,
}) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { currentUserData } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showAddTextField) {
      inputRef.current?.focus();
    }
  }, [showAddTextField]);
  return (
    <div className={styles.chatSection}>
      <div className={styles.sectionHeader}>
        {showAddTextField ? (
          <CustomInput
            type="text"
            theme="dark"
            className={styles.addPeopleTextField}
            placeholder="Search User"
            ref={inputRef}
            onChange={(event) => {
              handleSearch(event.target.value);
            }}
          />
        ) : (
          <span className={styles.addPeopleText}>
            {type === 'group' ? 'Groups' : 'Direct Messages'}
          </span>
        )}
        <img
          className={styles.addPeopleIcon}
          onClick={() => {
            setShowAddTextField((prev) => !prev);
          }}
          src={`/assets/icons/${
            showAddTextField ? 'ic-close.svg' : 'ic-add.svg'
          }`}
        />
      </div>
      {showAddTextField
        ? searchData.map((user) => (
            <span
              key={user.id}
              className={`${styles.userName} ${
                roomId === user.id
                  ? styles.selectedUser
                  : styles.notSelectedUser
              }`}
              onClick={() => handleAddConversation(user.id)}
              title={user?.userName ?? user?.emailId}
            >
              {user?.userName ?? user?.emailId}
            </span>
          ))
        : conversationData.map((room) => {
            const recipient = room?.users?.find(
              (user: any) => user.id !== currentUserData?.id
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
                title={
                  room?.roomName ?? recipient?.userName ?? recipient?.emailId
                }
              >
                {room?.roomName ?? recipient?.userName ?? recipient?.emailId}
              </span>
            );
          })}
    </div>
  );
};

export default ConversationSideBar;
