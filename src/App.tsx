import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PYQs from "./pages/PYQs";
import Notes from "./pages/Notes";

import Lab from "./pages/Lab";
import Forum from "./pages/Forum";
import Updates from "./pages/Updates";
import NotFound from "./pages/NotFound";
import AuthLanding from "./pages/AuthLanding";
import Admin from "./pages/Admin";
import TargetCursor from "./components/home/TargetCursor";

function app() {
  return (
    <>
      <TargetCursor />
      {/* ... the rest of your app */}
    </>
  );
}


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLanding />} /> {/* Login/Register Page */}
          <Route path="/home" element={<Index />} /> {/* New Home Page (Post-Login Landing) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


// ... other imports

export default App;