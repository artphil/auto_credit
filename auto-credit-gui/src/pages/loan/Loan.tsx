import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "contexts/GlobalContext";
import Header from "components/header/Header";
import LoanAmount from "./components/LoanAmount";
import LoanInstallments from "./components/LoanInstallments";
import LoanSummary from "./components/LoanSummary";
import { LoanRequestType } from "types/LoanType";
import { Button, Main } from "global/Global.styles";
import { ArrowLeftIcon, ButtonGroup, Container, CoverButton, CoverContainer, CoverContent, PageHeader, PageHeaderPath, PageHeaderTilte, Title } from "./Loan.styles";
import LoanService from "services/LoanService";

const enum steps { AMOUNT, INSTALLMENTS, SUMMARY }

const loanDefault: LoanRequestType = {
  amount: 0,
  salary: 0,
  times: 0,
  company: { id: '' },
  employee: { id: '' },
  employment: { id: '' }
}

function LoanPage() {
  const { employment } = useGlobal();
  const service = LoanService();
  const navigate = useNavigate();

  const pagePath = 'Home';
  const pageName = 'Crédito Consignado';
  const minInstallments = 1;
  const maxInstallments = 4;
  const loanPerCent = 0.35;

  const [loanRequest, setLoanRequest] = useState<LoanRequestType>(loanDefault);
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

  function submit() {
    service.create(loanRequest);
  }

  useLayoutEffect(() => {
    if (employment) {
      setLoanRequest({
        amount: 200,
        salary: Number(employment.salary),
        times: 0,
        company: { id: employment.company.id },
        employee: { id: employment.employee.id },
        employment: { id: employment.id }
      });
    }
  }, [employment]);

  useEffect(() => {
    if (service.data) {
      navigate('/emprestimos')
    }
  }, [service.data]);

  return (
    <Main>
      <Header />
      <Container>
        <PageHeader>
          <Link to={'/'}>
            <ArrowLeftIcon />
          </Link>
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
            salary={loanRequest.salary}
            amount={loanRequest.amount}
            setAmount={value => updateLoan('amount', value)}
            loanPerCent={loanPerCent}
            maxInstallments={maxInstallments}
          />
        }
        {
          applicationStep === steps['INSTALLMENTS'] &&
          <LoanInstallments
            amount={loanRequest.amount}
            installments={loanRequest.times}
            salary={loanRequest.salary}
            loanPerCent={loanPerCent}
            max={maxInstallments}
            min={minInstallments}
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
            <Button
              onClick={submit}
            >
              Solicitar empréstimo
            </Button>
          }
        </ButtonGroup>
      </Container>
      {
        !employment &&
        <CoverContainer>
          <CoverContent>
            Não é possivel solicitar empréstimo com os dados incompletos
            <CoverButton to={'/'}>
              {'< Voltar'}
            </CoverButton>
          </CoverContent>
        </CoverContainer>
      }
    </Main>
  );
}

export default LoanPage;