import { Field } from '../styled/field'
import { HistoryResponse } from '../../lib/types/services/ride/history.response'

export default function CustomerTravelsCard({
  ride,
}: {
  ride: HistoryResponse['rides'][number]
}) {
  return (
    <div
      key={ride.id}
      style={{
        width: '100%',
        gap: '2px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px dotted #ccc',
        borderRadius: '20px',
      }}
      role="generic"
      aria-label="viagem"
    >
      <Field>
        <span>Data e hora da viagem</span>
        <span>
          {' '}
          {new Date(ride.created_at).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })}
        </span>
      </Field>

      <Field>
        <span>Nome do Motorista</span>
        <span>{ride.driver.name}</span>
      </Field>

      <Field>
        <span>Origem</span>
        <span>{ride.origin}</span>
      </Field>
      <Field>
        <span>Destino</span>
        <span>{ride.destination}</span>
      </Field>
      <Field>
        <span>Distância</span>
        <span>
          {Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            maximumFractionDigits: 2,
          }).format(ride.distance)}
          KM
        </span>
      </Field>
      <Field>
        <span>Tempo</span>
        <span>{ride.duration}</span>
      </Field>
      <Field>
        <span>Valor</span>
        <span>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(ride.value)}
        </span>
      </Field>
    </div>
  )
}
