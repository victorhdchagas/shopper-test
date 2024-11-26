import React from 'react'
import { SubmitButton } from '../buttons/submitButton'
import UseCaseInterface from '../../lib/types/usecase.interface'
import ErrorBox from '../boxes/errorBox'
import CustomError, {
  CustomErrorProtocol,
} from '../../lib/types/error/customerror'

export default function EstimateForm({
  useCase,
}: {
  useCase: UseCaseInterface
}) {
  const [customerId, setCustomerId] = React.useState('')
  const [origin, setOrigin] = React.useState('')
  const [destination, setDestination] = React.useState('')
  const [isPending, setIsPending] = React.useState(false)
  const [error, setError] = React.useState<CustomErrorProtocol | null>(null)
  const internalOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true)
    const obj = Object.fromEntries(new FormData(event.currentTarget)) as {
      [key: string]: string
    }
    await new Promise((res) => setTimeout(res, 100))
    try {
      if (error !== null) {
        setError(null)
      }
      await useCase.execute(obj)
    } catch (error) {
      if (error instanceof CustomError) {
        setError({
          error_code: error.error_code,
          error_description: error.message,
        })
      } else if (error instanceof Error) {
        setError({
          error_code: 'erro_desconhecido',
          error_description: error.message,
        })
      } else {
        console.error(error)
        setError({
          error_code: 'erro_desconhecido',
          error_description: 'Erro desconhecido',
        })
      }
      return
    }

    setIsPending(false)
  }
  const formDisabled = !customerId || !origin || !destination || isPending
  return (
    <form onSubmit={internalOnSubmit}>
      {error && (
        <ErrorBox message={error.error_description} code={error.error_code} />
      )}
      <LabelInput
        label="customer id"
        name="customer_id"
        type="text"
        placeholder="customer id"
        value={customerId}
        onChange={(event) => setCustomerId(event.target.value)}
      />
      <LabelInput
        label="origem"
        name="origin"
        type="text"
        placeholder="origem"
        value={origin}
        onChange={(event) => setOrigin(event.target.value)}
      />
      <LabelInput
        label="destino"
        name="destination"
        type="text"
        placeholder="destino"
        value={destination}
        onChange={(event) => setDestination(event.target.value)}
      />
      <SubmitButton type="submit" disabled={formDisabled} isPending={isPending}>
        Enviar
      </SubmitButton>
    </form>
  )
}

function LabelInput({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
