import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import EstimateForm from './estimateform'
import UseCaseInterface from '../../lib/types/usecase.interface'
import EstimateUseCase from '../../lib/useCases/ride/estimate.usecase'
import { buildFakeFetcher } from '../../test/utils/fakefetcher'

describe('Should test RideForm', () => {
  const useCase: UseCaseInterface = {
    execute: jest.fn(),
  }
  beforeAll(() => {
    // Mock requestSubmit
    HTMLFormElement.prototype.requestSubmit = jest.fn()
  })
  test('Should have all inputs', () => {
    render(<EstimateForm useCase={useCase} />)
    const nameInput = screen.getByLabelText(/customer id/i)
    const origemInput = screen.getByLabelText(/origem/i)
    const destinoInput = screen.getByLabelText(/destino/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    expect(nameInput).toBeInTheDocument()
    expect(origemInput).toBeInTheDocument()
    expect(destinoInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
  test('Should give error without customer_id', () => {
    render(<EstimateForm useCase={useCase} />)
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    expect(submitButton).toBeDisabled()
  })
  test('Should handlesubmit be called once', async () => {
    render(<EstimateForm useCase={useCase} />)
    const customerIdInput = screen.getByLabelText(/customer id/i)
    const origemInput = screen.getByLabelText(/origem/i)
    const destinoInput = screen.getByLabelText(/destino/i)
    const submitButton = screen.getByRole('button', { name: /Enviar/i })
    const input = {
      customer_id: '123',
      origin: 'Origem',
      destination: 'Destino',
    }

    fireEvent.change(customerIdInput, { target: { value: input.customer_id } })
    fireEvent.change(origemInput, { target: { value: input.origin } })
    fireEvent.change(destinoInput, { target: { value: input.destination } })
    // fireEvent.click(submitButton)
    fireEvent.submit(submitButton.closest('form')!)
    await waitFor(() => {
      expect(useCase.execute).toHaveBeenCalledTimes(1)
      expect(useCase.execute).toHaveBeenCalledWith(input)
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
    const fakeUseCase = new EstimateUseCase(fakeFetch)

    render(<EstimateForm useCase={fakeUseCase} />)

    const customerIdInput = screen.getByLabelText(/customer id/i)
    const origemInput = screen.getByLabelText(/origem/i)
    const destinoInput = screen.getByLabelText(/destino/i)
    const submitButton = screen.getByRole('button', { name: /Enviar/i })
    const input = {
      customer_id: '123',
      origin: 'Origem',
      destination: 'Destino',
    }

    fireEvent.change(customerIdInput, { target: { value: input.customer_id } })
    fireEvent.change(origemInput, { target: { value: input.origin } })
    fireEvent.change(destinoInput, { target: { value: input.destination } })
    fireEvent.submit(submitButton.closest('form')!)
    await waitFor(() => {
      expect(screen.getByText(/error estranho/i)).toBeInTheDocument()
      expect(screen.getByText(/error_estranho/i)).toBeInTheDocument()
    })
  })
})
