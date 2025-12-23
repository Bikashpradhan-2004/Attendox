"use client";
import GradeSelect from "@/components/Attendance/GradeSelect";
import MonthSelection from "@/components/Attendance/MonthSelection";
import BarChartComponent from "@/components/Dashboard/BarChartComponent";
import PieChartComponent from "@/components/Dashboard/PieChartComponent";
import StatusList from "@/components/Dashboard/StatusList";
import ApiClient from "@/lib/ApiClient";
import moment from "moment";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState("5th");
  const [attendanceList, setAttendanceList] = useState(null);
  const [totalPresentData, setTotalPresentData] = useState([]);

  const getStudentAttendance = () => {
    ApiClient.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((resp) => {
      setAttendanceList(resp.data);
    });
  };

  const getTotalPresentCountByDay = () => {
    ApiClient.TotalPresentCountByDay(
      moment(selectedMonth).format("MM/yyyy"),
      selectedGrade
    ).then((resp) => {
      setTotalPresentData(resp.data);
    });
  };

  useEffect(() => {
    getTotalPresentCountByDay();
    getStudentAttendance();
  }, [selectedMonth, selectedGrade]);

  return (
    <div className="p-4 lg:p-10">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex gap-4 items-center">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 my-10 gap-5">
        <div className="md:col-span-2">
          <BarChartComponent
            attendanceList={attendanceList}
            totalPresentData={totalPresentData}
          />
        </div>
        <PieChartComponent attendanceList={attendanceList} />
      </div>
    </div>
  );
};

export default Dashboard;
