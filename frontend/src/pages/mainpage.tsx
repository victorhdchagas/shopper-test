import { useState } from 'react'
import EstimateForm from '../components/form/estimateform'
import Portal from '../components/portal'
import Jumbotron from '../components/styled/jumbotrom'
import EstimateUseCase from '../lib/useCases/ride/estimate.usecase'
import { Button } from '../components/buttons/button'

export default function MainPage() {
  const [showModal, setShowModal] = useState(false)
  const useCase = new EstimateUseCase()
  //   const location = useLocation()
  const searchParams = new URL(window.location.href).searchParams
  return (
    <section style={{ height: '100vh', width: '100%', color: '#333' }}>
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
      <EstimateForm
        useCase={useCase}
        customerId={searchParams.get('customer_id')}
        destination={searchParams.get('destination')}
        origin={searchParams.get('origin')}
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
    </section>
  )
}
