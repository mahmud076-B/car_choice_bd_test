import { isSupabaseConfigured } from "@/lib/supabase/config";
import { listInquiriesLocal, listPreOrdersLocal } from "@/lib/leads";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demo = !isSupabaseConfigured();
  const [inquiries, preOrders] = await Promise.all([
    listInquiriesLocal(),
    listPreOrdersLocal(),
  ]);

  const counts = {
    newInquiries: inquiries.filter((i) => i.status === "NEW").length,
    newPreOrders: preOrders.filter((p) => p.status === "NEW").length,
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminNav demo={demo} counts={counts} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
