import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, EyeIcon, ItemContainer, ItemContent, ItemHeader, ItemHide, ItemStatus, ItemTitle, SummaryColunm, SummaryField, SummaryFieldGroup } from "../Loan.styles";

function LoanItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ItemContainer>
      <ItemHeader
        onClick={() => setIsOpen(!isOpen)}
      >
        <CheckIcon />
        <ItemTitle>SOLICITAÇÃO DE EMPRÉSTIMO 01</ItemTitle>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </ItemHeader>
      {
        isOpen &&
        <ItemContent>
          <ItemHeader>
            <ItemStatus>
              <CheckIcon />
              Crédito aprovado
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
                <p>Seguros Seguradora</p>
              </SummaryField>
              <SummaryField>
                <span>Total Financiado</span>
                <p>R$ 10.000,00</p>
              </SummaryField>
              <SummaryField>
                <span>Número de parcelas</span>
                <p>1 x</p>
              </SummaryField>
            </SummaryColunm>
            <SummaryColunm>
              <SummaryField>
                <span>Próximo Vencimento</span>
                <p>29/11/2022</p>
              </SummaryField>
              <SummaryField>
                <span>Valor da parcela</span>
                <p>R$ 5.000,00</p>
              </SummaryField>
            </SummaryColunm>
          </SummaryFieldGroup>
        </ItemContent>
      }
    </ItemContainer>
  );
}

export default LoanItem;