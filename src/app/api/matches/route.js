/**
 * API Route: GET /api/matches  &  POST /api/matches
 * Backend & DB Rubric criterion.
 *
 * GET  /api/matches          — list all match requests
 * POST /api/matches          — create a new match request
 *
 * Week 5: In-memory store (resets on server restart).
 * Week 9: Replace with MongoDB collection "match_requests".
 *
 * MongoDB collection schema (Week 9):
 * {
 *   _id: ObjectId,
 *   requesterId: ObjectId (ref: students),
 *   targetId: ObjectId (ref: students),
 *   status: "pending" | "accepted" | "rejected",
 *   createdAt: Date,
 *   updatedAt: Date,
 * }
 */

import { NextResponse } from "next/server";

// In-memory store — Week 5 only
const matchRequests = [
  {
    id: "req_001",
    requesterId: 1,
    requesterName: "Aarav Sharma",
    targetId: 3,
    targetName: "Rohan Mehta",
    status: "accepted",
    createdAt: new Date("2026-09-10T09:00:00Z").toISOString(),
  },
  {
    id: "req_002",
    requesterId: 4,
    requesterName: "Sneha Reddy",
    targetId: 2,
    targetName: "Priya Patel",
    status: "pending",
    createdAt: new Date("2026-09-12T14:30:00Z").toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(
    { success: true, count: matchRequests.length, data: matchRequests },
    { status: 200 }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { requesterId, requesterName, targetId, targetName } = body;

    if (!requesterId || !targetId) {
      return NextResponse.json(
        { success: false, message: "requesterId and targetId are required." },
        { status: 400 }
      );
    }

    // Check for duplicate pending request
    const duplicate = matchRequests.find(
      (r) =>
        r.requesterId === requesterId &&
        r.targetId === targetId &&
        r.status === "pending"
    );
    if (duplicate) {
      return NextResponse.json(
        { success: false, message: "A pending request already exists." },
        { status: 409 }
      );
    }

    const newRequest = {
      id: `req_${Date.now()}`,
      requesterId,
      requesterName: requesterName ?? `Student ${requesterId}`,
      targetId,
      targetName: targetName ?? `Student ${targetId}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    matchRequests.push(newRequest);

    return NextResponse.json(
      { success: true, message: "Match request sent.", data: newRequest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error.", error: error.message },
      { status: 500 }
    );
  }
}
