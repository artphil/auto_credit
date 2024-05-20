import CompanyType, { CompanyRequestType } from "./CompanyType";
import EmploymentType, { EmploymentRequestType } from "./EmploymentType";
import PersonType, { PersonRequestType } from "./PersonType";

export type LoanStatusType = "Aguardando" | "Aprovado" | "Recusado";

type LoanType = {
  id: string;
  status: LoanStatusType;
  description: string;
  salary: number;
  amount: number;
  score: number;
  times: number;
  date: Date;
  deposit: boolean;
  employment: EmploymentType;
  employee: PersonType;
  company: CompanyType;
};

export type LoanRequestType = {
  salary: number;
  amount: number;
  times: number;
  employment: EmploymentRequestType;
  employee: PersonRequestType;
  company: CompanyRequestType;
};

export default LoanType;
