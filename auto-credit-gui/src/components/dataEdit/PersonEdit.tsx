import { useEffect, useState } from "react";
import { ButtonGroup, CoverContainer, CoverContent, DataContainer, DataField, DataInput, DataLabel, DataTitle } from "./DataEdit.styles";
import { Button } from "global/Global.styles";
import { DataEditProps } from "./dataEditCommons";
import PersonService from "services/PersonService";
import PersonType from "types/PersonType";

function PersonEdit(props: DataEditProps) {
  const { dataId } = props;

  const service = PersonService();

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<PersonType | null>(null);

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
    setData(service.data)
  }

  useEffect(() => {
    if (dataId) {
      service.get(dataId);
    }
  }, [dataId]);

  useEffect(() => {
    if (service.data) {
      setData(service.data);
    }
  }, [service.data]);


  return (
    <DataContainer>
      <DataTitle>Dados do Pessoais</DataTitle>
      <DataField>
        <DataLabel>Nome</DataLabel>
        <DataInput
          type="text"
          readOnly={!edit}
          value={data?.name}
          onChange={event => changeData('name', event.target.value)}
        />
      </DataField>
      <DataField>
        <DataLabel>CPF</DataLabel>
        <DataInput
          type="CPF"
          readOnly={!edit}
          value={data?.cpf}
          onChange={event => changeData('cpf', event.target.value)}
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
            Cadastro não encontrado
          </CoverContent>
        </CoverContainer>
      }
    </DataContainer>
  );
}

export default PersonEdit;