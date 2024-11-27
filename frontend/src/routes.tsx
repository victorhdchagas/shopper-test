import { Route, Routes, BrowserRouter, ActionFunction } from 'react-router'
import MainLayout from './layouts/mainlayout'
import HistoryPage from './pages/historypage'
import MainPage from './pages/mainpage'
import OptionsPage from './pages/optionspage'
import EstimateUseCase from './lib/useCases/ride/estimate.usecase'
import CustomError from './lib/types/error/customerror'

const MainPageAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const obj = Object.fromEntries(formData)
  try {
    const useCase = new EstimateUseCase()
    const response = await useCase.execute({
      origin: obj.origin as string,
      destination: obj.destination as string,
      customer_id: obj.customer_id as string,
    })
    if (response) {
      return response
    }
  } catch (error) {
    if (error instanceof CustomError) {
      return { error_code: error.error_code, error_description: error.message }
    }
    if (error instanceof Error) {
      return {
        error_code: 'erro_desconhecido',
        error_description: error.message,
      }
    }
    console.error(error)
    return {
      error_code: 'erro_desconhecido',
      error_description: 'Erro desconhecido',
    }
  }
  return null
}

export default function ShopperRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} action={MainPageAction} />
          <Route path="options" element={<OptionsPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
