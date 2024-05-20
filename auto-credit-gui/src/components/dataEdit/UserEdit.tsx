import { useEffect, useState } from "react";
import { ButtonGroup, CoverContainer, CoverContent, DataContainer, DataField, DataInput, DataLabel, DataTitle } from "./DataEdit.styles";
import { Button } from "global/Global.styles";
import { DataEditProps } from "./dataEditCommons";
import UserType from "types/UserType";

function UserEdit(props: DataEditProps) {
  const { dataId } = props;


  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<UserType | null>(null);


  return (
    <DataContainer>
      <DataTitle>Dados do Usuário</DataTitle>
      <DataField>
        <DataLabel>Nome de usuário</DataLabel>
        <DataInput
          type="text"
          readOnly={!edit}
        />
      </DataField>
      <DataField>
        <DataLabel>Email</DataLabel>
        <DataInput
          type="email"
          readOnly={!edit}
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
            onClick={() => setEdit(false)}
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