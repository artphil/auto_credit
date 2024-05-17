import { useState } from "react";
import { Card } from "global/Global.styles";
import { Amount, Subtitle } from "./Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import InputRange from "components/input/InputRange";

function LoanAmount() {
  const message = 'Você possui saldo para Crédito Consignado pela empresa Seguros Seguradora. Faça uma simulação! Digite quanto você precisa:';
  const [amount, setAmount] = useState(10);
  return (
    <Card>
      <Subtitle>
        Simular Empréstimo
      </Subtitle>
      <MessageBot text={message} />
      <Amount>R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Amount>
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