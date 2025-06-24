import { Button } from "@/components/ui/button"
import { Link, Outlet, useLocation } from "react-router"

export const ContentPartnerStorehouse = () => {
  const { pathname } = useLocation()
  const isStorehouse = pathname.includes('storehouse')
  return (
    <div className="w-full">
      <div className="flex gap-2 my-2 mx-4">
        <Link to={'./'}>
          <Button variant={!isStorehouse ? 'default' : 'ghost'}>Cliente</Button>
        </Link>
        <Link to={'./storehouse'}>
          <Button variant={isStorehouse ? 'default' : 'ghost'}>Almacen</Button>
        </Link>
      </div>
      <Outlet/>
    </div>
  )
}