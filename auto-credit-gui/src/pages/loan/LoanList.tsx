import Header from "components/header/Header";
import { Link } from "react-router-dom";
import { Card, Main } from "global/Global.styles";
import MessageBot from "components/mesasge/MessageBot";
import {
  ArrowLeftIcon,
  Container,
  ListContainer,
  PageHeader,
  PageHeaderPath,
  PageHeaderTilte,
  Title
} from "./Loan.styles";
import LoanItem from "./components/LoanItem";

function LoanListPage() {
  const pagePath = 'Home';
  const pageName = 'Crédito Consignado';
  const message = 'Você solicitou seu empréstimo! Agora aguarde as etapas de análises serem concluídas!';

  const loanList = [{}, {}, {}]

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
        <Card>
          <ListContainer>
            <MessageBot text={message} />
            {loanList.map(item =>
              <LoanItem />
            )}
          </ListContainer>
        </Card>
      </Container>
    </Main>
  );
}

export default LoanListPage;