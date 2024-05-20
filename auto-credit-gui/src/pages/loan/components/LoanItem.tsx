import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, AwaitIcon, CheckIcon, EyeIcon, ItemContainer, ItemContent, ItemHeader, ItemHide, ItemStatus, ItemTitle, SummaryColunm, SummaryField, SummaryFieldGroup } from "../Loan.styles";
import { dateFormat } from "util/date";
import LoanType from "types/LoanType";
import { currencyFormat } from "util/curency";

interface loanItemProps {
  loan: LoanType;
}

function LoanItem(props: loanItemProps) {
  const { loan } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ItemContainer>
      <ItemHeader
        onClick={() => setIsOpen(!isOpen)}
      >
        <CheckIcon />
        <ItemTitle>
          {loan.deposit ? 'Empréstimo Corrente' : 'SOLICITAÇÃO DE EMPRÉSTIMO'}
        </ItemTitle>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </ItemHeader>
      {
        isOpen &&
        <ItemContent>
          <ItemHeader>
            <ItemStatus>
              {loan.status === 'Aprovado' ? <CheckIcon /> : <AwaitIcon />}
              {loan.description}
            </ItemStatus>
            <ItemHide
              onClick={() => setIsOpen(false)}
            >
              <EyeIcon />
              Ocultar
            </ItemHide>
          </ItemHeader>
          <SummaryFieldGroup>
            <SummaryColunm>
              <SummaryField>
                <span>Empresa</span>
                <p>{loan.company.name}</p>
              </SummaryField>
              {
                loan.status === 'Aprovado' &&
                <SummaryField>
                  <span>Total Financiado</span>
                  <p>R$ {currencyFormat(loan.amount)}</p>
                </SummaryField>
              }
              <SummaryField>
                <span>Número de parcelas</span>
                <p>{loan.times} x</p>
              </SummaryField>
            </SummaryColunm>
            <SummaryColunm>
              <SummaryField>
                <span>Próximo Vencimento</span>
                <p>{dateFormat(loan.date)}</p>
              </SummaryField>
              <SummaryField>
                <span>Valor da parcela</span>
                <p>R$ {currencyFormat(loan.amount / loan.times)}</p>
              </SummaryField>
            </SummaryColunm>
          </SummaryFieldGroup>
        </ItemContent>
      }
    </ItemContainer>
  );
}

export default LoanItem;