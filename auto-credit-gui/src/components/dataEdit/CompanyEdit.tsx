import { useState } from "react";
import { ButtonGroup, CoverContainer, CoverContent, DataContainer, DataField, DataInput, DataLabel, DataTitle } from "./DataEdit.styles";
import { Button } from "global/Global.styles";
import { DataEditProps } from "./dataEditCommons";

function CompanyEdit(props: DataEditProps) {
  const { dataId: data } = props;

  const [edit, setEdit] = useState(false);

  return (
    <DataContainer>
      <DataTitle>Dados de Cadastro</DataTitle>
      <DataField>
        <DataLabel>Empresa</DataLabel>
        <DataInput
          type="text"
          readOnly={!edit}
        />
      </DataField>
      <DataField>
        <DataLabel>CNPJ</DataLabel>
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

export default CompanyEdit;