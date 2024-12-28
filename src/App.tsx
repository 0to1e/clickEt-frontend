import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";
import { ThemeProvider } from "./components/common/theme-provider"; // Assuming you have a LoginPage
import { Toaster } from "@/components/shadcn/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={routers} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
