import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, UserCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../common/LanguageToggle';

const Header: React.FC = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={() => navigate('/')} role="button">
          <Shield className="h-8 w-8 text-pink-400" />
          <h1 className="text-2xl font-bold">HIV Quest</h1>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          
          <button 
            onClick={() => navigate('/about-creator')}
            className="flex items-center space-x-1 hover:bg-purple-600 px-3 py-1.5 rounded-full transition"
          >
            <UserCircle className="w-5 h-5 text-pink-400" />
            <span>{t('nav.meetCreator')}</span>
          </button>

          {currentUser ? (
            <>
              <button 
                onClick={handleProfileClick}
                className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-1.5 rounded-full transition"
              >
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="w-8 h-8 rounded-full border-2 border-pink-400"
                  />
                ) : (
                  <User className="w-6 h-6 text-pink-400" />
                )}
                <span>{currentUser.displayName}</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:bg-purple-600 px-3 py-1.5 rounded-full transition"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('nav.logout')}</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full transition font-medium"
            >
              {t('nav.signIn')}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800 py-3 px-4 absolute w-full shadow-lg z-10 transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-3">
            <div className="px-2">
              <LanguageToggle />
            </div>
            
            <button 
              onClick={() => navigateTo('/about-creator')}
              className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-2 rounded-md transition"
            >
              <UserCircle className="w-5 h-5 text-pink-400" />
              <span>{t('nav.meetCreator')}</span>
            </button>

            {currentUser ? (
              <>
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-2 rounded-md transition"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-8 h-8 rounded-full border-2 border-pink-400"
                    />
                  ) : (
                    <User className="w-6 h-6 text-pink-400" />
                  )}
                  <span>{currentUser.displayName}</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-2 rounded-md transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('nav.logout')}</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigateTo('/login')}
                className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-md transition font-medium flex justify-center"
              >
                {t('nav.signIn')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;