import { Link, Outlet, useLocation } from 'react-router'
import './App.css'
import { Store, Truck, UsersIcon, HeartHandshake, Package2 } from 'lucide-react'

import { ROUTES } from '@/const/router.ts'
import { Toaster } from './components/ui/sonner'
const { delivery, partner, store, truck, worker } = ROUTES.manage

interface ButtonSidebarProps {
  to: string
  children: React.ReactNode
  isActive?: boolean
}

const ButtonSidebar = ({ to, children, isActive }: ButtonSidebarProps) => (
  <Link to={to} className={`button-sidebar ${isActive ? 'active' : ''}`}>
    {children}
  </Link>
)

function App() {
  const { pathname } = useLocation()

  return (
    <div className='dashboard'>
      <aside className='flex flex-col gap-1 bg-blue-950 py-5 text-white'>
        <h2 className='text-2xl px-4'>Gestión</h2>
        <ButtonSidebar to={store} isActive={pathname.includes(store)}>
          <Store className='inline-block' />
          <span>Gestión tiendas</span>
        </ButtonSidebar>
        <ButtonSidebar to={truck} isActive={pathname.includes(truck)}>
          <Truck className='inline-block' />
          <span>Gestión unidades</span>
        </ButtonSidebar>
        <ButtonSidebar to={worker} isActive={pathname.includes(worker)}>
          <UsersIcon className='inline-block' />
          <span>Gestión colaboradores</span>
        </ButtonSidebar>
        <ButtonSidebar to={partner} isActive={pathname.includes(partner)}>
          <HeartHandshake className='inline-block' />
          <span>Gestión socios</span>
        </ButtonSidebar>
        <ButtonSidebar to={delivery} isActive={pathname.includes(delivery)}>
          <Package2 className='inline-block' />
          <span>Gestión entregas</span>
        </ButtonSidebar>
      </aside>
      <main className='main-content'>
        <Outlet />
        <Toaster />
      </main>
    </div>
  )
}

export default App
