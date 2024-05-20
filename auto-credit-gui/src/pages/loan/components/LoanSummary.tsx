import { Card } from "global/Global.styles";
import { Subtitle, SummaryColunm, SummaryField, SummaryFieldGroup } from "../Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import { currencyFormat } from "util/curency";

interface loanSummaryProps {
  amount: number,
  installments: number,
}

function LoanSummary(props: loanSummaryProps) {
  const { amount, installments } = props
  const message = 'Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua Conta Credifit! Veja o resumo da simulação!';

  return (
    <Card>
      <Subtitle>
        Simular Empréstimo
      </Subtitle>
      <MessageBot text={message} />
      <SummaryFieldGroup>
        <SummaryColunm>
          <SummaryField>
            <span>Valor a Creditar</span>
            <p>R$ {currencyFormat(amount)}</p>
          </SummaryField>
          <SummaryField>
            <span>Parcelamento</span>
            <p>{installments}x de R$ {currencyFormat(amount / installments)}</p>
          </SummaryField>
        </SummaryColunm>
        <SummaryColunm>
          <SummaryField>
            <span>Valor a financiar</span>
            <p>R$ {currencyFormat(amount)}</p>
          </SummaryField>
        </SummaryColunm>
      </SummaryFieldGroup>
    </Card>
  );
}

export default LoanSummary;