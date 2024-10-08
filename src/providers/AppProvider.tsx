import {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { IntlProvider } from "react-intl";
import messages from "../utils/messages";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import { GET_CURRENT_USER } from "../queries/AuthQuery";
import { signOut } from "aws-amplify/auth";

interface SidebarContextType {
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
}

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

export const SidebarContext = createContext<SidebarContextType>({
  isExpand: false,
  setIsExpand: () => {},
});

export const AppContext = createContext<AppContextType>({
  currentUserData: undefined,
  refetchCurrentUserData: async () => {},
  handleSignOut: () => {},
});

export default function AppProvider({ children }: PropsWithChildren) {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>();
  const locale = "en";

  const [getCurrentUserData] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setCurrentUserData(data?.getCurrentUserData);
    },
    onError: (err) => {
      console.log("Error on GetCurrentUser", err.message);
      setCurrentUserData(undefined);
    },
  });

  const refetchCurrentUserData = async () => {
    if (localStorage.getItem("jwtToken")) {
      await getCurrentUserData();
    } else {
      console.log("Token not found");
      setCurrentUserData(undefined);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    localStorage.clear();
    setCurrentUserData(undefined);
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
        <SidebarContext.Provider value={{ isExpand, setIsExpand }}>
          {children}
        </SidebarContext.Provider>
      </AppContext.Provider>
    </IntlProvider>
  );
}
