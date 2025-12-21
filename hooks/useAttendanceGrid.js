import { useEffect, useState } from "react";
import moment from "moment";
import ApiClient from "@/lib/ApiClient";
import { toast } from "sonner";
import {
  getUniqueRecord,
  generateDaysArray,
  isPresent,
} from "@/components/Attendance/AttendanceGrid/utils/attendanceHelpers";

export const useAttendanceGrid = (attendanceList, selectedMonth) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  /**
   * Mark student attendance (present or absent)
   */
  const onMarkAttendance = async (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/yyyy");

    try {
      if (presentStatus) {
        const data = {
          day: day,
          studentId: studentId,
          present: presentStatus,
          date: date,
        };
        await ApiClient.MarkAttendance(data);
        toast(`Student Id: ${studentId} marked as present`);
      } else {
        await ApiClient.markAbsent(studentId, day, date);
        toast(`Student Id: ${studentId} marked as absent`);
      }
    } catch (error) {
      toast.error(`Failed to mark attendance for Student Id: ${studentId}`);
      console.error("Attendance marking error:", error);
    }
  };

  /**
   * Process attendance data and generate grid structure
   */
  useEffect(() => {
    if (!attendanceList) return;

    const daysArray = generateDaysArray(selectedMonth);
    const userList = getUniqueRecord(attendanceList);

    // Add attendance status for each day to user records
    userList.forEach((user) => {
      daysArray.forEach((day) => {
        user[day] = isPresent(attendanceList, user.studentId, day);
      });
    });

    // Generate column definitions
    const newColDefs = [
      { field: "studentId", filter: true },
      { field: "name", filter: true },
      ...daysArray.map((date) => ({
        field: date.toString(),
        width: 50,
        editable: true,
      })),
    ];

    setColDefs(newColDefs);
    setRowData(userList);
  }, [attendanceList]);

  return {
    rowData,
    colDefs,
    onMarkAttendance,
  };
};
