import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

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
    const socket = io('http://localhost:3002/', {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    setChatSocket(socket);
    console.log('render check');
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
