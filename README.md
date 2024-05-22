# Auto Credito

Mini sistema que avialia e concede crédito consigniado automático

## Como rodar a aplicação

### API

Dentro da pasta `auto-credit-api`

- Criar um arquivo de nome `.env` coma as configurações de acesso ao banco (Postegres) no seguinte formato

```sh
DB_HOST=<HOST>
DB_PORT=<PORT>
DB_USERNAME=<USERNAME>
DB_PASSWORD=<PASSWORD>
DB_NAME=<SCHEMA>
```

0

- Executar o comando `npm start`

### Interface

- Protótipo [Figma](https://www.figma.com/design/lpUoQHqCAJ3Ffw62mJ24Mt/Desafio-T%C3%A9cnico-2024---Credifit-LinkPJ?node-id=0-1&t=TMrZWb5xyyFi9ecH-0)

Dentro da pasta `auto-credit-api`

- Criar um arquivo de nome `.env.local` coma as configurações de acesso a API no seguinte formato

```sh
REACT_APP_URL_API=<API_URL>
```

- Executar o comando `npm start`

## Dependências

- API
  - NestJS: Framework
  - Swagger: Documentação `<API_URL>/doc`
  - UUID: Gerador de ID único
  - Postgres(PG): driver do banco de dados
- Interface
  - React: Biblioteca principal
  - React router dom: Gerenciador de rotas
  - Styled Component: Componente CSS

## Entendendo o problema

O objetivo deste projeto é desenvolver uma aplicação onde o cliente possa solicitar um empréstimo de forma ágil, economizando tempo e recursos tanto do tomador quanto do concessor do crédito. Para isso o cliente poderá acessar o sistema e fazer a solicitação do crédito pretendido e se este atender a todos os requisitos necessários lhe será concedida a quantia solocitada de forma automática e simplificada.
Os requisitos são:

- O cliente estar vinculado a uma empresa conveniada à concessora.
- A parcela de pagamento não exceder a 35% do salário
- O cliente ter score mínimo suficiente para o valor

### Agentes

- Concessora: resposável por avaliar e conceder o crédito solicitado
- Cliente: solicitante, deve estar vinculado a empresa parceira e ter score válido
- Empresa: garantidora, deve estar associada a concessora
- Banco: financeiro, responsável pelas tranferências de valores
- Agência de risco: avaliador, responsável por emitir um score ao solicittante

### Entidades e relacionamentos

```mermaid
classDiagram
Person: uuid id
Person: str cpf
Person: str name
User: uuid id
User: str email
User: str password
User: int role
Company: uuid id
Company: str cnpj
Company: str reason
Employment: uuid id
Employment: float salary
Loan: uuid id
Loan: int score
Loan: str status
Loan: float salary
Loan: float amount
Loan: int times

Person --> User
Employment --> Person
Employment --> Company
Company --> Person
Loan --> Person
Loan --> Company
```
