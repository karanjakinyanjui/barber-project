"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
  const initialRange: DateRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };

  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (start) {
      setRange({
        from: new Date(start),
        to: new Date(end!),
      });
    }
  }, [range]);

  const handleSelect = (range: DateRange | undefined) => {
    setCalendarOpen(false);
    setRange(range);
    setDateRange(range?.from, range?.to);
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      {" "}
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from && range?.to ? (
            `${format(range?.from!, "PPP")} to ${format(range?.to!, "PPP")}`
          ) : (
            <span>Select Custom date</span>
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
