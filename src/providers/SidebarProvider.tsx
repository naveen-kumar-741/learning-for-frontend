import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

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
  const [isExpand, setIsExpand] = useState<boolean>(
    window.location.pathname?.includes('/chat')
  );
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    window.location.pathname?.includes('/chat') ? 'chat' : 'topics'
  );
  return (
    <SidebarContext.Provider
      value={{ isExpand, setIsExpand, selectedTab, setSelectedTab }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
