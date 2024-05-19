import { useEffect, useState } from "react";
import { Button, Card, Main } from "global/Global.styles";
import useAuth from "hooks/useAuth";
import { Container, ErrorMessage, Form, Input, Logo, Title } from "./Login.styles";

function LoginPage() {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    auth.login(username, password);
  }

  useEffect(() => {
    if (auth.authError) {
      setError(auth.authError)
    }
  }, [auth.authError]);

  function validate() {
    if (!username) {
      setError('Digite o usuário')
    } else if (!password) {
      setError('Digite uma senha')
    } else {
      setError('')
    }
  }

  return (
    <Main>
      <Container>
        <Logo />
        <Card>
          <Form onSubmit={event => submit(event)}>
            <Title>Login</Title>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={event => setUsername(event.target.value)}
              onBlur={validate}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={event => setPassword(event.target.value)}
              onBlur={validate}
              required
            />
            <ErrorMessage>{error}</ErrorMessage>
            <Button type="submit">Entrar</Button>
          </Form>
        </Card>
      </Container>
    </Main>
  );
}

export default LoginPage;