import { useLayoutEffect } from "react";
import useAuth from "hooks/useAuth";

function LogoutPage() {
  const auth = useAuth()
  useLayoutEffect(() => {
    auth.logout();
  }, []);

  return (
    <div>Saindo ...</div>
  );
}

export default LogoutPage;