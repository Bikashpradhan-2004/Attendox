import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, forwardRef, useImperativeHandle, useRef } from "react";

import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable = forwardRef(({
  data = [],
  columnDefs = [],
  searchText = "",
  height = 501,
  minWidth = 1050,
  paginationPageSize = 10,
  paginationPageSizeOptions = [10, 20, 50],
  rowHeight = 40,
  headerHeight = 48,
}, ref) => {
  const gridRef = useRef();

  const defaultColDef = useMemo(
    () => ({
      cellStyle: { borderRight: "1px solid #dee2e6" },
    }),
    []
  );

  useImperativeHandle(ref, () => ({
    api: gridRef.current?.api,
    columnApi: gridRef.current?.columnApi,
  }));

  return (
    <div className="table-container my-5">
      <div className="ag-theme-quartz" style={{ height, minWidth }}>
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={searchText}
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

        .ag-center-cols-viewport {
          overflow-x: hidden !important;
        }

        .ag-theme-quartz .ag-paging-panel {
          min-height: 50px;
        }
      `}</style>
    </div>
  );
});

DataTable.displayName = "DataTable";

export default DataTable;