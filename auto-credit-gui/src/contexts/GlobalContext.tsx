import { ReactNode, createContext, useContext, useState } from "react";
import UserType from "types/UserType";

type GlobalContextProps = {
  user: UserType | null;
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
  const [user, setUser] = useState<UserType | null>(null);

  function reset() {
    setUser(null);
  }

  return (
    <GlobalContext.Provider value={{
      user,
      reset,
      setUser
    }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;