import axios from "axios";
import { configDefault } from "./configService";
import { useState } from "react";
import PersonType from "types/PersonType";

function PersonService() {
  const { REACT_APP_URL_API } = process.env;
  const url = REACT_APP_URL_API + '/person/';

  const [data, setData] = useState<PersonType | null>(null);
  const [error, setError] = useState<string>('');

  async function get(id: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<PersonType>(url + id, configDefault);
      setData(response.data)
    }
    catch (errorResponse: any) {
      if (axios.isAxiosError(errorResponse)) {
        setError(errorResponse.response?.data.message);
      } else {
        setError("Erro inesperado no servidor");
        console.error(errorResponse);
      }
    }
  }

  async function getByUser(userid: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<PersonType>(url + 'user/' + userid, configDefault);
      setData(response.data)
    }
    catch (errorResponse: any) {
      if (axios.isAxiosError(errorResponse)) {
        setError(errorResponse.response?.data.message);
      } else {
        setError("Erro inesperado no servidor");
        console.error(errorResponse);
      }
    }
  }

  return {
    data,
    error,
    get,
    getByUser,
  };
}

export default PersonService;