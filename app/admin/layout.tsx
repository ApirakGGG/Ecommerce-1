import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard",
  description: "E-commerce Admin Panel",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <AdminNav />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;

