"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, CircleX } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

interface Props {
  start: string | null;
  end: string | null;
  setDateRange: (start?: Date, end?: Date) => void;
}

export function DateRangePicker({ start, end, setDateRange }: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (start) {
      setRange({
        from: new Date(start),
        to: new Date(end!),
      });
    }
  }, [start, end]);

  const handleSelect = (range: DateRange | undefined) => {
    setRange(range);
    if (range?.from && range?.to) {
      setCalendarOpen(false);
      setDateRange(range?.from, range?.to);
    }
  };

  const clearDate = (e: any) => {
    setRange(undefined);
    e.stopPropagation();
    setCalendarOpen(false);
    setDateRange(undefined);
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      {" "}
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "md:w-[280px] w-[372px] justify-start text-left font-normal"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from && range?.to ? (
            <>
              {`${format(range?.from!, "MM/dd/yyyy")} to ${format(range?.to!, "MM/dd/yyyy")}`}
              <CircleX className="ml-auto cursor-pointer" onClick={clearDate} />
            </>
          ) : (
            <span>Select Custom date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
