"use client"

import { cn } from "@/lib/utils"
import { FormControl } from "./form"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Check, ChevronDown } from "lucide-react"

const presetColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#000080",
  "#FFC0CB",
  "#A52A2A",
  "#808080",
  "#000000",
  "#FFFFFF",
]

interface ColorPickerProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn("w-full justify-between", className)}
          >
            <div className="flex items-center gap-2">
              {value && (
                <div
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: value }}
                />
              )}
              <span>{value || "Renk seçin"}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((color) => (
            <Button
              key={color}
              variant="outline"
              className="h-8 w-8 p-0 flex items-center justify-center"
              style={{ backgroundColor: color }}
              onClick={() => onChange?.(color)}
            >
              {value === color && (
                <Check className={cn(
                  "h-4 w-4",
                  color === "#000000" || 
                  color === "#000080" || 
                  color === "#800080" || 
                  color === "#008000" || 
                  color === "#A52A2A" ? "text-white" : "text-black"
                )} />
              )}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange?.(e.target.value)}
            className="h-8 w-full cursor-pointer"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}