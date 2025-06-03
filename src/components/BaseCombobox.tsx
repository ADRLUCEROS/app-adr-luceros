import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { normalizeString } from "@/utils/normalizeText"

export interface ItemCombobox {
  id: string | number
  name: string
}

interface ComboboxProps {
  items: ItemCombobox[]
  value: string | number
  onChange: (id: string | number) => void
  placeholder?: string
  className?: string
  classNameContent?: string
  isDisabled?: boolean
  isLoading?: boolean
}

export function BaseCombobox({ 
  items, 
  value,
  onChange, 
  className = "", 
  classNameContent = "", 
  placeholder = "Seleccionar...",
  isDisabled = false,
  isLoading = false, 
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredItems = React.useMemo(() => {
    if (!search) return items

    const normalizedSearch = normalizeString(search)

    return items.filter((item) =>
      normalizeString(item.name).includes(normalizedSearch)
    )
  }, [items, search])

  const selectedItem = items.find((item) => item.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={isDisabled || isLoading}
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between truncate ${className}`}
        >
          {isLoading ? 'Cargando...' : (selectedItem ? selectedItem.name : placeholder)}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[200px] p-0 ${classNameContent}`}>
        <Command>
          <CommandInput
            placeholder={`Buscar ${placeholder.toLowerCase()}`}
            className="h-9"
            value={search}
            onValueChange={setSearch}
            autoFocus
          />
          <CommandList>
            {filteredItems.length === 0 && <CommandEmpty>Elemento no encontrado.</CommandEmpty>}
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onChange(item.id)
                    setOpen(false)
                    setSearch("")
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}