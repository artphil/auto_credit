import Header from "components/header/Header";
import { Main } from "global/Global.styles";
import { Column, Container } from "./Home.styles";
import UserEdit from "components/dataEdit/UserEdit";
import PersonEdit from "components/dataEdit/PersonEdit";
import CompanyEdit from "components/dataEdit/CompanyEdit";
import { useGlobal } from "contexts/GlobalContext";
import PersonService from "services/PersonService";
import { useEffect } from "react";
import EmploymentService from "services/EnploymentService";

function HomePage() {
  const {
    user,
    person,
    company,
    setPerson,
    setCompany,
    setEmployment
  } = useGlobal()

  const personService = PersonService();
  const employmentService = EmploymentService();

  useEffect(() => {
    if (user && !person) {
      personService.getByUser(user.id);
    }
  }, [user, person]);

  useEffect(() => {
    if (personService.data) {
      const employee = personService.data;
      setPerson(employee)
      if (!company) {
        employmentService.getByEmployee(employee.id);
      }
    }
  }, [personService.data]);

  useEffect(() => {
    if (employmentService.data) {
      const company = employmentService.data.company;
      setEmployment(employmentService.data);
      setCompany(company);
    }
  }, [employmentService.data]);

  return (
    <Main>
      <Header />
      {user &&
        <Container>
          <Column>
            <UserEdit dataId={user?.id} />
            <PersonEdit dataId={person?.id} />
          </Column>
          <Column>
            <CompanyEdit dataId={company?.id} />
          </Column>
        </Container>
      }
    </Main>
  );
}

export default HomePage;