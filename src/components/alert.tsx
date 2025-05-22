import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo() {
  return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro que quieres eliminar esta tienda?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}
