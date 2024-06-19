"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CircleX } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconButton } from "@mui/material";
import { Close } from "@radix-ui/react-toast";
import { ExitIcon } from "@radix-ui/react-icons";

interface Props {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function DatePicker({ date, setDate }: Props) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [value, setValue] = React.useState(date);

  const selectDate = (date?: Date) => {
    setValue(date);
    setCalendarOpen(false);
    setDate(date);
  };

  const clearDate = (e: any) => {
    setValue(undefined);
    e.stopPropagation();
    setCalendarOpen(false);
    setDate(undefined);
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "md:w-[280px] w-[372px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            <>
              {format(value, "PPP")}
              <CircleX className="ml-auto cursor-pointer" onClick={clearDate} />
            </>
          ) : (
            <span>Select Custom date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={selectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
