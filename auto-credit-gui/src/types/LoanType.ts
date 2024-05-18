import CompanyType from "./CompanyType";
import EmploymentType from "./EmploymentType";
import PersonType from "./PersonType";

export type LoanStatusType = "Aguardando" | "Aprovado" | "Recusado";

type LoanType = {
  id: string;
  status: LoanStatusType;
  description: string;
  salary: number;
  amount: number;
  score: number;
  times: number;
  deposit: boolean;
  employment: EmploymentType;
  employee: PersonType;
  company: CompanyType;
};

export default LoanType;
