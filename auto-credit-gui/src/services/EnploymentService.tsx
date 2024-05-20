import axios from "axios";
import { configDefault } from "./configService";
import { useState } from "react";
import EmploymentType from "types/EmploymentType";

function EmploymentService() {
  const { REACT_APP_URL_API } = process.env;
  const url = REACT_APP_URL_API + '/employment/';

  const [data, setData] = useState<EmploymentType | null>(null);
  const [error, setError] = useState<string>('');

  async function get(id: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<EmploymentType>(url + id, configDefault);
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

  async function getByEmployee(employeeId: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<EmploymentType>(url + 'employee/' + employeeId, configDefault);
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
    getByEmployee,
  };
}

export default EmploymentService;