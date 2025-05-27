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
      <SheetContent>
        <SheetHeader>
          <SheetTitle><span className="text-2xl">{title}</span></SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
