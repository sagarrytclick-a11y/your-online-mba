import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/app/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSessionFromCookies();

  if (!session) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
