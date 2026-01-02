"use client";

import { useMemo, useCallback, useState } from "react";
import ActionCell from "./ActionCell";
import DataTable from "./DataTable";
import useTableData from "@/hooks/useTableData";
import SearchBar from "./SearchBar";
import { getStudentColumnDefs } from "./utils/getStudentColumnDefs";
import EditStudentDialog from "./EditStudentDialog";
import { useStudentDeleteAction } from "@/hooks/useStudentDeleteAction";

const StudentListTable = ({ studentList, refreshData }) => {
  const { data, searchText, handleSearch } = useTableData(studentList);
  const { handleDelete } = useStudentDeleteAction(refreshData);
  const [editStudent, setEditStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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

  return (
    <div className="my-5">
      <SearchBar
        value={searchText}
        onChange={handleSearch}
        placeholder="Search on Anything..."
      />
      <DataTable data={data} columnDefs={columnDefs} searchText={searchText} />

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
