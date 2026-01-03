"use client";

import { useMemo, useCallback, useState, useRef } from "react";
import ActionCell from "./ActionCell";
import DataTable from "./DataTable";
import useTableData from "@/hooks/useTableData";
import SearchBar from "./SearchBar";
import { getStudentColumnDefs } from "./utils/getStudentColumnDefs";
import EditStudentDialog from "./EditStudentDialog";
import { useStudentDeleteAction } from "@/hooks/useStudentDeleteAction";
import { exportAgGridToPdf } from "./utils/pdfExport";
import { FaDownload } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const StudentListTable = ({ studentList, refreshData }) => {
  const { data, searchText, handleSearch } = useTableData(studentList);
  const { handleDelete } = useStudentDeleteAction(refreshData);

  const [editStudent, setEditStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const gridRef = useRef(null);

  const handleEdit = useCallback((studentData) => {
    setEditStudent(studentData);
    setEditDialogOpen(true);
  }, []);

  const actionCellRenderer = useCallback(
    (props) => (
      <ActionCell
        data={props.data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    [handleEdit, handleDelete]
  );

  const columnDefs = useMemo(
    () => getStudentColumnDefs(actionCellRenderer),
    [actionCellRenderer]
  );

  const handleExportPdf = useCallback(() => {
    if (!gridRef.current) return;

    exportAgGridToPdf({
      gridRef,
      columnDefs,
      title: "Student List",
      fileName: "students.pdf",
    });
  }, [columnDefs]);

  return (
    <div className="my-4">
      <div className="flex flex-col-reverse items-start md:flex-row md:justify-between gap-4 mb-6">
        <SearchBar
          value={searchText}
          onChange={handleSearch}
          placeholder="Search on anything..."
        />

        <Button onClick={handleExportPdf} className="flex gap-2">
          <FaDownload />
          Export PDF
        </Button>
      </div>

      <DataTable
        ref={gridRef}
        data={data}
        columnDefs={columnDefs}
        searchText={searchText}
      />

      {editStudent && (
        <EditStudentDialog
          student={editStudent}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default StudentListTable;
