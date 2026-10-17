"use client";

import { Guard } from "@/guards/Guard";
import AdminDashboard from "@/features/admin-dashboard/AdminDashboard";

export default function AdminPage() {
  return (
    <Guard check={["guest"]}>
    {/* <Guard check={["auth", "admin", "withPin"]}> */}
      <AdminDashboard />
    </Guard>
  );
}
