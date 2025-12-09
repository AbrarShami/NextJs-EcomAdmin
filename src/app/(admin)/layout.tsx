import React from "react";
import AdminLayoutClient from "./AdminLayoutClient";
import getAuthUser from "@/lib/getAuthUser";
import { getCollection } from "@/lib/db";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const authPayload = await getAuthUser();
    if (!authPayload?.userId || typeof authPayload.userId !== "string" || authPayload.userId.length !== 24) {
        redirect("/landing-page");
    }

    const usersColl = await getCollection("users");
    let userRecord = null;
    try {
        if (usersColl) {
            userRecord = await usersColl.findOne({ _id: new ObjectId(authPayload.userId) });
        }
    } catch (err) {
        console.error("Failed to load user record in AdminLayout:", err);
    }

    const authUser = userRecord
        ? { name: userRecord.name ?? null, email: userRecord.email ?? null, userId: String(userRecord._id) }
        : { userId: authPayload.userId };

    return <AdminLayoutClient authUser={authUser}>{children}</AdminLayoutClient>;
}