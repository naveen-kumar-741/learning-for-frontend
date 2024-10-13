import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { config } from '../configs/config';

interface ChatContextType {
  chatSocket: Socket;
}
const defaultSocket = io({
  autoConnect: false,
});

export const ChatContext = createContext<ChatContextType>({
  chatSocket: defaultSocket,
});

export default function ChatProvider({ children }: PropsWithChildren) {
  const [chatSocket, setChatSocket] = useState<Socket>(defaultSocket);
  useEffect(() => {
    const socket = io(config.backend_url, {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('Chat connection success');
    });
    setChatSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider value={{ chatSocket }}>
      {children}
    </ChatContext.Provider>
  );
}
