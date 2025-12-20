"use client";
import GradeSelect from "@/components/Attendance/GradeSelect";
import MonthSelection from "@/components/Attendance/MonthSelection";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import moment from "moment/moment";
import ApiClient from "@/lib/ApiClient";
import AttendanceGrid from "@/components/Attendance/AttendanceGrid";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendanceList, setAttendanceList] = useState(null);

  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/yyyy");
    ApiClient.GetAttendanceList(selectedGrade, month).then((resp) => {
      setAttendanceList(resp.data);
    });
  };

  return (
    <div className="p-7">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <div className="flex flex-wrap gap-4 border rounded-lg my-4 p-4 shadow- md">
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
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendance;
