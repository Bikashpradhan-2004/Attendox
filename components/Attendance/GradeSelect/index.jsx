"use client";
import { useStudentForm } from "@/hooks/useStudentForm";

function GradeSelect({ selectedGrade }) {
  const { gradeOptions } = useStudentForm();

  return (
    <select
      className="p-2 border rounded-lg"
      onChange={(e) => selectedGrade(e.target.value)}
    >
      <option value="">Select Grade</option>
      {gradeOptions.map((item, index) => (
        <option key={index} value={item.grade}>
          {item.grade}
        </option>
      ))}
    </select>
  );
}

export default GradeSelect;
