import Header from "components/header/Header";
import { Link } from "react-router-dom";
import { Card, Main } from "global/Global.styles";
import MessageBot from "components/mesasge/MessageBot";
import {
  ArrowLeftIcon,
  Container,
  CoverButton,
  CoverContainer,
  CoverContent,
  ListContainer,
  PageHeader,
  PageHeaderPath,
  PageHeaderTilte,
  Title
} from "./Loan.styles";
import LoanItem from "./components/LoanItem";
import LoanType from "types/LoanType";
import { useGlobal } from "contexts/GlobalContext";
import { useEffect, useState } from "react";
import LoanService from "services/LoanService";

function LoanListPage() {
  const { person } = useGlobal();
  const service = LoanService();

  const pagePath = 'Home';
  const pageName = 'Crédito Consignado';
  const message = 'Você solicitou seu empréstimo! Agora aguarde as etapas de análises serem concluídas!';

  const [loanList, setloanList] = useState<LoanType[]>([]);

  useEffect(() => {
    if (person) {
      service.getByEmployee(person.id);
    }
  }, [person]);

  useEffect(() => {
    if (service.data) {
      setloanList(service.data as LoanType[])
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
        <Card>
          <ListContainer>
            <MessageBot text={message} />
            {loanList.map(item =>
              <LoanItem key={item.id} loan={item} />
            )}
          </ListContainer>
        </Card>
      </Container>
      {
        !person &&
        <CoverContainer>
          <CoverContent>
            Complete seu cadastro para acessar esas página
            <CoverButton to={'/'}>
              {'< Voltar'}
            </CoverButton>
          </CoverContent>
        </CoverContainer>
      }
    </Main>
  );
}

export default LoanListPage;