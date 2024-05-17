export enum LoanStatus {
  'Aguardando',
  'Aprovado',
  'Recusado',
}

export type LoanStatusType = keyof typeof LoanStatus;

export const SALARY_PER_CENT = 0.35;
