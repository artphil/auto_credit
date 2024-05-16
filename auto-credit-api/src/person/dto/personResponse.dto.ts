import { PersonEntity } from '../person.entity';

export class PersonResponseDTO {
  id: string;
  name: string;

  constructor(person: PersonEntity) {
    this.id = person.id;
    this.name = person.name;
  }
}
