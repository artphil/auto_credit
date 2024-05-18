import { useState } from "react";
import { Card } from "global/Global.styles";
import { Amount, Subtitle, SummaryField, SummaryFieldGroup } from "./Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import { currencyFormat } from "util/curency";

function LoanSummary() {
  const message = 'Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua Conta Credifit! Veja o resumo da simulação!';
  const [amount, setAmount] = useState(10);
  const installments = 3;
  return (
    <Card>
      <Subtitle>
        Simular Empréstimo
      </Subtitle>
      <MessageBot text={message} />
      <SummaryFieldGroup>
        <SummaryField>
          <span>Valor a Creditar</span>
          <p>R$ {currencyFormat(amount)}</p>
        </SummaryField>
        <SummaryField>
          <span>Valor a financiar</span>
          <p>R$ {currencyFormat(amount)}</p>
        </SummaryField>
        <SummaryField>
          <span>Parcelamento</span>
          <p>{installments}x de R$ {currencyFormat(amount / installments)}</p>
        </SummaryField>
      </SummaryFieldGroup>

    </Card>
  );
}

export default LoanSummary;