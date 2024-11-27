import { useState } from 'react'
import { useNavigate } from 'react-router'
import CustomError from '../../lib/types/error/customerror'
import { DriverOptionDTO } from '../../lib/types/services/ride/estimate.response'
import UseCaseInterface from '../../lib/types/usecase.interface'
import ErrorBox from '../boxes/errorBox'
import DriverSelectorCard from '../cards/driverselectorcard'
import { ConfirmResponseInput } from '../../lib/types/services/ride/confirm.response'

export default function OptionsForm({
  options,
  useCase,
  confirmData,
}: {
  options: DriverOptionDTO[]
  useCase: UseCaseInterface
  confirmData: Omit<
    ConfirmResponseInput,
    'driver' | 'value' | 'customer_id'
  > & { customerId: string }
}) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<CustomError | null>(null)
  const navigate = useNavigate()
  const onSelectDriver = async (id: number, name: string, value: number) => {
    setIsPending(true)
    try {
      console.log(confirmData)
      const response = await useCase.execute({
        distance: confirmData.distance,
        duration: confirmData.duration,
        customer_id: confirmData.customerId,
        origin: confirmData.origin,
        destination: confirmData.destination,

        driver: { id, name },
        value,
      })
      if (!response) return

      navigate('/history', { state: { customer_id: confirmData.customerId } })
    } catch (error) {
      if (error instanceof CustomError) {
        setError(error)
      } else if (error instanceof Error) {
        setError(new CustomError(error.message, 'erro_desconhecido'))
      } else {
        console.error(error)
        setError(new CustomError('Erro desconhecido', 'erro_desconhecido'))
      }
    } finally {
      setIsPending(false)
    }
  }
  return (
    <div>
      <h1>Nossos motoristas</h1>
      {error && <ErrorBox message={error?.message} code={error?.error_code} />}
      {options.length === 0 && <span>Nenhum motorista disponível</span>}
      {options.map((option) => (
        <DriverSelectorCard
          key={option.id}
          driver={option}
          onSelect={onSelectDriver}
          disabled={isPending}
        />
      ))}
    </div>
  )
}
