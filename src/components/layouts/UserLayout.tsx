import { Outlet } from "react-router-dom";
import ClientHeader from "../common/clientHeader";
import Footer from "../common/Footer";

const Layout = () => {
  return (
    <div className=" flex flex-col min-h-screen ">
      <ClientHeader />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
