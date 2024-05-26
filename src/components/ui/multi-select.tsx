import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: OptionType[];
  onChange: React.Dispatch<React.SetStateAction<OptionType[]>>;
  className?: string;
}

function MultiSelect({ options, selected, onChange, className, ...props }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: OptionType) => {
    onChange(selected.filter(i => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between ${selected.length > 1 ? "h-full" : "h-10"}`}
          onClick={() => setOpen(!open)}>
          <div className='flex gap-1 flex-wrap'>
            {selected.map(item => (
              <Badge
                variant='secondary'
                key={item.value}
                className='mr-1 mb-1 max-w-72'
                onClick={() => handleUnselect(item)}>
                <span className='line-clamp-1 truncate block'>{item.label}</span>
                <button
                  className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}>
                  <X className='h-3 w-3 min-h-3 min-w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command className={className}>
          <CommandInput placeholder='Search ...' />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className='max-h-64 overflow-auto'>
            {options.map(option => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.some(item => item.value === option.value)
                      ? selected.filter(item => item.value !== option.value)
                      : [...selected, option]
                  );
                  setOpen(true);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 min-h-4 min-w-4",
                    selected.some(item => item.value === option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
