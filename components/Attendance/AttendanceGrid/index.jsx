import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import moment from "moment";
import ApiClient from "@/lib/ApiClient";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  const getUniqueRecord = (attendanceList) => {
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

  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/yyyy");
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date,
      };
      ApiClient.MarkAttendance(data).then((resp) => {
        console.log(resp);
        toast(`Student Id: ${studentId} Marked as present`);
      });
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const numberOfDays = daysInMonth(
    moment(selectedMonth).format("YYYY"),
    moment(selectedMonth).format("MM")
  );

  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord(attendanceList);

      const newColDefs = [
        { field: "studentId" },
        { field: "name" },
        ...daysArrays.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
        })),
      ];

      userList.forEach((obj) => {
        daysArrays.forEach((date) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });

      setColDefs(newColDefs);
      setRowData(userList);
    }
  }, [attendanceList]);

  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
          }
        />
      </div>
    </div>
  );
};

export default AttendanceGrid;
