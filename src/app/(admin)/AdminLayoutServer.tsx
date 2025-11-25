import AdminLayout from "./layout";
import getAuthUser from "@/lib/getAuthUser";
import { redirect } from "next/navigation";

export default async function AdminLayoutServer({ children }: { children: React.ReactNode }) {
    const authUser = await getAuthUser();

    if (!authUser) {
        redirect("/signin");
    }
    // Pass the user to the client layout
    return <AdminLayout authUser={authUser}>{children}</AdminLayout>;
}
