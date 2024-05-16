import { CompanyEntity } from '../company.entity';

export class CompanyResponseDTO {
  id: string;
  name: string;

  constructor(company: CompanyEntity) {
    this.id = company.id;
    this.name = company.name;
  }
}
