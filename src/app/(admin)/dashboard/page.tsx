"use client";

import { Guard } from "@/guards/Guard";
import AdminDashboard from "@/features/admin-dashboard/AdminDashboard";

export default function DashboardPage() {
  return (
    <>
      {/*
        Original guard-protected rendering. Commented out for local design review.
        Restore when ready by uncommenting the Guard wrapper below.

      <Guard check={["auth", "admin", "withPin"]}>
        <AdminDashboard />
      </Guard>
      */}

      {/* Temporary bypass for design: renders dashboard without auth checks */}
      <AdminDashboard />
    </>
  );
}
