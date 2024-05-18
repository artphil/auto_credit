import { useState } from "react";
import { Card } from "global/Global.styles";
import { Amount, Subtitle } from "./Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import InputRange from "components/input/InputRange";
import { currencyFormat } from "util/curency";

function LoanAmount() {
  const message = 'Você possui saldo para Crédito Consignado pela empresa Seguros Seguradora. Faça uma simulação! Digite quanto você precisa:';
  const [amount, setAmount] = useState(10);
  return (
    <Card>
      <Subtitle>
        Simular Empréstimo
      </Subtitle>
      <MessageBot text={message} />
      <Amount>R$ {currencyFormat(amount)}</Amount>
      <InputRange
        max={10000}
        min={200}
        setValue={setAmount}
        value={amount}
      />
    </Card>
  );
}

export default LoanAmount;