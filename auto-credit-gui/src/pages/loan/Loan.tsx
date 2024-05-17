import Header from "components/header/Header";
import { Button, Main } from "global/Global.styles";
import { ArrowLeftIcon, ButtonGroup, Container, PageHeader, PageHeaderPath, PageHeaderTilte, Title } from "./Loan.styles";
import LoanAmount from "./LoanAmount";

function LoanPage() {
  const pagePath = 'Home';
  const pageName = 'Crédito Consignado';

  return (
    <Main>
      <Header />
      <Container>
        <PageHeader>
          <ArrowLeftIcon />
          <PageHeaderTilte>
            <PageHeaderPath>{pagePath}/{pageName}</PageHeaderPath>

            <Title>
              {pageName}
            </Title>
          </PageHeaderTilte>
        </PageHeader>
        <LoanAmount />
        <ButtonGroup>

          <Button className="outlined">Voltar</Button>
          <Button>Simular empréstimo</Button>
        </ButtonGroup>
      </Container>
    </Main>
  );
}

export default LoanPage;