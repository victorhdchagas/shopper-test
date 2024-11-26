import { DriverOptionDTO } from '../../lib/types/services/ride/estimate.response'

export default function OptionsForm({
  options,
}: {
  options: DriverOptionDTO[]
}) {
  return (
    <div>
      <h1>Nossos motoristas</h1>
      {options.length === 0 && <span>Nenhum motorista disponível</span>}
      {options.map((option) => (
        <div key={option.id}>
          <div>
            <span>nome do motorista</span>
            <span>{option.name}</span>
          </div>

          <div>
            <span>Descrição do motorista</span>
            <span>{option.description}</span>
          </div>
          <div>
            <span>Veículo do motorista</span>
            <span>{option.vehicle}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
