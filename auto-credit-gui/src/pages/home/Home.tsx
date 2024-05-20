import Header from "components/header/Header";
import { Main } from "global/Global.styles";
import { Column, Container } from "./Home.styles";
import UserEdit from "components/dataEdit/UserEdit";
import PersonEdit from "components/dataEdit/PersonEdit";
import CompanyEdit from "components/dataEdit/CompanyEdit";
import { useGlobal } from "contexts/GlobalContext";

function HomePage() {
  const { user } = useGlobal()

  return (
    <Main>
      <Header />
      {user &&
        <Container>
          <Column>
            <UserEdit dataId={user?.id} />
            <PersonEdit dataId={undefined} />
          </Column>
          <Column>
            <CompanyEdit dataId={undefined} />
          </Column>
        </Container>
      }
    </Main>
  );
}

export default HomePage;