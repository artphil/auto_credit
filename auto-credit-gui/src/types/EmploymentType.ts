import CompanyType from "./CompanyType";
import PersonType from "./PersonType";

type EmplaoymentType = {
  id: string;
  employee: PersonType;
  company: CompanyType;
  salary: number;
};

export default EmplaoymentType;
