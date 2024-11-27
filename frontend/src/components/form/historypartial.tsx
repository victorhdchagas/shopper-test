import { useEffect, useState } from 'react'
import UseCaseInterface from '../../lib/types/usecase.interface'
import ErrorBox from '../boxes/errorBox'
import CustomError, {
  CustomErrorProtocol,
} from '../../lib/types/error/customerror'
import { HistoryResponse } from '../../lib/types/services/ride/history.response'
import CustomerTravelsCard from '../cards/customertravelscard'

export default function HistoryPartial({
  useCase,
  driverUseCase,
  customerId: customerIdProp,
}: {
  useCase: UseCaseInterface<{}, HistoryResponse>
  customerId?: string
  driverUseCase: UseCaseInterface<{}, { id: number; name: string }[]>
}) {
  const [customerId, setCustomerId] = useState(customerIdProp ?? '')
  const [driverId, setDriverId] = useState('todos')
  const [rides, setRides] = useState<HistoryResponse['rides']>([])
  const [error, setError] = useState<CustomErrorProtocol | null>(null)

  const [drivers, setDrivers] = useState<{ id: number; name: string }[]>([])
  useEffect(() => {
    driverUseCase
      .execute({})
      .then((response) => {
        console.log(response)
        setDrivers(response)
      })
      .catch((error) => {
        if (error instanceof CustomError)
          setError({
            error_code: error.error_code,
            error_description: error.message,
          })
        else if (error instanceof Error)
          setError({
            error_code: 'erro_desconhecido',
            error_description: error.message,
          })
        else {
          console.error(error)
          setError({
            error_code: 'erro_desconhecido',
            error_description: 'Erro desconhecido',
          })
        }
      })
  }, [driverUseCase])

  const handleFilter = () => {
    let promise: Promise<HistoryResponse>
    if (driverId === 'todos') {
      promise = useCase.execute({ customer_id: customerId })
    } else {
      promise = useCase.execute({
        customer_id: customerId,
        driver_id: driverId,
      })
    }
    promise
      .then((response) => {
        setRides(response.rides)
      })
      .catch((error) => {
        setRides([])
        if (error instanceof CustomError)
          setError({
            error_code: error.error_code,
            error_description: error.message,
          })
        else if (error instanceof Error)
          setError({
            error_code: 'erro_desconhecido',
            error_description: error.message,
          })
        else {
          console.error(error)
          setError({
            error_code: 'erro_desconhecido',
            error_description: 'Erro desconhecido',
          })
        }
      })
  }

  const disabled = customerId === ''

  return (
    <div>
      <section>
        <div>
          <label htmlFor="userId">ID do Usuário:</label>
          <input
            id="userId"
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="driverId">Motorista:</label>
          <select
            id="driverId"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          >
            <option value="todos">Todos</option>
            {drivers &&
              drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
          </select>
        </div>
        <button onClick={handleFilter} disabled={disabled}>
          Aplicar Filtro
        </button>
        {error && (
          <ErrorBox message={error.error_description} code={error.error_code} />
        )}
      </section>
      <div role="list" aria-label="Lista de Viagens">
        {rides.map((trip) => (
          <CustomerTravelsCard key={trip.id} ride={trip} />
        ))}
        {rides.length === 0 && !error && <p>Nenhuma viagem encontrada.</p>}
      </div>
    </div>
  )
}
