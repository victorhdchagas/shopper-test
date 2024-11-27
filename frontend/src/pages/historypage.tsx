import HistoryPartial from '../components/form/historypartial'
import HistoryUseCase from '../lib/useCases/ride/history.usecase'
import GetAllDriversUseCase from '../lib/useCases/driver/getalldrivers.usecase'
import Jumbotron from '../components/styled/jumbotrom'
import { useState } from 'react'
import Portal from '../components/portal'
import { Button } from '../components/buttons/button'
import { useLocation } from 'react-router'
import { Area } from '../components/styled/area'

export default function HistoryPage() {
  const [showModal, setShowModal] = useState(false)
  const getDriversUseCase = new GetAllDriversUseCase()
  const location = useLocation()
  const state = location.state

  const useCase = new HistoryUseCase()

  return (
    <>
      <h1>Historico</h1>
      <Jumbotron
        title="Shopper Taxi"
        description="Seja bem vindo ao Shopper Taxi"
        onClick={() => {
          setShowModal((state) => !state)
        }}
      >
        <span style={{ fontSize: '.8rem', color: '#555' }}>
          Informações de uso
        </span>
      </Jumbotron>
      <Area>
        <HistoryPartial
          useCase={useCase}
          driverUseCase={getDriversUseCase}
          customerId={state.customer_id}
        />

        <Portal.PortalAtom
          open={showModal}
          onPressEscape={() => setShowModal(false)}
        >
          <Portal.Overlay>
            <Portal.Container>
              <h1>Informações de uso</h1>
              <p>
                Customer_ids:
                ['2be17af3-d65e-4cdb-893f-6b320b7d0b7d','3d254137-d502-4c5f-8ae8-2b0b845fd4d1']
              </p>
              <p>Driver_ids: [1,2,3]</p>
              <Button onClick={() => setShowModal(false)}>Fechar</Button>
            </Portal.Container>
          </Portal.Overlay>
        </Portal.PortalAtom>
      </Area>
    </>
  )
}
