import { getUniqueRecord } from "@/components/Attendance/AttendanceGrid/utils/attendanceHelpers";
import moment from "moment";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ attendanceList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const uniqueStudents = getUniqueRecord(attendanceList);
      const daysSoFar = Number(moment().format("D"));

      const presentPercentage =
        (attendanceList.length / (uniqueStudents.length * daysSoFar)) * 100;

      const clampedPresent = Math.min(Math.max(presentPercentage, 0), 100);

      setData([
        {
          name: "Total Present",
          value: Number(clampedPresent.toFixed(1)),
          fill: "#8884d8",
        },
        {
          name: "Absent Percent",
          value: Number((100 - clampedPresent).toFixed(1)),
          fill: "#82ca9d",
        },
      ]);
    }
  }, [attendanceList]);

  return (
    <div className="p-4 border rounded-lg shadow-md h-full">
      <h2 className="font-bold text-xl">Monthly Attendance</h2>
      <div className="h-[200px] md:h-[300px] lg:h-[400px]">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
