import Header from "components/header/Header";
import { Button, Main } from "global/Global.styles";
import { ArrowLeftIcon, ButtonGroup, Container, PageHeader, PageHeaderPath, PageHeaderTilte, Title } from "./Loan.styles";
import LoanAmount from "./LoanAmount";
import { useState } from "react";
import LoanInstallments from "./LoanInstallments";
import LoanSummary from "./LoanSummary";
import { LoanRequestType } from "types/LoanType";

const enum steps { AMOUNT, INSTALLMENTS, SUMMARY }

const loanExample: LoanRequestType = {
  amount: 100,
  salary: 2000,
  times: 0,
  company: { id: '' },
  employee: { id: '' },
  employment: { id: '' }
}

function LoanPage() {
  const pagePath = 'Home';
  const pageName = 'Crédito Consignado';
  const mininstallments = 1;
  const maxinstallments = 4;

  const [loanRequest, setLoanRequest] = useState<LoanRequestType>(loanExample);
  const [applicationStep, setApplicationStep] = useState(0);

  function prevStep() {
    if (applicationStep > steps['AMOUNT'])
      setApplicationStep(applicationStep - 1);
  }

  function nextStep() {
    if (applicationStep < steps['SUMMARY'])
      setApplicationStep(applicationStep + 1);
  }

  function updateLoan(name: string, value: number) {
    setLoanRequest({
      ...loanRequest,
      [name]: value,
    })
  }


  return (
    <Main>
      <Header />
      <Container>
        <PageHeader>
          <ArrowLeftIcon />
          <PageHeaderTilte>
            <PageHeaderPath>{pagePath} / {pageName}</PageHeaderPath>
            <Title>
              {pageName}
            </Title>
          </PageHeaderTilte>
        </PageHeader>
        {
          applicationStep === steps['AMOUNT'] &&
          <LoanAmount
            amount={loanRequest.amount}
            setAmount={value => updateLoan('amount', value)}
          />
        }
        {
          applicationStep === steps['INSTALLMENTS'] &&
          <LoanInstallments
            amount={loanRequest.amount}
            installments={loanRequest.times}
            max={maxinstallments}
            min={mininstallments}
            setInstallments={value => updateLoan('times', value)}
          />
        }
        {
          applicationStep === steps['SUMMARY'] &&
          <LoanSummary
            amount={loanRequest.amount}
            installments={loanRequest.times}
          />
        }
        <ButtonGroup>
          <Button
            className="outlined"
            onClick={prevStep}
          >Voltar</Button>
          {
            applicationStep < steps['SUMMARY'] &&
            <Button
              onClick={nextStep}
              disabled={applicationStep === steps['INSTALLMENTS'] && loanRequest.times === 0}
            >Seguinte</Button>
          }
          {
            applicationStep === steps['SUMMARY'] &&
            <Button>Solicitar empréstimo</Button>
          }
        </ButtonGroup>
      </Container>
    </Main>
  );
}

export default LoanPage;