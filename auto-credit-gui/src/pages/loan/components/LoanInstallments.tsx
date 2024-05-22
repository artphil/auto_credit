import { ButtonStyled, Card } from "global/Global.styles";
import { Amount, InstallmentGroup, Subtitle } from "../Loan.styles";
import MessageBot from "components/mesasge/MessageBot";
import { currencyFormat } from "util/curency";

interface LoanInstallmentProps {
  min: number;
  max: number;
  amount: number;
  installments: number;
  loanPerCent: number;
  salary: number;
  setInstallments: (value: number) => void;
}

function LoanInstallments(props: LoanInstallmentProps) {
  const { amount, installments, loanPerCent, max, min, salary, setInstallments } = props;
  const message = 'Escolha a opção de parcelamento que melhor funcionar para você:';
  const maxValue = salary * loanPerCent;

  function getInstallments() {
    const list = [];
    for (let i = min; i <= max; i++) {
      list.push(i);
    }
    return list.map(times => {
      const value = amount / times;

      return (
        <ButtonStyled
          className={times === installments ? 'active' : ''}
          onClick={() => setInstallments(times)}
          disabled={value > maxValue}
        >
          {times}x de <span>{currencyFormat(value)}</span>
        </ButtonStyled>
      )
    }
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