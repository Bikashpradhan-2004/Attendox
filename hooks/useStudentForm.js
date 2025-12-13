import { useState, useEffect } from "react";
import ApiClient from "@/lib/ApiClient";
import { toast } from "sonner";

export const useStudentForm = (refreshData) => {
  const [loading, setLoading] = useState(false);
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const resp = await ApiClient.GetAllGrades();
      setGradeOptions(resp.data || []);
    } catch (error) {
      console.error("Error fetching grades:", error);
      toast.error("Failed to load grades");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await ApiClient.CreateNewStudent(values);
      toast.success("New Student Added!");
      resetForm();
      if (refreshData) refreshData();
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add student!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    gradeOptions,
    handleSubmit,
  };
};
