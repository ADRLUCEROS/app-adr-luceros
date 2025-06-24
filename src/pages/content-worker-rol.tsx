import { Button } from "@/components/ui/button"
import { Link, Outlet, useLocation } from "react-router"

export const ContentWorkerRol = () => {
  const { pathname } = useLocation()
  const isRol = pathname.includes('rol')
  return (
    <div className="w-full">
      <div className="flex gap-2 my-2 mx-4">
        <Link to={'./'}>
          <Button variant={!isRol ? 'default' : 'ghost'}>Colaborador</Button>
        </Link>
        <Link to={'./rol'}>
          <Button variant={isRol ? 'default' : 'ghost'}>Cargo</Button>
        </Link>
      </div>
      <Outlet/>
    </div>
  )
}