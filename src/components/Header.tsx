
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, Search, Bell, Heart, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b-2 border-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">⚽</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FutTalent
              </h1>
              <p className="text-xs text-gray-600 font-medium">Conectando talentos</p>
            </div>
          </Link>

          {/* Navigation - Estilo Globo Esporte */}
          {user && (
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                to="/explorar" 
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200"
              >
                Explorar
              </Link>
              <Link 
                to="/favoritos" 
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1"
              >
                <Heart className="h-4 w-4" />
                <span>Meus Favoritos</span>
              </Link>
              <Link 
                to="/mensagens" 
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Mensagens</span>
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">3</Badge>
              </Link>
              {user.userType === 'jogador' && (
                <Link 
                  to="/meu-perfil" 
                  className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200"
                >
                  Meu Perfil
                </Link>
              )}
            </nav>
          )}

          {/* User actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex relative">
                  <Search className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="sm" className="hidden sm:flex relative">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                  >
                    2
                  </Badge>
                </Button>

                <div className="flex items-center space-x-2">
                  <Link to="/perfil">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-green-50">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="hidden sm:inline font-medium">{user.name}</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="font-medium">Entrar</Button>
                </Link>
                <Link to="/registro">
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-semibold shadow-lg">
                    Cadastrar-se
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
