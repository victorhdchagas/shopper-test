import { useState } from 'react'
import UseCaseInterface from '../../lib/types/usecase.interface'
import ErrorBox from '../boxes/errorBox'
import CustomError, {
  CustomErrorProtocol,
} from '../../lib/types/error/customerror'
import { HistoryResponse } from '../../lib/types/services/ride/history.response'

export default function HistoryPartial({
  useCase,
  drivers,
}: {
  useCase: UseCaseInterface<{}, HistoryResponse>
  drivers: {
    id: number
    name: string
  }[]
}) {
  const [userId, setUserId] = useState('')
  const [driverId, setDriverId] = useState('todos')
  const [trips, setTrips] = useState<HistoryResponse['rides']>([])
  const [error, setError] = useState<CustomErrorProtocol | null>(null)

  const handleFilter = () => {
    let promise: Promise<HistoryResponse>
    if (driverId === 'todos') {
      promise = useCase.execute({ userId })
    } else {
      promise = useCase.execute({ userId, driverId })
    }
    promise
      .then((response) => {
        setTrips(response.rides)
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
  }

  return (
    <div>
      <h1>Histórico de Viagens</h1>
      <section>
        <div>
          <label htmlFor="userId">ID do Usuário:</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleFilter}>Aplicar Filtro</button>
        {error && (
          <ErrorBox message={error.error_description} code={error.error_code} />
        )}
      </section>
      <div role="list" aria-label="Lista de Viagens">
        {trips.map((trip) => (
          <div key={trip.id} role="generic" aria-label="viagem">
            <p>Data e Hora: {trip.created_at}</p>
            <p>Nome do Motorista: {trip.driver.name}</p>
            <p>Origem: {trip.origin}</p>
            <p>Destino: {trip.destination}</p>
            <p>Distância: {trip.distance}</p>
            <p>Tempo: {trip.duration}</p>
            <p>Valor: {trip.value}</p>
          </div>
        ))}
        {trips.length === 0 && <p>Nenhuma viagem encontrada.</p>}
      </div>
    </div>
  )
}
