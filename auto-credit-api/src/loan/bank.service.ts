const bankPath = 'https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144';

export class BankService {
  async deposit() {
    return fetch(bankPath).then((response) => response.json());
  }
}
