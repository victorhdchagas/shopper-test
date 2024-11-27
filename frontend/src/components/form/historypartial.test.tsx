import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HistoryPartial from './historypartial'
import UseCaseInterface from '../../lib/types/usecase.interface'
import { buildFakeFetcher } from '../../test/utils/fakefetcher'
import HistoryUseCase from '../../lib/useCases/ride/history.usecase'

describe('Should test history partial', () => {
  const drivers = [
    {
      id: 2,
      name: 'John Doe',
    },
    {
      id: 3,
      name: 'John Ada Mole',
    },
    {
      id: 4,
      name: 'Linus Torvald',
    },
  ]
  const defaultInput = {
    customer_id: '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
    rides: [
      {
        id: 48,
        origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
        destination: 'Rua Cacequi 262, 21210-760, Rio de Janeiro, RJ',
        distance: 21,
        duration: '202s',
        driver: {
          id: 2,
        },
      },
      {
        id: 47,
        origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
        destination: 'Rua Cacequi 262, 21210-760, Rio de Janeiro, RJ',
        distance: 21,
        duration: '202s',
        driver: {
          id: 2,
        },
      },
      {
        id: 46,
        origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
        destination: 'Rua Cacequi 262, 21210-760, Rio de Janeiro, RJ',
        distance: 21,
        duration: '202s',
        driver: {
          id: 2,
        },
      },
      {
        id: 45,
        origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
        destination: 'Rua Cacequi 262, 21210-760, Rio de Janeiro, RJ',
        distance: 21,
        duration: '202s',
        driver: {
          id: 2,
        },
      },
    ],
  }
  test('Should have all inputs and display trips after filtering', async () => {
    const useCase: UseCaseInterface = {
      execute: jest
        .fn()
        .mockImplementation(() => Promise.resolve(defaultInput)),
    }
    const driverUseCase: UseCaseInterface = {
      execute: jest.fn().mockImplementation(() => Promise.resolve(drivers)),
    }
    render(<HistoryPartial useCase={useCase} driverUseCase={driverUseCase} />)

    // Verifica se o campo para informar o ID do usuário está presente
    const userIdInput = screen.getByRole('textbox', { name: /id do usuário/i })
    expect(userIdInput).toBeInTheDocument()

    // Verifica se o seletor de motorista está presente
    const driverSelect = screen.getByRole('combobox', { name: /motorista/i })
    expect(driverSelect).toBeInTheDocument()

    // Verifica se o botão para aplicar o filtro está presente

    const applyFilterButton = screen.getByRole('button', {
      name: /aplicar filtro/i,
    })
    expect(applyFilterButton).toBeInTheDocument()
    // Simula a aplicação do filtro
    fireEvent.change(userIdInput, { target: { value: '123' } }) // Exemplo de ID do usuário
    fireEvent.change(driverSelect, { target: { value: 'todos' } }) // Seleciona a opção "todos"
    fireEvent.click(applyFilterButton)
    await waitFor(() => {
      // Verifica se a lista de viagens é exibida
      const tripDivs = screen.getAllByRole('list', {
        name: /lista de viagens/i,
      }) // Supondo que cada viagem tenha um papel genérico
      expect(tripDivs.length).toBeGreaterThan(0) // Verifica se há pelo menos uma viagem exibida

      // Verifica se os detalhes da viagem estão presentes em cada div
      tripDivs.forEach((tripDiv) => {
        expect(tripDiv).toHaveTextContent(/data e hora da viagem/i)
        expect(tripDiv).toHaveTextContent(/nome do motorista/i)
        expect(tripDiv).toHaveTextContent(/origem/i)
        expect(tripDiv).toHaveTextContent(/destino/i)
        expect(tripDiv).toHaveTextContent(/distância/i)
        expect(tripDiv).toHaveTextContent(/tempo/i)
        expect(tripDiv).toHaveTextContent(/valor/i)
      })
    })
  })

  test('Should test api error handling', async () => {
    const [fakeFetch] = buildFakeFetcher({
      defaultReturn: {
        error_description: 'error estranho',
        error_code: 'error_estranho',
      },
      defaultStatus: 400,
    })
    const fakeUseCase = new HistoryUseCase(fakeFetch)

    const driverUseCase: UseCaseInterface = {
      execute: jest.fn().mockImplementation(() => Promise.resolve(drivers)),
    }
    render(
      <HistoryPartial useCase={fakeUseCase} driverUseCase={driverUseCase} />,
    )
    const userIdInput = screen.getByRole('textbox', { name: /id do usuário/i })
    const driverSelect = screen.getByRole('combobox', { name: /motorista/i })
    const applyFilterButton = screen.getByRole('button', {
      name: /aplicar filtro/i,
    })

    fireEvent.change(userIdInput, { target: { value: '123' } }) // Exemplo de ID do usuário
    fireEvent.change(driverSelect, { target: { value: 'todos' } }) // Seleciona a opção "todos"
    fireEvent.click(applyFilterButton)
    await waitFor(() => {
      const errorBox = screen.getByRole('alert', { name: /error/i })
      expect(errorBox).toBeInTheDocument()
    })
  })
})
