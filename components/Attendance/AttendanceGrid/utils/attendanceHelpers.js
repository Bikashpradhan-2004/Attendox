import moment from "moment";

export const getUniqueRecord = (attendanceList) => {
  if (!attendanceList) return [];

  const uniqueMap = new Map();

  attendanceList.forEach((record) => {
    if (!uniqueMap.has(record.studentId)) {
      uniqueMap.set(record.studentId, record);
    }
  });

  return Array.from(uniqueMap.values());
};

export const generateDaysArray = (selectedMonth) => {
  const days = moment(selectedMonth).daysInMonth();
  return Array.from({ length: days }, (_, i) => i + 1);
};

export const isPresent = (attendanceList, studentId, day) => {
  return attendanceList.some(
    (item) => item.day === day && item.studentId === studentId
  );
};
