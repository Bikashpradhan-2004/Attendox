import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const grade = searchParams.get("grade");

  if (!date || !grade) {
    return NextResponse.json(
      { error: "Date and grade are required" },
      { status: 400 }
    );
  }

  const result = await db
    .select({
      day: ATTENDANCE.day,
      presentCount: sql`count(*)`.as("presentCount"),
    })
    .from(ATTENDANCE)
    .leftJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
    .where(
      and(
        eq(STUDENTS.grade, grade),
        eq(STUDENTS.userId, user.id),
        eq(ATTENDANCE.date, date)
      )
    )
    .groupBy(ATTENDANCE.day)
    .orderBy(desc(ATTENDANCE.day))
    .limit(7);

  return NextResponse.json(result);
}
