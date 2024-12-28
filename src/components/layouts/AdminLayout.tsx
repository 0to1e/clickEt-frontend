import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" flex flex-col min-h-screen ">
      <div className="flex w-full bg-green-500">admin header</div>
      <Outlet />
      <div className="flex w-full bg-green-500">admin footer</div>
    </div>
  );
};

export default Layout;
