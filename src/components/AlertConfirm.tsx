import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Trash2 } from 'lucide-react'

interface BaseAlertProps {
  title: string
  description?: string
  isOpen: boolean
  btnName?: string
  variant?: 'destructive' | 'default'
  closeDialog: () => void
  action: () => void
  children?: React.ReactNode
}

export function AlertConfirm({ 
  title,
  description = "",
  isOpen,
  closeDialog,
  action,
  children,
  btnName = 'Eliminar',
  variant = 'default'
}: BaseAlertProps) {
  const variantClass = {
    destructive: "bg-red-50 border border-red-500 text-red-700",
    default: "bg-slate-50 border border-slate-500 text-slate-700",
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {
            variant !== 'default' && (
            <div className={`${variantClass[variant]} w-fit p-3 rounded-full`}>
              <Trash2 className="w-7 h-7" />
            </div>
            )
          }
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-700">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogDescription>{children}</AlertDialogDescription>
        <AlertDialogFooter>
          <div className="flex items-center gap-2 w-full">
            <Checkbox/>
            <Label>
              No volver a mostrar este mensaje
            </Label>
          </div>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {
            variant === 'destructive' ? (
              <Button variant="destructive" onClick={() => action()}>{btnName}</Button>
            ) : (
              <AlertDialogAction onClick={() => action()}>{btnName}</AlertDialogAction>
            )
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
