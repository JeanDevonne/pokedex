import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { LoginModal } from '../../auth/LoginModal';

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="text-3xl">⚡</div>
              <h1 className="text-2xl font-bold">Pokédex</h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-red-200 transition-colors">
                Inicio
              </Link>
              {isAuthenticated && (
                <Link to="/favorites" className="hover:text-red-200 transition-colors">
                  Mis Pokémon
                </Link>
              )}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-red-200 text-xs">{user?.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-800 hover:bg-red-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-white text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
