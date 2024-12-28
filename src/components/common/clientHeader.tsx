import { useNavigate } from "react-router-dom";
import { Button } from "../shadcn/button";
import { ModeToggle } from "../shadcn/theme-toggle";
import Menu from "../custom/ClientNavMenu";

const ClientHeader = () => {
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
      <div className="space-x-2.5 flex justify-end md:basis-1/3">
        <ModeToggle />

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
      </div>
    </header>
  );
};

export default ClientHeader;
