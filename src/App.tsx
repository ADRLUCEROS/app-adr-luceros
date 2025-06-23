import { Link, Outlet, useLocation } from 'react-router'
import './App.css'
import { Store, Truck, UsersIcon, HeartHandshake, Package2, Bell, LogOut } from 'lucide-react'

import { ROUTES } from '@/const/router.ts'
import { Toaster } from './components/ui/sonner'
import { UserControl } from './components/UserControl'
const { delivery, partner, store, truck, worker } = ROUTES.manage

const OPTIONS_SIDEBAR = [
  { 
    to: store,
    icon: Store,
    label: 'Gestión tiendas',
    text: 'Gestión tiendas',
  },
  { 
    to: truck,
    icon: Truck,
    label: 'Gestión unidades',
    text: 'Gestión unidades',
  },
  { 
    to: worker,
    icon: UsersIcon,
    label: 'Gestión colaboradores',
    text: 'Gestión colaboradores',
  },
  { 
    to: partner,
    icon: HeartHandshake,
    label: 'Gestión socios',
    text: 'Gestión socios',
  },
  { 
    to: delivery,
    icon: Package2,
    label: 'Gestión entregas',
    text: 'Gestión entregas',
  },
]

interface ButtonSidebarProps {
  to: string
  children: React.ReactNode
  isActive?: boolean
  label: string
}

const ButtonSidebar = ({ to, children, isActive, label }: ButtonSidebarProps) => (
  <Link to={to} aria-label={label} className={`button-sidebar rounded-md ${isActive ? 'active text-blue-700' : ''}`}>
    {children}
  </Link>
)

function App() {
  const { pathname } = useLocation()

  const getTextOfPathname = (path: string) => {
    const option = OPTIONS_SIDEBAR.find(option => path.includes(option.to));
    return option ? option.text : 'No encontrado';
  }

  return (
    <div className='dashboard'>
      <aside className='flex flex-col gap-1 bg-slate-50 py-5 px-2 border-r border-slate-300 relative'>
        <button className='rounded-full bg-slate-50 border border-slate-300 absolute p-2 right-0 translate-x-1/2 top-0 translate-y-1/5'>
          <LogOut className='rotate-180'/>
        </button>
        <h2 className='text-2xl text-center font-bold'>LOGO</h2>
        {
          OPTIONS_SIDEBAR.map((option) => (
            <ButtonSidebar 
              key={`sidebar-option-${option.to}`} 
              to={option.to} 
              label={option.label} 
              isActive={pathname.includes(option.to)}
            >
              <option.icon className='inline-block' />
              <span>{option.text}</span>
            </ButtonSidebar>
          ))
        }
      </aside>
      <main className='main-content overflow-x-hidden bg-slate-200'>
        <header className='w-full bg-slate-50 border-b border-slate-300 py-1 px-4 flex items-center justify-between'>
          <h1 className='text-xl font-semibold ml-2'>{ getTextOfPathname(pathname) }</h1>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Bell className='inline-block' />
              <span className='absolute top-0.5 right-0.5 rounded-full bg-red-800 size-2 border-2 border-slate-50'/>
            </div>
            <UserControl/>
          </div>
        </header>
        <Outlet />
        <Toaster />
      </main>
    </div>
  )
}

export default App
