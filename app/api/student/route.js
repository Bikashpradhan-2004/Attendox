import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.name || !data.grade)
    return NextResponse.json(
      { error: "name & grade required" },
      { status: 400 }
    );

  const result = await db.insert(STUDENTS).values({
    name: data.name,
    grade: data.grade,
    address: data.address || "",
    contact: data.phone || "",
    userId: user.id,
  });

  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await db
    .select()
    .from(STUDENTS)
    .where(eq(STUDENTS.userId, user.id));
  return NextResponse.json(result);
}

export async function DELETE(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const result = await db
    .delete(STUDENTS)
    .where(and(eq(STUDENTS.id, id), eq(STUDENTS.userId, user.id)));

  return NextResponse.json(result);
}
