/**
 * @file App.tsx
 * @author T. Landon Love
 * @copyright (c) 2025 12Stone Designs (12stonedesigns.com)
 */

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./contexts/TransactionContext";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TransactionProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
