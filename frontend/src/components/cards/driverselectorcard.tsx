import { FaStar } from 'react-icons/fa'
import { DriverOptionDTO } from '../../lib/types/services/ride/estimate.response'
import { Field } from '../styled/field'
import { Button } from '../buttons/button'

export default function DriverSelectorCard({
  driver,
  onSelect,
  disabled,
}: {
  driver: DriverOptionDTO
  onSelect: (driverId: number, name: string, value: number) => Promise<void>
  disabled?: boolean
}) {
  return (
    <div
      key={driver.id}
      style={{
        width: '100%',
        gap: '2px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px dotted #ccc',
        borderRadius: '20px',
      }}
    >
      <Field>
        <span>Nome</span>
        <span>{driver.name}</span>
      </Field>

      <Field>
        <span>Descrição</span>
        <span>{driver.description}</span>
      </Field>
      <Field>
        <span>Veículo</span>
        <span>{driver.vehicle}</span>
      </Field>
      <Field style={{ position: 'relative' }}>
        <span>Rating</span>
        <span>{driver.review.rating} </span>
        <div style={{ position: 'absolute', top: '0', right: '0' }}>
          <Rating score={driver.review.rating} />
        </div>
      </Field>
      <Field>
        <span>Review</span>
        <span>{driver.review.comment}</span>
      </Field>
      <Field>
        <span>Valor</span>
        <span>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(driver.value)}
        </span>
      </Field>
      <Button
        disabled={disabled}
        onClick={() => onSelect(driver.id, driver.name, driver.value)}
        style={{
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
      >
        Escolher
      </Button>
    </div>
  )
}

function Rating({ score }: { score: number }) {
  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          style={{ fill: score <= index ? 'gray' : 'yellow' }}
        />
      ))}
    </div>
  )
}
