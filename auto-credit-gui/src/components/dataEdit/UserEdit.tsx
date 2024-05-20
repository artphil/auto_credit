import { useEffect, useState } from "react";
import { Button } from "global/Global.styles";
import { DataEditProps } from "./dataEditCommons";
import UserType from "types/UserType";
import UserService from "services/UserService";
import {
  ButtonGroup,
  CoverContainer,
  CoverContent,
  DataContainer,
  DataField,
  DataInput,
  DataLabel,
  DataTitle
} from "./DataEdit.styles";

function UserEdit(props: DataEditProps) {
  const { dataId } = props;

  const user = UserService();

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<UserType | null>(null);

  function changeData(name: string, value: string) {
    if (data) {
      setData({
        ...data,
        [name]: value,
      });
    }
  }

  function cancelEdit() {
    setEdit(false);
    setData(user.data)
  }

  useEffect(() => {
    if (dataId) {
      user.get(dataId);
    }
  }, [dataId]);

  useEffect(() => {
    if (user.data) {
      setData(user.data);
    }
  }, [user.data]);

  return (
    <DataContainer>
      <DataTitle>Dados do Usuário</DataTitle>
      <DataField>
        <DataLabel>Nome de usuário</DataLabel>
        <DataInput
          type="text"
          readOnly={!edit}
          value={data?.username}
          onChange={event => changeData('username', event.target.value)}
        />
      </DataField>
      <DataField>
        <DataLabel>Email</DataLabel>
        <DataInput
          type="email"
          readOnly={!edit}
          value={data?.email}
          onChange={event => changeData('email', event.target.value)}
        />
      </DataField>
      {
        !edit &&
        <ButtonGroup>
          <Button
            onClick={() => setEdit(true)}
          >
            Editar
          </Button>
        </ButtonGroup>
      }
      {
        edit &&
        <ButtonGroup>
          <Button
            className="outlined"
            onClick={cancelEdit}
          >
            Cancelar
          </Button>
          <Button>Salvar</Button>
        </ButtonGroup>
      }
      {
        !data &&
        <CoverContainer>
          <CoverContent>
            Usuário não cadastrado
          </CoverContent>
        </CoverContainer>
      }
    </DataContainer>
  );
}

export default UserEdit;