import { useEffect, useState, useCallback, useMemo } from "react";
import { attendanceService } from "@/components/Attendance/AttendanceGrid/utils/attendanceService";
import { buildColumnDefinitions } from "@/components/Attendance/AttendanceGrid/utils/columnBuilder";
import { transformAttendanceData } from "@/components/Attendance/AttendanceGrid/utils/attendanceDataMapper";

export const useAttendanceGrid = (attendanceList, selectedMonth) => {
  const [gridData, setGridData] = useState({ rowData: [], daysArray: [] });

  useEffect(() => {
    const data = transformAttendanceData(attendanceList, selectedMonth);
    setGridData(data);
  }, [attendanceList, selectedMonth]);

  const colDefs = useMemo(
    () => buildColumnDefinitions(gridData.daysArray, selectedMonth),
    [gridData.daysArray, selectedMonth]
  );

  const onMarkAttendance = useCallback(
    async (day, studentId, presentStatus) => {
      return await attendanceService.markAttendance(
        studentId,
        day,
        selectedMonth,
        presentStatus
      );
    },
    [selectedMonth]
  );

  return {
    rowData: gridData.rowData,
    colDefs,
    onMarkAttendance,
  };
};
