import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col min-h-screen ">
      <div className="flex w-full bg-green-500">admin header</div>
      {children}
      <div className="flex w-full bg-green-500">admin footer</div>
    </div>
  );
};

export default AdminLayout;
