import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  BarChart2, 
  Award, 
  BookOpen, 
  Shield, 
  Stethoscope, 
  Users, 
  Heart 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ModuleCard from '../components/common/ModuleCard';
import ProgressBar from '../components/common/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useModules } from '../context/ModuleContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import PageTitle from '../components/common/PageTitle';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { modules, loading } = useModules();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [totalProgress, setTotalProgress] = useState(0);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser && !loading) {
      showToast('Please log in to access the Dashboard.', 'info');
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [currentUser, loading, navigate, location.pathname, showToast]);
  
  // Calculate total progress
  useEffect(() => {
    if (modules.length > 0) {
      const completedModules = modules.filter(m => m.completed).length;
      const progress = Math.round((completedModules / modules.length) * 100);
      setTotalProgress(progress);
    }
  }, [modules]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-purple-800 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Find next available module
  const nextModule = modules.find(m => m.unlocked && !m.completed);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Map module IDs to badge icons and names
  const getBadgeInfo = (moduleId: string) => {
    switch(moduleId) {
      case 'what-is-hiv-aids':
        return { 
          icon: <BookOpen className="h-6 w-6 text-blue-500" />, 
          name: t('module1.title'), 
          color: 'bg-blue-100 border-blue-200',
          textColor: 'text-blue-700'
        };
      case 'hiv-aids-prevention':
        return { 
          icon: <Shield className="h-6 w-6 text-green-500" />, 
          name: t('module2.title'), 
          color: 'bg-green-100 border-green-200',
          textColor: 'text-green-700'
        };
      case 'symptoms-and-treatment':
        return { 
          icon: <Stethoscope className="h-6 w-6 text-purple-500" />, 
          name: t('module3.title'), 
          color: 'bg-purple-100 border-purple-200',
          textColor: 'text-purple-700'
        };
      case 'stigma-and-discrimination':
        return { 
          icon: <Users className="h-6 w-6 text-pink-500" />, 
          name: t('module4.title'), 
          color: 'bg-pink-100 border-pink-200',
          textColor: 'text-pink-700'
        };
      case 'healthy-relationships':
        return { 
          icon: <Heart className="h-6 w-6 text-orange-500" />, 
          name: t('module5.title'), 
          color: 'bg-orange-100 border-orange-200',
          textColor: 'text-orange-700'
        };
      default:
        return { 
          icon: <Award className="h-6 w-6 text-gray-500" />, 
          name: t('module.complete'), 
          color: 'bg-gray-100 border-gray-200',
          textColor: 'text-gray-700'
        };
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <PageTitle 
        title={t('dashboard.title')} 
        description="Track your progress and continue your learning journey with HIV Quest."
      />
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <motion.section
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-md p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold">{t('dashboard.welcome')}, {currentUser?.displayName?.split(' ')[0] || 'Student'}!</h1>
                  <p className="mt-1 text-purple-100">{t('dashboard.continueLearn')}</p>
                </div>
                
                {nextModule && (
                  <Button
                    onClick={() => navigate(`/module/${nextModule.id}`)}
                    variant="secondary"
                    size="lg"
                    className="whitespace-nowrap"
                    icon={<ChevronRight className="h-5 w-5" />}
                    translationKey="module.continue"
                  />
                )}
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-purple-100">{t('dashboard.progress')}</span>
                  <span className="text-sm font-medium text-purple-100">{totalProgress}% {t('dashboard.completed')}</span>
                </div>
                <div className="w-full bg-purple-300 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-pink-400 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Modules Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-purple-600" />
                {t('dashboard.startNewModule')}
              </h2>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {modules.map((module) => (
                <motion.div key={module.id} variants={itemVariants}>
                  <ModuleCard module={module} />
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white rounded-xl border border-dashed border-purple-200 p-6 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
                  <ChevronRight className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-purple-800 mb-1">{t('dashboard.moreModules')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('dashboard.moreModulesDesc')}
                </p>
              </div>
            </motion.div>
          </section>
          
          {/* Achievements Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Award className="mr-2 h-5 w-5 text-purple-600" />
                {t('dashboard.achievements')}
              </h2>
            </div>
            
            <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-6">
              {modules.some(m => m.completed) ? (
                <div>
                  <div className="text-center mb-5">
                    <p className="text-gray-600">{t('dashboard.achievementsDesc')}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {modules.filter(m => m.completed).map((module) => {
                      const { icon, name, color, textColor } = getBadgeInfo(module.id);
                      return (
                        <motion.div 
                          key={module.id}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className={`${color} rounded-lg p-4 border flex flex-col items-center justify-center text-center`}
                        >
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                            {icon}
                          </div>
                          <h3 className={`font-medium ${textColor} text-sm`}>{name}</h3>
                          <div className="mt-2">
                            <span className="text-xs bg-white px-2 py-1 rounded-full font-medium text-gray-600">
                              {module.score}% Score
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">{t('dashboard.noAchievements')}</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {t('dashboard.noAchievementsDesc')}
                  </p>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;