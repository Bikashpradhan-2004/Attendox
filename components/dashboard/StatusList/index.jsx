import { getUniqueRecord } from "@/components/Attendance/AttendanceGrid/utils/attendanceHelpers";
import moment from "moment";
import { useEffect, useState } from "react";
import Card from "./Card";
import {
  FaGraduationCap,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

const StatusList = ({ attendanceList }) => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const uniqueStudents = getUniqueRecord(attendanceList);
      const totalStudents = uniqueStudents.length;

      const daysSoFar = Number(moment().format("D"));
      const totalPossibleAttendance = totalStudents * daysSoFar;

      const presentCount = attendanceList.filter(
        (record) => record.present === true
      ).length;

      const presentPercentage =
        totalPossibleAttendance > 0
          ? (presentCount / totalPossibleAttendance) * 100
          : 0;

      setTotalStudent(totalStudents);
      setPresentPerc(presentPercentage);
    }
  }, [attendanceList]);

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
