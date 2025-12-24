import { getUniqueRecord } from "@/components/Attendance/AttendanceGrid/utils/attendanceHelpers";
import moment from "moment";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ attendanceList, selectedMonth }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!attendanceList || attendanceList.length === 0) return;

    const uniqueStudents = getUniqueRecord(attendanceList);
    const totalStudents = uniqueStudents.length;

    const selected = moment(selectedMonth);
    const current = moment();

    let daysToConsider = 0;

    // Current month → till today
    if (selected.isSame(current, "month")) {
      daysToConsider = current.date();
    }
    // Past month → full month
    else if (selected.isBefore(current, "month")) {
      daysToConsider = selected.daysInMonth();
    }

    const totalPossibleAttendance = totalStudents * daysToConsider;

    const presentCount = attendanceList.filter(
      (record) => record.present === true
    ).length;

    const presentPercentage =
      totalPossibleAttendance > 0
        ? (presentCount / totalPossibleAttendance) * 100
        : 0;

    setData([
      {
        name: "Present %",
        value: Number(presentPercentage.toFixed(1)),
        fill: "#8884d8",
      },
      {
        name: "Absent %",
        value: Number((100 - presentPercentage).toFixed(1)),
        fill: "#82ca9d",
      },
    ]);
  }, [attendanceList, selectedMonth]);

  return (
    <div className="p-4 border rounded-lg shadow-md h-full">
      <h2 className="font-bold text-xl">Monthly Attendance</h2>
      <div className="h-[200px] md:h-[300px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
