import { ReactNode, createContext, useContext, useState } from "react";
import CompanyType from "types/CompanyType";
import EmploymentType from "types/EmploymentType";
import PersonType from "types/PersonType";
import UserType from "types/UserType";

type GlobalContextProps = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  person: PersonType | null;
  setPerson: React.Dispatch<React.SetStateAction<PersonType | null>>;
  company: CompanyType | null;
  setCompany: React.Dispatch<React.SetStateAction<CompanyType | null>>;
  employment: EmploymentType | null;
  setEmployment: React.Dispatch<React.SetStateAction<EmploymentType | null>>;
  reset: () => void;
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
  const [person, setPerson] = useState<PersonType | null>(null);
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [employment, setEmployment] = useState<EmploymentType | null>(null);

  function reset() {
    setUser(null);
  }

  return (
    <GlobalContext.Provider value={{
      user,
      setUser,
      person,
      setPerson,
      company,
      setCompany,
      employment,
      setEmployment,
      reset,
    }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;