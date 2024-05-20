import CompanyType from "./CompanyType";
import PersonType from "./PersonType";

type EmploymentType = {
  id: string;
  employee: PersonType;
  company: CompanyType;
  salary: number;
};

export type EmploymentRequestType = {
  id: string;
};

export default EmploymentType;
