"use client";
import GradeSelect from "@/components/Attendance/GradeSelect";
import MonthSelection from "@/components/Attendance/MonthSelection";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");

  const onSearchHandler = () => {
    console.log("Grade:", selectedGrade);
    console.log(
      "Month:",
      selectedMonth ? format(selectedMonth, "MMM yyyy") : "Not selected"
    );
  };

  return (
    <div className="p-7">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <div className="flex gap-4 border rounded-lg my-4 p-4 shadow- md">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={setSelectedMonth} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>

        <Button onClick={onSearchHandler} className="py-5 px-8 font-bold">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Attendance;
