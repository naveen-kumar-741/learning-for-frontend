import {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { IntlProvider } from 'react-intl';
import messages from '../utils/messages';
import { useLazyQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../queries/AuthQuery';
import { signOut } from 'aws-amplify/auth';
import { useLocation } from 'react-router-dom';
import SideBarProvider from './SidebarProvider';
import ChatProvider from './ChatProvider';

interface CurrentUserData {
  id: string;
  userName: string;
  emailId: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  profileUrl: string;
}
interface AppContextType {
  currentUserData: CurrentUserData | undefined;
  refetchCurrentUserData: () => Promise<void>;
  handleSignOut: () => void;
}

export const AppContext = createContext<AppContextType>({
  currentUserData: undefined,
  refetchCurrentUserData: async () => {},
  handleSignOut: () => {},
});

export default function AppProvider({ children }: PropsWithChildren) {
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>();
  const locale = 'en';

  const [getCurrentUserData] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setCurrentUserData(data?.getCurrentUserData);
    },
    onError: (err) => {
      console.log('Error on GetCurrentUser', err.message);
      if (err.message !== 'ACCESS_TOKEN_EXPIRED') {
        // handleSignOut();
      }
    },
  });

  const refetchCurrentUserData = async () => {
    if (localStorage.getItem('jwtToken')) {
      await getCurrentUserData();
    } else {
      console.log('Token not found');
      handleSignOut('Token not found');
    }
  };

  const handleSignOut = async (error?: string) => {
    localStorage.clear();
    setCurrentUserData(undefined);
    if (error !== 'Token not found') {
      await signOut();
      window.location.reload();
    }
  };

  useEffect(() => {
    refetchCurrentUserData();
  }, []);

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale={locale}
    >
      <AppContext.Provider
        value={{
          currentUserData,
          refetchCurrentUserData: refetchCurrentUserData,
          handleSignOut,
        }}
      >
        <ChatProvider>
          <SideBarProvider>{children}</SideBarProvider>
        </ChatProvider>
      </AppContext.Provider>
    </IntlProvider>
  );
}
