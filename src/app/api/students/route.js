/**
 * API Route: GET /api/students
 * Backend & DB Rubric criterion.
 *
 * Week 5: Returns mock data — demonstrates API route structure.
 * Week 9: Replace mockStudents import with a real MongoDB query via
 *         the getDb() helper from @/lib/mongodb.
 *
 * MongoDB query (Week 9):
 *   const db = await getDb();
 *   const students = await db.collection("students").find({}).toArray();
 */

import { NextResponse } from "next/server";
import { mockStudents } from "@/lib/mockStudents";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    let students = [...mockStudents];

    // Query param: ?gender=Male
    const gender = searchParams.get("gender");
    if (gender) {
      students = students.filter(
        (s) => s.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    // Query param: ?status=Allocated
    const status = searchParams.get("status");
    if (status) {
      students = students.filter(
        (s) => s.allocationStatus.toLowerCase() === status.toLowerCase()
      );
    }

    // Query param: ?block=A
    const block = searchParams.get("block");
    if (block) {
      students = students.filter(
        (s) => s.hostelBlock.toLowerCase() === block.toLowerCase()
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: students.length,
        data: students,
        source: "mock", // Change to "mongodb" in Week 9
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch students", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Week 9 MongoDB implementation (reference):
 *
 * import clientPromise, { getDb } from "@/lib/mongodb";
 *
 * export async function GET(request) {
 *   const db = await getDb();
 *   const students = await db.collection("students").find({}).toArray();
 *   return NextResponse.json({ success: true, count: students.length, data: students });
 * }
 *
 * export async function POST(request) {
 *   const body = await request.json();
 *   const db = await getDb();
 *   const result = await db.collection("students").insertOne(body);
 *   return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
 * }
 */
