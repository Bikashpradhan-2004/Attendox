import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, and, or, isNull } from "drizzle-orm";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  const result = await db
    .select({
      name: STUDENTS.name,
      present: ATTENDANCE.present,
      day: ATTENDANCE.day,
      date: ATTENDANCE.date,
      grade: STUDENTS.grade,
      studentId: STUDENTS.id,
      attendanceId: ATTENDANCE.id,
    })
    .from(STUDENTS)
    .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId))
    .where(
      and(
        eq(STUDENTS.grade, grade),
        or(eq(ATTENDANCE.date, month), isNull(ATTENDANCE.date))
      )
    );

  return NextResponse.json(result);
}

export async function POST(req) {
  const data = await req.json();
  console.log(data);
  const result = await db.insert(ATTENDANCE).values({
    studentId: data.studentId,
    present: data.present,
    day: data.day,
    date: data.date,
  });
  return NextResponse.json(result);
}
