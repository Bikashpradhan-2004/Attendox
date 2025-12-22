"use client";
import GradeSelect from "@/components/Attendance/GradeSelect";
import MonthSelection from "@/components/Attendance/MonthSelection";
import StatusList from "@/components/Dashboard/StatusList";
import ApiClient from "@/lib/ApiClient";
import moment from "moment";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendanceList, setAttendanceList] = useState(null);

  const getStudentAttendance = () => {
    ApiClient.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((resp) => {
      setAttendanceList(resp.data);
    });
  };

  useEffect(() => {
    getStudentAttendance();
  }, [selectedMonth, selectedGrade]);

  return (
    <div className="p-10 ">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex gap-4 items-center">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />
    </div>
  );
};

export default Dashboard;
