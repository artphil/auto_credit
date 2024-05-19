import { Button, Card, Main } from "global/Global.styles";
import { Container, ErrorMessage, Form, Input, Logo, Title } from "./Login.styles";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(username, password)
  }

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