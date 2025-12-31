import moment from "moment";
import ApiClient from "@/lib/ApiClient";
import { toast } from "sonner";

export const attendanceService = {
  async markPresent(studentId, day, date) {
    const data = { day, studentId, present: true, date };
    await ApiClient.MarkAttendance(data);
    toast(`Student Id: ${studentId} marked as present`);
  },

  async markAbsent(studentId, day, date) {
    await ApiClient.markAbsent(studentId, day, date);
    toast(`Student Id: ${studentId} marked as absent`);
  },

  async markAttendance(studentId, day, selectedMonth, isPresent) {
    const date = moment(selectedMonth).format("MM/yyyy");
    try {
      if (isPresent) {
        await this.markPresent(studentId, day, date);
      } else {
        await this.markAbsent(studentId, day, date);
      }
      return { success: true };
    } catch (error) {
      toast.error(`Failed to mark attendance for Student Id: ${studentId}`);
      console.error("Attendance marking error:", error);
      return { success: false, error };
    }
  },
};
