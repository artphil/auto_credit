import { Card } from "global/Global.styles";
import { Amount, Subtitle } from "./Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import InputRange from "components/input/InputRange";

interface LoanAmountProps {
  amount: number;
  setAmount: (value: number) => void;
}

function LoanAmount(props: LoanAmountProps) {
  const { amount, setAmount } = props;
  const message = 'Você possui saldo para Crédito Consignado pela empresa Seguros Seguradora. Faça uma simulação! Digite quanto você precisa:';

  return (
    <Card>
      <Subtitle>
        Simular Empréstimo
      </Subtitle>
      <MessageBot text={message} />
      <Amount>R$ <input
        type="number"
        value={amount.toLocaleString()}
        onChange={enent => setAmount(Number(enent.target.value))}
      />,00
      </Amount>
      <InputRange
        max={50000}
        min={200}
        setValue={setAmount}
        value={amount}
      />
    </Card>
  );
}

export default LoanAmount;