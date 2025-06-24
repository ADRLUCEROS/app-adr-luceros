import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 text-center">
      <h1 className="text-7xl text-blue-950 mb-2">404</h1>
      <p className="text-3xl mb-2">Pagina no encontrada</p>
      <Link to={"/"}>
        <Button>Regresar</Button>
      </Link>
    </div>
  )
}