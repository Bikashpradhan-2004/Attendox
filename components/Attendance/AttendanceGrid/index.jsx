import React, { useEffect, useState } from "react";

function getUniqueRecord(attendanceList) {
  const uniqueRecord = [];
  const existingUser = new Set();

  attendanceList?.forEach((record) => {
    if (!existingUser.has(record.studentId)) {
      existingUser.add(record.studentId);
      uniqueRecord.push(record);
    }
  });

  return uniqueRecord;
}

function AttendanceGrid({ attendanceList }) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const userList = getUniqueRecord(attendanceList);
    console.log(userList);
    setRowData(userList);
  }, [attendanceList]);

  return (
    <div>
      AttendanceGrid
      {/* Later you can map rowData here */}
    </div>
  );
}

export default AttendanceGrid;
