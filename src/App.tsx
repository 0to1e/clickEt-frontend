// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";
import { ThemeProvider } from "./components/common/theme-provider"; // Assuming you have a LoginPage
import { Toaster } from "@/components/shadcn/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
