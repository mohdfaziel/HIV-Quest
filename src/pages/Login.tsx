import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import PageTitle from '../components/common/PageTitle';

const Login: React.FC = () => {
  const { signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const destination = location.state?.from || '/dashboard';
      navigate(destination);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <PageTitle 
        title={t('login.title')} 
        description={t('login.description')}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">{t('login.welcome')}</h1>
          <p className="text-gray-600 mt-2">{t('login.signIn')}</p>
          
          {location.state?.from && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm"
            >
              {t('login.loginRequired')}
            </motion.div>
          )}
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            icon={<LogIn className="h-5 w-5" />}
            variant="primary"
            size="lg"
            translationKey="login.googleSignIn"
          >
            {t('login.googleSignIn')}
          </Button>
          
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>{t('login.agreement')}</p>
            <div className="mt-1 flex justify-center space-x-3">
              <a href="#" className="text-purple-600 hover:text-purple-800 transition">{t('login.terms')}</a>
              <span>•</span>
              <a href="#" className="text-purple-600 hover:text-purple-800 transition">{t('login.privacy')}</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="text-center text-sm">
            <p className="text-gray-600">
              {t('login.disclaimer')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;