import { useState } from "react";
import axios from "axios";
import { configDefault } from "./configService";
import UserType from "types/UserType";

function AuthService() {
  const { REACT_APP_URL_API } = process.env;
  const url = REACT_APP_URL_API + '/login';

  const [data, setData] = useState<UserType | null>(null);
  const [error, setError] = useState<string>('');

  async function login(username: string, password: string) {
    const body = { username, password };
    setData(null);
    setError('');

    try {
      const response = await axios.post<UserType>(url, body, configDefault);
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
    login
  };
}

export default AuthService;