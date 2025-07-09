
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseAuthProvider, useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import Header from "@/components/Header";
import SuperLanding from "@/pages/SuperLanding";
import SuperAuth from "@/pages/SuperAuth";
import Dashboard from "@/pages/Dashboard";
import Explorar from "@/pages/Explorar";
import SuperOnboarding from "@/pages/SuperOnboarding";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useSupabaseAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/super-login" />;
};

// App Routes Component
const AppRoutes = () => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <SuperLanding />} />
        <Route path="/super-login" element={user ? <Navigate to="/dashboard" /> : <SuperAuth />} />
        <Route path="/super-registro" element={user ? <Navigate to="/dashboard" /> : <SuperAuth />} />
        <Route path="/auth/:mode" element={user ? <Navigate to="/dashboard" /> : <SuperAuth />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Header />
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/explorar" element={
          <ProtectedRoute>
            <Header />
            <Explorar />
          </ProtectedRoute>
        } />
        
        <Route path="/super-onboarding" element={
          <ProtectedRoute>
            <SuperOnboarding />
          </ProtectedRoute>
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
