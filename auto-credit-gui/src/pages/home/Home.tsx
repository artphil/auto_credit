import Header from "components/header/Header";
import { Main } from "global/Global.styles";
import { Column, Container } from "./Home.styles";
import UserEdit from "components/dataEdit/UserEdit";
import PersonEdit from "components/dataEdit/PersonEdit";
import CompanyEdit from "components/dataEdit/CompanyEdit";

function HomePage() {
  return (
    <Main>
      <Header />
      <Container>
        <Column>
          <UserEdit dataId={null} />
          <PersonEdit dataId={null} />
        </Column>
        <Column>
          <CompanyEdit dataId={null} />
        </Column>
      </Container>
    </Main>
  );
}

export default HomePage;