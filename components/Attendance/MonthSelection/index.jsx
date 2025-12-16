"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addMonths, format } from "date-fns";
import { useState } from "react";
import { PiCalendar } from "react-icons/pi";

const MonthSelection = ({ onMonthSelect }) => {
  const [month, setMonth] = useState(addMonths(new Date(), 0));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-slate-500"
        >
          <PiCalendar />
          {format(month, "MMM yyyy")}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          mode="single"
          month={month}
          onMonthChange={(newMonth) => {
            setMonth(newMonth);
            onMonthSelect?.(newMonth);
          }}
          showOutsideDays={false}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MonthSelection;
