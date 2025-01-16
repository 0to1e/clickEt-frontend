import { Link, useNavigate } from "react-router-dom";
import { Button } from "../shadcn/button";
import { ModeToggle } from "../shadcn/theme-toggle";
import Menu from "../custom/ClientNavMenu";
import { useAuth } from "@/hooks/useAuth";
import { getNameInitials } from "@/utils/getNameInitials";

const ClientHeader = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuCfg = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Support", href: "/support" },
  ];

  return (
    <header className="absolute top-0 w-full flex justify-between z-10 p-4">
      <div className="shrink-0 md:basis-1/3">
        <img src="src/assets/icons/logo/Logo.png" alt="ClickEt" width={50} />
      </div>
      <div className="hidden sm:flex flex-col max-sm:pl-0 max-md:pl-[10vw] md:basis-1/3 items-center">
        <Menu config={menuCfg} />
      </div>
      <div className="space-x-2.5 flex justify-end items-center md:basis-1/3">
        <ModeToggle />
        {!isAuthenticated && (
          <div className="hidden sm:flex sm:flex-col md:flex-row gap-3">
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
