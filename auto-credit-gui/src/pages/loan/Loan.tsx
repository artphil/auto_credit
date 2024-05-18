import Header from "components/header/Header";
import { Button, Main } from "global/Global.styles";
import { ArrowLeftIcon, ButtonGroup, Container, PageHeader, PageHeaderPath, PageHeaderTilte, Title } from "./Loan.styles";
import LoanAmount from "./LoanAmount";
import { useState } from "react";
import LoanInstallments from "./LoanInstallments";

const enum steps { AMOUNT, INSTALLMENTS, SUMMARY }

function LoanPage() {
  const pagePath = 'Home';
  const pageName = 'Crédito Consignado';

  const [applicationStep, setApplicationStep] = useState(0);

  function prevStep() {
    if (applicationStep > steps['AMOUNT'])
      setApplicationStep(applicationStep - 1);
  }

  function nextStep() {
    if (applicationStep < steps['SUMMARY'])
      setApplicationStep(applicationStep + 1);
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
          <LoanAmount />
        }
        {
          applicationStep === steps['INSTALLMENTS'] &&
          <LoanInstallments />
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