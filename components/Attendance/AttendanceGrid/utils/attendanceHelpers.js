import moment from "moment";

/**
 * Get unique student records from attendance list
 */
export const getUniqueRecord = (attendanceList) => {
  const uniqueRecord = [];
  const existingUser = new Set();

  attendanceList?.forEach((record) => {
    if (!existingUser.has(record.studentId)) {
      existingUser.add(record.studentId);
      uniqueRecord.push(record);
    }
  });

  return uniqueRecord;
};

/**
 * Generate array of days for a given month
 */
export const generateDaysArray = (selectedMonth) => {
  const days = moment(selectedMonth).daysInMonth();
  return Array.from({ length: days }, (_, i) => i + 1);
};

/**
 * Check if student is present on a specific day
 */
export const isPresent = (attendanceList, studentId, day) => {
  const result = attendanceList.find(
    (item) => item.day == day && item.studentId == studentId
  );
  return result ? true : false;
};
