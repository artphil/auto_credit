import axios from "axios";
import { configDefault } from "./configService";
import { useState } from "react";
import UserType from "types/UserType";

function UserService() {
  const { REACT_APP_URL_API } = process.env;
  const url = REACT_APP_URL_API + '/user/';

  const [data, setData] = useState<UserType | null>(null);
  const [error, setError] = useState<string>('');

  async function get(id: string) {
    setData(null);
    setError('');

    try {
      const response = await axios.get<UserType>(url + id, configDefault);
      setData(response.data)
    }
    catch (errorResponse: any) {
      if (axios.isAxiosError(errorResponse)) {
        setError(errorResponse.response?.data.message);
      } else {
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

export default UserService;