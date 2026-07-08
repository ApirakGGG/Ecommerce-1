import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "ADMIN Pages",
  description: " ADMIN DASHBOARD",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
