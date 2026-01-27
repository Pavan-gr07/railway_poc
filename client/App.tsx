import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Trains from "./pages/Trains";
import Displays from "./pages/Displays";
import HSR from "./pages/HSR";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import Config from "./pages/Config";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/trains" element={<Trains />} />
      <Route path="/displays" element={<Displays />} />
      <Route path="/hsr" element={<HSR />} />
      <Route path="/events" element={<Events />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/config" element={<Config />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MainLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
