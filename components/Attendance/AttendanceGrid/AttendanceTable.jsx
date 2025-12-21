import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const AttendanceTable = ({
  rowData,
  colDefs,
  onCellValueChanged,
  paginationPageSize = 10,
  paginationPageSizeOptions = [10, 20, 50],
  defaultColDef = {
    sortable: true,
    resizable: true,
  },
}) => {
  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
        pagination
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeOptions}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default AttendanceTable;
