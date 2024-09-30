import {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface SidebarContextType {
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
}

export const sidebarContext = createContext<SidebarContextType>({
  isExpand: false,
  setIsExpand: () => {},
});

export default function AppProvider({ children }: PropsWithChildren) {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  return (
    <sidebarContext.Provider value={{ isExpand, setIsExpand }}>
      {children}
    </sidebarContext.Provider>
  );
}
