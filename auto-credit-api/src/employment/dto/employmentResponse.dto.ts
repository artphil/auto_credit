import { EmploymentEntity } from '../employment.entity';
import { PersonResponseDTO } from 'src/person/dto/personResponse.dto';
import { CompanyResponseDTO } from 'src/company/dto/companyResponse.dto';

export class EmploymentResponseDTO {
  id: string;
  employee: PersonResponseDTO;
  company: CompanyResponseDTO;

  constructor(employment: EmploymentEntity) {
    this.id = employment.id;
    this.employee = new PersonResponseDTO(employment.employee);
    this.company = new CompanyResponseDTO(employment.company);
  }
}
