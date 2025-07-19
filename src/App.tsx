
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SelectRole from "./pages/SelectRole";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import ProjectGallery from "./pages/ProjectGallery";
import ProjectDetail from "./pages/ProjectDetail";
import CandidateProfile from "./pages/CandidateProfile";
import AdminDashboard from "./pages/AdminDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/projects" element={<ProjectGallery />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
