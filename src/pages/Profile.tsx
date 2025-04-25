import React from 'react';
import { User, LogOut, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useModules } from '../context/ModuleContext';
import PageTitle from '../components/common/PageTitle';
import { useLanguage } from '../context/LanguageContext';

const Profile: React.FC = () => {
  const { currentUser, logOut } = useAuth();
  const { modules } = useModules();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  // Filter completed modules
  const completedModules = modules.filter(m => m.completed);
  // Calculate total progress
  const totalProgress = Math.round((completedModules.length / modules.length) * 100);
  
  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <PageTitle 
        title="Profile" 
        description="Manage your HIV Quest profile and account settings."
      />
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-purple-400 flex items-center justify-center border-4 border-white shadow-md">
                      <User className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{currentUser.displayName}</h1>
                  <p className="text-purple-100">{currentUser.email}</p>
                  
                  <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      Modules: {completedModules.length}/{modules.length}
                    </span>
                    
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      {totalProgress}% Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-purple-600" />
                {t('dashboard.progress')}
              </h2>
              
              {modules.length > 0 ? (
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{module.titleKey ? t(module.titleKey) : 'Module'}</h3>
                          {/* {module.descriptionKey && (
                            <p className="text-sm hidden md:inline text-gray-500 max-w-16 mt-1">{t(module.descriptionKey)}</p>
                          )} */}
                        </div>
                        
                        <div className="flex items-center">
                          {module.completed ? (
                            <span className="text-green-600 hidden md:inline text-sm font-medium mr-2">
                              Score: {module.score}%
                            </span>
                          ) : module.unlocked ? (
                            <span className="text-purple-600 text-sm font-medium mr-2">
                              Available
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm font-medium mr-2">
                              Locked
                            </span>
                          )}
                          
                          {module.unlocked && (
                            <button 
                              className="text-purple-600 hover:text-purple-800 transition"
                              onClick={() => navigate(`/module/${module.id}`)}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <ProgressBar 
                          progress={module.completed ? module.score : 0} 
                          color={module.completed ? "bg-green-500" : "bg-purple-300"} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No modules available yet.
                </div>
              )}
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  icon={<LogOut className="h-5 w-5" />}
                >
                  {t('nav.logout')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;