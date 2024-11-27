import { Outlet } from 'react-router'
import MainHeader from '../components/header/mainheader'

export default function MainLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  )
}
