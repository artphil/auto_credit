import { ReactNode, createContext, useContext, useState } from "react";
import LocalService from "services/LocalService";
import UserType from "types/UserType";

type GlobalContextProps = {
  getUser: () => UserType | null;
  reset: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useData precisa estar em GlobalProvider');
  return context;
};

interface GlobalProvidertProps {
  children: ReactNode
}

function GlobalProvider(props: GlobalProvidertProps) {
  const { getToken } = LocalService();

  const [user, setUser] = useState<UserType | null>(null);

  function reset() {
    setUser(null);
  }

  function getUser() {
    if (user) {
      return user;
    }
    return null;
  }

  return (
    <GlobalContext.Provider value={{
      getUser,
      reset,
      setUser
    }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;