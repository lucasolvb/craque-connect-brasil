
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { User, LogOut, Settings, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import NotificationDropdown from './NotificationDropdown';

const SuperHeader = () => {
  const { user, signOut } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado com sucesso",
        description: "Até logo!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚽</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Super Talentos</h1>
              <p className="text-xs text-green-600 font-medium">Futebol para Todos</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/explorar" 
              className="text-gray-700 hover:text-green-600 transition-colors font-medium flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Explorar
            </Link>
          </nav>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-3">
              <NotificationDropdown />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-100 text-green-600">
                        {user.user_metadata?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user.user_metadata?.full_name || 'Usuário'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 cursor-pointer text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/super-login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link to="/super-registro">
                <Button className="bg-green-600 hover:bg-green-700">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SuperHeader;
