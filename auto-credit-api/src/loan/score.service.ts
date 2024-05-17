const scorePath =
  'https://run.mocky.io/v3/ef99c032-8e04-4e6a-ad3e-6f413a9e707a';

export class ScoreService {
  async getScore(cpf: string) {
    return fetch(scorePath).then((response) => response.json());
  }
}
