import { useState } from "react";
import { ButtonStyled, Card } from "global/Global.styles";
import { Amount, InstallmentGroup, Subtitle } from "./Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import { currencyFormat } from "util/curency";

function LoanInstallments() {
  const message = 'Escolha a opção de parcelamento que melhor funcionar para você:';
  const minInstallment = 1;
  const maxInstallment = 4;
  const amount = 4000;
  const [installments, setInstallments] = useState<number>(0);

  function getInstallments() {
    const list = [];
    for (let i = minInstallment; i <= maxInstallment; i++) {
      list.push(i);
    }
    return list.map(times =>
      <ButtonStyled
        className={times === installments ? 'active' : ''}
        onClick={() => setInstallments(times)}
      >
        {times}x de <span>{currencyFormat(amount / times)}</span>
      </ButtonStyled>
    );
  }
  return (
    <Card>
      <Subtitle>
        Simular Empréstimo
      </Subtitle>
      <MessageBot text={message} />
      <Amount>R$ {currencyFormat(amount)}</Amount>
      <InstallmentGroup>
        {getInstallments()}
      </InstallmentGroup>
    </Card>
  );
}

export default LoanInstallments;