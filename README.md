# Auto Credito

Mini sistema que avialia e concede crédito consigniado de forma automática

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

- Executar o comando
  `npm start`

### Interface

## Dependências

- API
  - NestJS: Framework
  - Swagger: Documentação

## Entendendo o problema

A ideia deste projeto é desenvolver uma aplicação onde o cliente possa solicitar um empréstimo de forma ágil, economizando tempo e recursos tanto do tomador quanto do concessor do crédito. Para isso o cliente poderá acessar o sistema e fazer a solicitação do crédito pretendido e se este atender a todos os requisitos necessários lhe será concedida a quantia solocitada de forma automática e simplificada.
Os requisitos são:

- O cliente estar vinculada a uma empresa conveniada à concessora.
- O valor solicitado não exceder a 35% do salário
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
Bank: uuid id
Bank: str code
Bank: str name
Loan: uuid id
Loan: int score
Loan: str status
Loan: float salary
Loan: float amount
Loan: int installments

Person --> User
Employment --> Person
Employment --> Company
Company --> Person
Person --> Bank
Loan --> Person
Loan --> Company
```
