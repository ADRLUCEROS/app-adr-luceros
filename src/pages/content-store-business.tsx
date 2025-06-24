import { Button } from "@/components/ui/button"
import { Link, Outlet, useLocation } from "react-router"

export const ContentStoreBusiness = () => {
  const { pathname } = useLocation()
  const isBusiness = pathname.includes('business')
  return (
    <div className="w-full">
      <div className="flex gap-2 my-2 mx-4">
        <Link to={'./'}>
          <Button variant={!isBusiness ? 'default' : 'ghost'}>Tiendas</Button>
        </Link>
        <Link to={'./business'}>
          <Button variant={isBusiness ? 'default' : 'ghost'}>Empresas</Button>
        </Link>
      </div>
      <Outlet/>
    </div>
  )
}