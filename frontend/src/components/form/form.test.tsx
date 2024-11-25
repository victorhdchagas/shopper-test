import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RideForm from './form'

describe('Should test RideForm', () => {
  test('renders learn react link', () => {
    const handleSubmit = jest.fn()
    render(<RideForm onSubmit={handleSubmit} />)
    const nameInput = screen.getByLabelText(/customer id/i)
    const origemInput = screen.getByLabelText(/origem/i)
    const destinoInput = screen.getByLabelText(/destino/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    expect(nameInput).toBeInTheDocument()
    expect(origemInput).toBeInTheDocument()
    expect(destinoInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
