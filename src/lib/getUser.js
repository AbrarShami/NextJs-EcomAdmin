"use server";

import { cookies } from "next/headers";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session")?.value;
  if (!sessionId) return null;

  const sessions = await getCollection("sessions");
  if (!sessions) return null;

  // adjust field names to match your sessions schema
  const session = await sessions.findOne({ _id: new ObjectId(sessionId) }).catch(() => null);
  if (!session?.userId) return null;

  const users = await getCollection("users");
  const user = await users.findOne({ _id: new ObjectId(session.userId) }).catch(() => null);
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name ?? null,
    email: user.email ?? null,
  };
}