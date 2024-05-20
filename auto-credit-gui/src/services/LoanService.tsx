import axios from "axios";
import { configDefault } from "./configService";
import { useState } from "react";
import LoanType, { LoanRequestType } from "types/LoanType";

function LoanService() {
  const { REACT_APP_URL_API } = process.env;
  const url = REACT_APP_URL_API + '/loan/';

  const [data, setData] = useState<LoanType | LoanType[] | null>(null);
  const [error, setError] = useState<string>('');

  async function get(id: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<LoanType>(url + id, configDefault);
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
      const response = await axios.get<LoanType>(url + 'employee/' + employeeId, configDefault);
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
  };

  async function create(loan: LoanRequestType) {
    setData(null);
    setError('');

    try {
      const response = await axios.post<LoanType>(url, loan, configDefault);
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
    create,
  };
}

export default LoanService;