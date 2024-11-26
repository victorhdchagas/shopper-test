# usarei esse arquivo para escrever meu estado mental durante o desenvolvimento rs

## Dia 0 (transmissão)

Nesse dia comecei a desenvolver o produto, criei a estrutura base e as configurações de JEST, pensei sobre como faria o Docker funcionar com 2 projetos, por isso optei por criar uma pasta chamada `backend` e uma pasta chamada `frontend`

## Dia 1

Recebi o arquivo e fiquei bastante confiante com a dificuldade do projeto. Pensei em montar um leviatan pra mostrar os poderes do SOLID mas esbarrei em alguns problemas que não consegui resolver, demandaria mais tempo.
Tentei criar um encapsulamento pro Express onde poderiamos optar por `Express`, `http:node` ou qualquer framework de api desse mundão
Falhar nisso tirou um pouco da minha confiança rsrs, sindrome do impostor deu uma pegada (Ta doido, as vagas tinham 506 candidatos).
Fiquei pegado com compromissos pessoais.

## Dia 2

Dia que decidi criar esse mentalstate como um snapshot da linha de raciocinio e escrevi inclusive os dias anteriores.
Optei por escolher postgres pois pelo que me lembro o mesmo tem métodos de Geolocalização que podem me ajudar nesse tipo de problema.
Comecei a desenhar o banco de dados e estruturar os modelos no projeto, estou um pouco recioso pois compreendo bem a arquitetura MVC, porém não tenho experiência com DDD, estou começando a estudar arquiteturas esse ano.

## Dia 3

Criei a estrutura do banco de dados e observei que o campo de Review poderia ser melhor desenhado. Normalmente os motoristas tem varias reviews.
Segundo o retorno sugerido no pdf o review do motorista pode ser tanto o ultimo, porem a nota poderia ser uma media entre todos os reviews... desenhei a base pensando nessa ideia.
Sei que nem todos os motoristas estariam ativos no momento, mas temo não dar tempo pra desenvolver um sistema de sessão e verificar qual motorista ta logado e com que veiculo. Provavelmente vou discartar isso.
todo mundo é usuario.. tanto customer quanto driver

## Dia 4

Sinto que estou perdendo muito tempo no backend e mal sai do primeiro endpoint... to perdendo um tempo procurando a solução perfeita. Vou agilizar um pouco e focar mais nas outras demandas.
Optei por remover retorno do modelo no serviço, fiz isso pois optei por fazer o calculo da distancia pelo banco de dados e ja trazer ordenado. Talvez seja um erro, pois estou colocando logica do negócio no banco.. mas aposto na performance aqui.

## Dia 5

- O endpoint de listar históricos tem uma mensagem de erro ambigua, perguntaria pra equipe sobre a real intencao deles. Rides_Not_Found pode ser tanto pra um customer inexistente quanto pra um customer novato.

- Terminei a API, finalmente! Pros ultimos requisitos foi mais facil pois deu pra aplicar TDD e garantir baseado em teste e requisitos.

- Iniciei o Front e me preocupo por só ter 3 dias...

- Fiquei encucado, e apesar de não ter sido solicitado, acredito que eles precisaram do customer_id (precisa de um cadastro). Ficaria feio ter o id estampado na pagina. Isso é pro meu Eu futuro decidir, ja q nao tenho ngm da equipe pra consultar.

- Optei por utilizar react-router pra gerenciar o estado das paginas, por ser uma SPA vai ser mais simples. Saiu uma versão nova, mas ficou confuso na doc se era uma lib only front ou uma lib de SSR, por isso optei pela versão anterior (Only Front)

## Dia 6

- Criei a estrutura inicial do projeto ontem. Hoje vou tirar o dia inteiro pra desenvolver a aplicação e seus testes.

- Amanhã dividirei o dia pra layout / docker issues

## Dia 7

Invalid API returns

