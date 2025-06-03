import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogDescription } from "@radix-ui/react-alert-dialog"

interface BaseAlertProps {
  title: string
  description?: string
  isOpen: boolean
  btnName?: string
  closeDialog: () => void
  action: () => void
  children?: React.ReactNode
}

export function AlertDialogDemo({ title, description = "", isOpen, closeDialog, action, children, btnName = 'Eliminar' }: BaseAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogDescription>{children}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => action()}>{btnName}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
