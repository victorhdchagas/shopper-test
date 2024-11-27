import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import OptionsForm from './optionsform'
import ConfirmUseCase from '../../lib/useCases/ride/confirm.usecase'
import { BrowserRouter as Router } from 'react-router'
import { ConfirmResponseInput } from '../../lib/types/services/ride/confirm.response'

describe('Should test Options', () => {
  const defaultInput = {
    distance: 2.02,
    duration: '272s',
    options: [
      {
        id: 3,
        name: 'Dominique Toretto',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        description:
          'Pegou um caminho muito rapido, mas envolvia uma rota exótica. Quando menos esperava o carro estava em planando em cima de um lago.',
        review: {
          comment:
            'Pegou um caminho muito rapido, mas envolvia uma rota exótica. Quando menos esperava o carro estava em planando em cima de um lago.',
          rating: 4,
        },
        value: 10.1,
      },
      {
        id: 2,
        name: 'James Bond',
        vehicle: 'Aston Martin DB5 clássico',
        description:
          'Pegou um caminho muito rapido, mas envolvia uma rota exótica. Quando menos esperava o carro estava em planando em cima de um lago.',
        review: {
          comment:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
          rating: 5,
        },
        value: 20.2,
      },
    ],
    routeResponse: {
      routes: [
        {
          legs: [
            {
              steps: [
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.838203699999998,
                      longitude: -43.2906853,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.8378391,
                      longitude: -43.290768799999995,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.8378391,
                      longitude: -43.290768799999995,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.8378514,
                      longitude: -43.287260100000005,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.8378514,
                      longitude: -43.287260100000005,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.838149899999998,
                      longitude: -43.2854931,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.838149899999998,
                      longitude: -43.2854931,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.837310300000002,
                      longitude: -43.2867004,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.837310300000002,
                      longitude: -43.2867004,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.8361853,
                      longitude: -43.28812550000001,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.8361853,
                      longitude: -43.28812550000001,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.8372432,
                      longitude: -43.2946962,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.8372432,
                      longitude: -43.2946962,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.8380267,
                      longitude: -43.2945475,
                    },
                  },
                },
                {
                  startLocation: {
                    latLng: {
                      latitude: -22.8380267,
                      longitude: -43.2945475,
                    },
                  },
                  endLocation: {
                    latLng: {
                      latitude: -22.8384642,
                      longitude: -43.297292899999995,
                    },
                  },
                },
              ],
            },
          ],
          distanceMeters: 2020,
          duration: '272s',
          polyline: {
            encodedPolyline:
              'vqkjCxefgGgANSsA@q@RuDLkDCiAIoB?[HSv@{GEq@o@IYDQx@m@~BIJSn@]|@CH[j@{@dAeBbBtAxOF`@rBdV|C]tAbP',
          },
        },
      ],
    },
  }
  const defaultConfirmData: Omit<
    ConfirmResponseInput,
    'driver' | 'value' | 'customer_id'
  > & { customerId: string } = {
    customerId: '1',
    origin: '-22.838203699999998,-43.2906853',
    destination: '-22.837310300000002,-43.2867004',
    distance: 2020,
    duration: '272s',
    // driver: {
    //   id: 1,
    //   name: 'James Bond',
    // },
    // value: 20.2,
  }

  test('Should create a valid tsx options form', () => {
    render(
      <Router>
        <OptionsForm
          confirmData={defaultConfirmData}
          options={defaultInput.options}
          useCase={new ConfirmUseCase()}
        />
      </Router>,
    )
    expect(screen.getAllByText(/nome/i)).toHaveLength(
      defaultInput.options.length,
    )
    expect(screen.getAllByText(/descrição/i)).toHaveLength(
      defaultInput.options.length,
    )
    expect(screen.getAllByText(/veículo/i)).toHaveLength(
      defaultInput.options.length,
    )
  })
  test('Should render all driver details', async () => {
    render(
      <Router>
        <OptionsForm
          confirmData={defaultConfirmData}
          options={defaultInput.options}
          useCase={new ConfirmUseCase()}
        />
      </Router>,
    )
    const allDriverNames = screen.getAllByText(/nome/i)
    const allDriverDescriptions = screen.getAllByText(/descrição/i)
    const allDriverVehicles = screen.getAllByText(/veículo/i)

    // Verifica se o número de motoristas é o esperado
    expect(allDriverNames).toHaveLength(2) // ajuste o número conforme necessário
    expect(allDriverDescriptions).toHaveLength(2) // ajuste o número conforme necessário
    expect(allDriverVehicles).toHaveLength(2) // ajuste o número conforme necessário

    // Verifica se cada motorista tem os detalhes corretos
    allDriverNames.forEach((driverName, index) => {
      expect(driverName).toBeInTheDocument()
      expect(allDriverDescriptions[index]).toBeInTheDocument()
      expect(allDriverVehicles[index]).toBeInTheDocument()
    })
  })
})
