import { useCallback } from "react";
import { toast } from "sonner";
import ApiClient from "@/lib/ApiClient";

export const useStudentDeleteAction = (refreshData) => {
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
        console.error(error);
      }
    },
    [refreshData]
  );

  return { handleDelete };
};