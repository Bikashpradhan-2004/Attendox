"use client";

import { useMemo, useCallback } from "react";
import { toast } from "sonner";

import ActionCell from "./ActionCell";
import ApiClient from "@/lib/ApiClient";
import DataTable from "./DataTable";
import useTableData from "@/hooks/useTableData";
import { getStudentColumnDefs } from "@/components/Students/StudentListTable/utils/getStudentColumnDefs";
import SearchBar from "./SearchBar";

const StudentListTable = ({ studentList, refreshData }) => {
  const { data, searchText, handleSearch } = useTableData(studentList);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const resp = await ApiClient.DeleteStudentRecord(id);
        if (resp) {
          toast.success("Record deleted successfully!");
          refreshData();
        }
      } catch (error) {
        toast.error("Failed to delete record");
      }
    },
    [refreshData]
  );

  const actionCellRenderer = useCallback(
    (props) => <ActionCell data={props.data} onDelete={handleDelete} />,
    [handleDelete]
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
    </div>
  );
};

export default StudentListTable;
