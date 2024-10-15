import { Dispatch, SetStateAction } from 'react';

export interface UserType {
  id: string;
  emailId: string;
  userName: string;
  profileUrl?: string;
}

export interface RoomsType {
  id: string;
  roomName: string;
  roomIconUrl?: string;
  users: UserType[];
}

export interface ChatComponentProps {}

interface RoomType {
  id: string;
  roomName: string;
}

export interface CheckRoomAlreadyExistResponse {
  checkRoomAlreadyExist: RoomType[];
}

export interface MessageType {
  message: string;
  id: string;
  user: UserType;
  room: {
    id: string;
  };
  createdAt?: Date;
}

export interface GetRoomByIdResponse extends RoomType {
  users: UserType[];
  messages: MessageType[];
}

export interface RoomDataType extends RoomType {
  recipient: UserType | undefined;
}

export interface ChatBlockProps {
  roomDetails: RoomDataType;
  scrollToBottom: () => void;
}

export interface ChatTextBoxProps {}

type ChatSideBarType = 'chat' | 'group';
export interface ChatSideBarProps {
  type: ChatSideBarType;
}

export interface ConversationSideBarProps {
  handleAddConversation: (id: string[] | string) => void;
  type: ChatSideBarType;
  handleSearch: (key: string) => void;
  showAddTextField: boolean;
  setShowAddTextField: Dispatch<SetStateAction<boolean>>;
  searchData: any[];
  conversationData: any[];
}
