import {
  getUniqueRecord,
  generateDaysArray,
  isPresent,
} from "./attendanceHelpers";

/**
 * Map attendance data to grid row format
 */
const mapUserAttendance = (user, attendanceList, daysArray) => {
  const attendanceMap = {};

  daysArray.forEach((day) => {
    attendanceMap[day] = isPresent(attendanceList, user.studentId, day);
  });

  return { ...user, ...attendanceMap };
};

/**
 * Transform attendance list into grid-ready data
 */
export const transformAttendanceData = (attendanceList, selectedMonth) => {
  if (!attendanceList) return { rowData: [], daysArray: [] };

  const daysArray = generateDaysArray(selectedMonth);
  const uniqueUsers = getUniqueRecord(attendanceList);

  const rowData = uniqueUsers.map((user) =>
    mapUserAttendance(user, attendanceList, daysArray)
  );

  return { rowData, daysArray };
};
