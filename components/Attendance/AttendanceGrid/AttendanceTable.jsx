import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const AttendanceTable = ({
  rowData,
  colDefs,
  onCellValueChanged,
  height = 521,
  minWidth = 1992,
  paginationPageSize = 10,
  paginationPageSizeOptions = [10, 20, 50],
  rowHeight = 42,
  headerHeight = 48,
}) => {
  const defaultColDef = useMemo(
    () => ({
      resizable: false,
    }),
    []
  );

  return (
    <div className="table-container my-5">
      <div className="ag-theme-quartz" style={{ height, minWidth }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          pagination
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeOptions}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          animateRows
        />
      </div>
      <style jsx global>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        .ag-body-horizontal-scroll {
          display: none !important;
        }

        .ag-theme-quartz .ag-paging-panel {
          min-height: 50px;
        }
      `}</style>
    </div>
  );
};

export default AttendanceTable;
