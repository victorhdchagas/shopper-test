# Shopper Api project

## Notas criadas antes dos requisitos

- O teste será realizado de forma automatizada utilizando Docker

## O Que eu sei sobre o projeto:

- 3 Endpoints na API
- Teste integrado com docker
- Talvez usem artillary
- Testem integridade dos dados com DB externo
- Checkem arquitetura

## Passos para build

- docker-compose up
  env -
  db_host
  db_user
  db_passwd
  db_name
  api_port

## Demandas do projeto

Será um aplicativo de Taxi, simulará um usuário que pedirá uma viagem.
Terá uma integração com o Google API

## Especificações

- POST /ride/estimate
  Responsável por receber a origem e o destino da viagem e realizar os
  cálculos dos valores da viagem.Esse endpoint deve fazer as seguintes validações:
  Os endereços de origem e destino recebidos não podem estar
  em branco.
  ● O id do usuário não pode estar em branco.
  ● Os endereços de origem e destino não podem ser o mesmo
  endereço.
  ●
  Após as validações, ele deve:
  ● Calcular a rota entre a origem e destino usando a API Routes do
  Google Maps.
  ● Com base no retorno, deve listar os motoristas disponíveis para a
  viagem de acordo com a quilometragem mínima que aceitam,
  cada um com seu respectivo valor, usando como base a
  seguinte tabela:

O endpoint deverá retornar:
● A latitude e longitude dos pontos iniciais e finais.
● A distância e tempo do percurso.
● A lista de motoristas disponíveis ordenados do mais barato para
o mais caro, cada um contendo:
o O ID e nome do motorista.
o A descrição.
o O carro.
o A avaliação.
o O valor total da corrida.
● A resposta original da rota no Google.
