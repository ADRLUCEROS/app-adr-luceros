import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface BaseSheetProps {
  title: string
  description?: string
  isOpen: boolean
  closeSheet: () => void
  children: React.ReactNode
}

export function BaseSheet({ title, description = "", children, isOpen, closeSheet }: BaseSheetProps) {

  return (
    <Sheet open={isOpen} onOpenChange={closeSheet}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="border-b py-2">
          <SheetTitle ><span className="text-2xl">{title}</span></SheetTitle>
          <SheetDescription className={`${description ? '' : 'hidden'}`}>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
