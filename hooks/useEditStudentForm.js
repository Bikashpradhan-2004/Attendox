import { useState, useEffect } from "react";
import { toast } from "sonner";
import ApiClient from "@/lib/ApiClient";

export const useEditStudentForm = (refreshData) => {
  const [loading, setLoading] = useState(false);
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const resp = await ApiClient.GetAllGrades();
        setGradeOptions(resp.data);
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      }
    };
    fetchGrades();
  }, []);

  const handleUpdate = async (id, values, formikBag) => {
    setLoading(true);
    try {
      const resp = await ApiClient.UpdateStudent(id, values);
      if (resp) {
        toast.success("Student updated successfully!");
        formikBag.resetForm();
        refreshData();
        return true;
      }
    } catch (error) {
      toast.error("Failed to update student");
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, gradeOptions, handleUpdate };
};
