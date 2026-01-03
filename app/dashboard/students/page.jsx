"use client";
import ApiClient from "@/lib/ApiClient";
import AddNewStudent from "@/components/Students/AddNewStudent";
import StudentListTable from "@/components/Students/StudentListTable";
import { useEffect, useState } from "react";

const students = () => {
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    GetAllStudents();
  }, []);
  const GetAllStudents = () => {
    ApiClient.GetAllStudents().then((resp) => {
      setStudentList(resp.data);
    });
  };
  return (
    <div className="p-7">
      <div className="flex flex-col md:flex-row items-start md:justify-between gap-4">
        <h2 className="font-bold text-2xl">Students</h2>
        <AddNewStudent refreshData={GetAllStudents} />
      </div>
      <StudentListTable
        studentList={studentList}
        refreshData={GetAllStudents}
      />
    </div>
  );
};

export default students;
