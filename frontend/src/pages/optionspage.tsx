import { Link, useLocation, useNavigate } from 'react-router'
import { Area } from '../components/styled/area'
import OptionsForm from '../components/form/optionsform'
import MapDirectionPartial from '../components/form/mapdirectionpartial'
import ConfirmUseCase from '../lib/useCases/ride/confirm.usecase'

export default function OptionsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = location
  if (!state) navigate('/')
  const steps = state.routeResponse.routes[0].legs[0].steps
  const arrivalTime = new Date(
    Date.now() + parseInt(state.duration.replace('s', '')) * 1e3,
  )
  return (
    <Area>
      <h1>Opções de corrida</h1>
      Total de distancia: {state.distance} km(s)
      <br />
      Tempo estimado médio: {state.duration}
      <br />
      Chegará aproximadamente em:{' '}
      {arrivalTime.toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo',
      })}
      <br />
      <Link
        style={{ color: '#cecece' }}
        to={{
          pathname: `/`,
          search: `origin=${state.filter.origin}&destination=${state.filter.destination}&customer_id=${state.filter.customerId}`,
        }}
      >
        Voltar
      </Link>
      <MapDirectionPartial
        steps={steps}
        locations={{
          start: steps[0].startLocation.latLng,
          end: steps[steps.length - 1].endLocation.latLng,
        }}
      />
      <OptionsForm
        options={state.options}
        useCase={new ConfirmUseCase()}
        confirmData={{
          ...state.filter,
          distance: state.distance,
          duration: state.duration,
        }}
      />
    </Area>
  )
}
