import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex">
      <aside className="w-[15%] min-w-55 bg-(--primary-color)">
        <Sidebar />
      </aside>

      <section className="w-[85%] bg-[#f1ede6] overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
