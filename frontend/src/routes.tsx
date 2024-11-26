import { Route, Routes } from 'react-router'
import App from './App'
import MainLayout from './layouts/mainlayout'
import HistoryPage from './pages/historypage'
import OptionsPage from './pages/optionspage'

export default function ShopperRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="options" element={<OptionsPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>
    </Routes>
  )
}