```json
{
  "error": {
    "code": 400,
    "message": "API key not valid. Please pass a valid API key.",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "API_KEY_INVALID",
        "domain": "googleapis.com",
        "metadata": {
          "service": "routes.googleapis.com"
        }
      },
      {
        "@type": "type.googleapis.com/google.rpc.LocalizedMessage",
        "locale": "en-US",
        "message": "API key not valid. Please pass a valid API key."
      }
    ]
  }
}
```

```json
{
  "error": {
    "code": 400,
    "message": "Invalid value at 'origin' (type.googleapis.com/google.maps.routing.v2.Waypoint), \"Rua quixada 38, 21210-440, rio de janeiro, rj\"\nInvalid value at 'destination' (type.googleapis.com/google.maps.routing.v2.Waypoint), \"Rua jequiriça 180, rio de janeiro, rj\"",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.BadRequest",
        "fieldViolations": [
          {
            "field": "origin",
            "description": "Invalid value at 'origin' (type.googleapis.com/google.maps.routing.v2.Waypoint), \"Rua quixada 38, 21210-440, rio de janeiro, rj\""
          },
          {
            "field": "destination",
            "description": "Invalid value at 'destination' (type.googleapis.com/google.maps.routing.v2.Waypoint), \"Rua jequiriça 180, rio de janeiro, rj\""
          }
        ]
      }
    ]
  }
}
```

```bash
 curl -X POST -d '{
  "origin": {
  "address": "Rua quixada 38, 21210-440, rio de janeiro, rj"
  },
  "destination": {
  "address":"Rua jequiriça 180, rio de janeiro, rj"
  },
  "travelMode": "DRIVE",
  "routingPreference": "TRAFFIC_AWARE",
  "computeAlternativeRoutes": false,
  "languageCode": "pt-BR",
  "units": "METRIC"
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: AIzaSyB_hic-mIg8__0eYhQGfZ81UoxWL2hyZPMX' \
-H 'X-Goog-FieldMask: routes.duration,routes.distanceMeters,routes.legs.steps.start_location,routes.legs.steps.end_location,routes.polyline.encodedPolyline' \
'https://routes.googleapis.com/directions/v2:computeRoutes'


```

returns it

```json
{
  "routes": [
    {
      "distanceMeters": 2222,
      "duration": "226s",
      "polyline": {
        "encodedPolyline": "vqkjCxefgGgANSsA@q@RuDLkDCiAIoB@wAJsA`@mDEw@Og@]m@mKaKe@k@~GsGhA{@DOrHeFFClBsANQ~EgVD[L{BcHaE"
      }
    }
  ]
}
```

```json
{
  "routes": [
    {
      "legs": [
        {
          "steps": [
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.838203699999998,
                  "longitude": -43.2906853
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.8378391,
                  "longitude": -43.290768799999995
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.8378391,
                  "longitude": -43.290768799999995
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.8378514,
                  "longitude": -43.287260100000005
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.8378514,
                  "longitude": -43.287260100000005
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.8360013,
                  "longitude": -43.283194599999995
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.8360013,
                  "longitude": -43.283194599999995
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.835650899999997,
                  "longitude": -43.2828057
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.835650899999997,
                  "longitude": -43.2828057
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.837385299999998,
                  "longitude": -43.281195700000005
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.837385299999998,
                  "longitude": -43.281195700000005
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.8408245,
                  "longitude": -43.2756547
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.8408245,
                  "longitude": -43.2756547
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.8409191,
                  "longitude": -43.274893899999995
                }
              }
            },
            {
              "startLocation": {
                "latLng": {
                  "latitude": -22.8409191,
                  "longitude": -43.274893899999995
                }
              },
              "endLocation": {
                "latLng": {
                  "latitude": -22.8394612,
                  "longitude": -43.2739179
                }
              }
            }
          ]
        }
      ],
      "distanceMeters": 2221,
      "duration": "228s",
      "polyline": {
        "encodedPolyline": "vqkjCxefgGgANSsA@q@RuDLkDCiAIoB?[BoAH_A`@mDEw@Og@]m@mJaJ_@_@e@k@~GsGz@m@LMDOrHeFFClBsANQ~EgVD[L{BcHaE"
      }
    }
  ]
}
```
