
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import Header from "@/components/Header";
import SuperHeader from "@/components/SuperHeader";
import SuperLanding from "@/pages/SuperLanding";
import SuperAuth from "@/pages/SuperAuth";
import Dashboard from "@/pages/Dashboard";
import Explorar from "@/pages/Explorar";
import SuperOnboarding from "@/pages/SuperOnboarding";
import Perfil from "@/pages/Perfil";
import Clubes from "@/pages/Clubes";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// App Routes Component (sem autenticação por enquanto)
const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<SuperLanding />} />
        <Route path="/super-login" element={<SuperAuth />} />
        <Route path="/super-registro" element={<SuperAuth />} />
        <Route path="/auth/:mode" element={<SuperAuth />} />
        
        {/* Rotas abertas temporariamente */}
        <Route path="/dashboard" element={
          <>
            <SuperHeader />
            <Dashboard />
          </>
        } />
        
        <Route path="/explorar" element={
          <>
            <SuperHeader />
            <Explorar />
          </>
        } />
        
        <Route path="/super-onboarding" element={<SuperOnboarding />} />
        
        <Route path="/perfil" element={
          <>
            <SuperHeader />
            <Perfil />
          </>
        } />
        
        <Route path="/clubes" element={
          <>
            <SuperHeader />
            <Clubes />
          </>
        } />
        
        <Route path="/home" element={
          <>
            <SuperHeader />
            <Home />
          </>
        } />
        
        {/* Legacy routes redirect */}
        <Route path="/login" element={<Navigate to="/super-login" />} />
        <Route path="/registro" element={<Navigate to="/super-registro" />} />
        <Route path="/onboarding" element={<Navigate to="/super-onboarding" />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SupabaseAuthProvider>
          <AppRoutes />
        </SupabaseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
