import { useState } from "react";
import { ButtonGroup, CoverContainer, CoverContent, DataContainer, DataField, DataInput, DataLabel, DataTitle } from "./DataEdit.styles";
import { Button } from "global/Global.styles";
import { DataEditProps } from "./dataEditCommons";

function PersonEdit(props: DataEditProps) {
  const { dataId: data } = props;

  const [edit, setEdit] = useState(false);

  return (
    <DataContainer>
      <DataTitle>Dados do Pessoais</DataTitle>
      <DataField>
        <DataLabel>Nome</DataLabel>
        <DataInput
          type="text"
          readOnly={!edit}
        />
      </DataField>
      <DataField>
        <DataLabel>CPF</DataLabel>
        <DataInput
          type="CPF"
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
            Cadastro não encontrado
          </CoverContent>
        </CoverContainer>
      }
    </DataContainer>
  );
}

export default PersonEdit;