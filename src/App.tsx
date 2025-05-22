import { Outlet } from 'react-router'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  return (
    <div className='dashboard'>
      <aside className='sidebar flex flex-col gap-1'>
        <h2 className='text-2xl'>Gestión</h2>
        <Button variant='outline'>Tiendas</Button>
        <Button variant='outline'>Camión</Button>
        <Button variant='outline'>Personal</Button>
      </aside>
      <main className='main-content'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
