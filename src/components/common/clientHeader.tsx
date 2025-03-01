import { Link, useNavigate } from "react-router-dom";
import { Button } from "../shadcn/button";
import { ModeToggle } from "../shadcn/theme-toggle";
import Menu from "../custom/ClientNavMenu";
import { useAuth } from "@/hooks/useAuth";
import { getNameInitials } from "@/utils/getNameInitials";
import { MapPin } from "lucide-react";

const ClientHeader = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuCfg = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Support", href: "/support" },
  ];

  return (
    <header className="absolute top-0 w-full flex justify-between z-10 p-4 space-x-4">
      <div className=" place-content-center md:basis-[10%] shrink-0">
        <Link to={"/"}>
          <img src="src/assets/icons/logo/Logo.png" alt="ClickEt" width={50} />
        </Link>
      </div>
      <div className="hidden sm:flex gap-1.5 max-sm:pl-0  items-center border-primary">
        <button className="py-4 text-white flex gap-2 bg-secondary rounded-md items-center px-4">
          <MapPin size={22} className="text-primary" />
          <span className="hidden md:block text-primary hover:underline">
            Kathmandu
          </span>
        </button>
        <Menu config={menuCfg} />
      </div>
      <div className="space-x-2.5 flex justify-end items-center">
        <ModeToggle />
        {!isAuthenticated && (
          <div className="hidden sm:flex sm:flex-col md:flex-row gap-3 ">
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </div>
        )}
        {isAuthenticated && (
          <Link to={"/uprofile"}>
            <div className="rounded-full size-10 center bg-primary text-white cursor-pointer overflow-hidden">
              <img
                className="bg-primary"
                src={user?.profile_URL}
                alt={getNameInitials(user?.full_name || "")}
              />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default ClientHeader;
