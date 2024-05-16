# Auto Credito

Mini sistema que avialia e concede crédito consigniado de forma automática

## Como rodar a aplicação

### API

Dentro da pasta `auto-credit-api` executar o comando
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
People: uuid id
People: str cpf
People: str name
Users: uuid id
Users: str email
Users: str password
Users: int role
Companies: uuid id
Companies: str cnpj
Companies: str corp_reason
Employments: uuid id
Employments: float salary
Banks: uuid id
Banks: str code
Banks: str name
Loans: uuid id
Loans: int score
Loans: str status

People --> Users
Employments --> People
Employments --> Companies
Companies --> People
People --> Banks
Loans --> People
Loans --> Companies
```
