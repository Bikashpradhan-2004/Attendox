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
 * Calculate number of days in a month
 */
export const daysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Generate array of days for a given month
 */
export const generateDaysArray = (selectedMonth) => {
  const year = moment(selectedMonth).format("YYYY");
  const month = moment(selectedMonth).format("MM");
  const numberOfDays = daysInMonth(year, month);

  return Array.from({ length: numberOfDays }, (_, i) => i + 1);
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
