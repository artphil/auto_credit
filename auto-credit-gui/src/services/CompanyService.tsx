import axios from "axios";
import { configDefault } from "./configService";
import { useState } from "react";
import CompanyType from "types/CompanyType";

function CompanyService() {
  const { REACT_APP_URL_API } = process.env;
  const url = REACT_APP_URL_API + '/company/';

  const [data, setData] = useState<CompanyType | null>(null);
  const [error, setError] = useState<string>('');

  async function get(id: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<CompanyType>(url + id, configDefault);
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
    get
  };
}

export default CompanyService;