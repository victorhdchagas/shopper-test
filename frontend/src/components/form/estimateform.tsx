import React from 'react'
import { useNavigate } from 'react-router'
import CustomError, {
  CustomErrorProtocol,
} from '../../lib/types/error/customerror'
import UseCaseInterface from '../../lib/types/usecase.interface'
import ErrorBox from '../boxes/errorBox'
import { Button } from '../buttons/button'
import LabelInput, { FlexColumnContainer } from '../input/labelinput'
import { Area } from '../styled/area'

export default function EstimateForm({
  useCase,
  customerId: _customerId,
  origin: _origin,
  destination: _destination,
}: {
  useCase: UseCaseInterface
  customerId?: string | null
  origin?: string | null
  destination?: string | null
}) {
  const [customerId, setCustomerId] = React.useState(_customerId ?? '')
  const [origin, setOrigin] = React.useState(_origin ?? '')
  const [destination, setDestination] = React.useState(_destination ?? '')
  const [isPending, setIsPending] = React.useState(false)
  const [error, setError] = React.useState<CustomErrorProtocol | null>(null)
  const navigate = useNavigate()
  const internalOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    const obj = Object.fromEntries(new FormData(event.currentTarget)) as {
      [key: string]: string
    }
    try {
      if (error !== null) {
        setError(null)
      }
      const response = await useCase.execute(obj)
      if (response) {
        navigate(`/options`, {
          state: { ...response, filter: { origin, destination, customerId } },
        })
      }
      setIsPending(false)
    } catch (error) {
      setIsPending(false)
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
    <Area>
      <form onSubmit={internalOnSubmit}>
        <FlexColumnContainer>
          {error && (
            <ErrorBox
              message={error.error_description}
              code={error.error_code}
            />
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
          <Button type="submit" disabled={formDisabled}>
            Enviar
          </Button>
        </FlexColumnContainer>
      </form>
    </Area>
  )
}
