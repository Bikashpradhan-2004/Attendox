import { useAttendanceGrid } from "@/hooks/useAttendanceGrid";
import AttendanceTable from "./AttendanceTable";

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const { rowData, colDefs, onMarkAttendance } = useAttendanceGrid(
    attendanceList,
    selectedMonth
  );

  const handleCellValueChanged = (e) => {
    onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue);
  };

  return (
    <div>
      <AttendanceTable
        rowData={rowData}
        colDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
      />
    </div>
  );
};

export default AttendanceGrid;
