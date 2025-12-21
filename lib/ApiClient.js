import axios from "axios";

const GetAllGrades = () => axios.get("/api/grade");

const CreateNewStudent = (data) => axios.post("/api/student", data);

const GetAllStudents = () => axios.get("/api/student");

const DeleteStudentRecord = (id) => axios.delete(`/api/student?id=${id}`);

const GetAttendanceList = (grade, month) =>
  axios.get("/api/attendance", {
    params: { grade, month },
  });

const MarkAttendance = (data) => axios.post("/api/attendance", data);

const markAbsent = (studentId, day, date) =>
  axios.delete(
    `/api/attendance?studentId=${studentId}&day=${day}&date=${date}`
  );

const ApiClient = {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  markAbsent,
};

export default ApiClient;
