import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "contexts/GlobalContext";
import AuthService from "services/AuthService";
import LocalService from "services/LocalService";

function useAuth() {
  const navigate = useNavigate();
  const auth = AuthService();
  const local = LocalService();
  const { setUser } = useGlobal();

  const [authError, setAuthError] = useState('');

  function login(username: string, password: string) {
    auth.login(username, password);
  }

  function logout() {
    local.removeToken();
    navigate('/login')
  }

  useEffect(() => {
    if (auth.data) {
      setUser(auth.data)
      local.saveToken(auth.data.id)
      navigate('/')
    } else if (auth.error) {
      setAuthError(auth.error)
    }
  }, [auth.data, auth.error]);

  return { authError, login, logout };
}

export default useAuth;