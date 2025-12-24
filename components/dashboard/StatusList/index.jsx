import { getUniqueRecord } from "@/components/Attendance/AttendanceGrid/utils/attendanceHelpers";
import moment from "moment";
import { useEffect, useState } from "react";
import Card from "./Card";
import {
  FaGraduationCap,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

const StatusList = ({ attendanceList, selectedMonth }) => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (!attendanceList || attendanceList.length === 0) return;

    const uniqueStudents = getUniqueRecord(attendanceList);
    const totalStudents = uniqueStudents.length;

    const selected = moment(selectedMonth);
    const current = moment();

    let daysToConsider = 0;

    // Same month & year → use today’s date
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

    setTotalStudent(totalStudents);
    setPresentPerc(presentPercentage);
  }, [attendanceList, selectedMonth]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<FaGraduationCap />}
        title="Total Students"
        value={totalStudent}
      />
      <Card
        icon={<FaArrowTrendUp />}
        title="Attendance %"
        value={presentPerc.toFixed(1)}
      />
      <Card
        icon={<FaArrowTrendDown />}
        title="Absent %"
        value={(100 - presentPerc).toFixed(1)}
      />
    </div>
  );
};

export default StatusList;
