import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");
  if (!grade || !month)
    return NextResponse.json(
      { error: "grade & month required" },
      { status: 400 }
    );

  const result = await db
    .select({
      name: STUDENTS.name,
      present: ATTENDANCE.present,
      day: ATTENDANCE.day,
      date: ATTENDANCE.date,
      grade: STUDENTS.grade,
      studentId: STUDENTS.id,
    })
    .from(STUDENTS)
    .leftJoin(
      ATTENDANCE,
      and(eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month))
    )
    .where(and(eq(STUDENTS.grade, grade), eq(STUDENTS.userId, user.id)));

  return NextResponse.json(result);
}

export async function POST(req) {
  const data = await req.json();
  if (!data.studentId || data.present === undefined || !data.day || !data.date)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const result = await db.insert(ATTENDANCE).values(data);
  return NextResponse.json(result, { status: 201 });
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  const day = searchParams.get("day");

  if (!studentId || !date || !day)
    return NextResponse.json(
      { error: "studentId, date, day required" },
      { status: 400 }
    );

  const result = await db
    .delete(ATTENDANCE)
    .where(
      and(
        eq(ATTENDANCE.studentId, studentId),
        eq(ATTENDANCE.day, day),
        eq(ATTENDANCE.date, date)
      )
    );

  return NextResponse.json(result);
}
