import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

type SelectedTab = 'chat' | 'topics';

interface SidebarContextType {
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  selectedTab: SelectedTab;
  setSelectedTab: Dispatch<SetStateAction<SelectedTab>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  isExpand: false,
  setIsExpand: () => {},
  selectedTab: 'chat',
  setSelectedTab: () => {},
});

export default function SideBarProvider({ children }: PropsWithChildren) {
  const hashPathname = window.location.hash.replace('#', '');

  const [isExpand, setIsExpand] = useState<boolean>(
    hashPathname?.includes('/chat')
  );
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    hashPathname?.includes('/chat') ? 'chat' : 'topics'
  );
  return (
    <SidebarContext.Provider
      value={{ isExpand, setIsExpand, selectedTab, setSelectedTab }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
