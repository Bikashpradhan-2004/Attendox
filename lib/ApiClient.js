import axios from "axios";

const GetAllGrades = () => axios.get("/api/grade");

const CreateNewStudent = (data) => axios.post("/api/student", data);

const GetAllStudents = () => axios.get("/api/student");

const UpdateStudent = (id, data) => axios.patch(`/api/student?id=${id}`, data);

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

const TotalPresentCountByDay = (date, grade) =>
  axios.get("/api/dashboard", {
    params: { date, grade },
  });

const ApiClient = {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  UpdateStudent,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  markAbsent,
  TotalPresentCountByDay,
};

export default ApiClient;
