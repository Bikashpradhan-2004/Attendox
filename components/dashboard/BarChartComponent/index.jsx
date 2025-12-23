import { getUniqueRecord } from "@/components/Attendance/AttendanceGrid/utils/attendanceHelpers";
import { useEffect, useState } from "react";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ attendanceList, totalPresentData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    formatAttendanceListCount();
  }, [attendanceList, totalPresentData]);

  const formatAttendanceListCount = () => {
    const totalStudent = getUniqueRecord(attendanceList);
    const result = totalPresentData.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    }));
    console.log(result);
    setData(result);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="mb-4 font-bold text-xl">Attendance</h2>
      <div className="h-[200px] md:h-[300px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="presentCount" name="Total Present" fill="#8884d8" />
            <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
