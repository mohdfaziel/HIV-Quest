import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, PlayCircle, BookOpen, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageTitle from '../components/common/PageTitle';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <PageTitle 
        title={t('home.title')} 
        description={t('home.subtitle')}
      />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-pink-500 text-white">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  HIV Quest
                  <span className="block text-pink-300">{t('home.subtitle')}</span>
                </h1>
                
                <p className="text-lg mb-6">
                  {t('home.welcomeMessage')}
                </p>
                
                <Button 
                  onClick={handleGetStarted}
                  size="lg"
                  variant="secondary"
                  icon={<PlayCircle className="h-5 w-5" />}
                  translationKey={currentUser ? 'dashboard.title' : 'button.getStarted'}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-1/2 flex justify-center"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <Shield className="w-40 h-40 md:w-48 md:h-48 text-pink-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.features.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t('home.features.educational.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.educational.description')}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t('home.features.interactive.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.interactive.description')}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t('home.features.progress.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.progress.description')}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t('home.features.stigma.title')}</h3>
                <p className="text-gray-600">
                  {t('home.features.stigma.description')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Modules Preview Section */}
        <section className="py-16 px-4 bg-purple-100">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.modules.title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('home.modules.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-2 bg-blue-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold">{t('module1.title')}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('module1.description')}
                  </p>
                  <div className="text-blue-600 text-sm font-medium">Module 1 • {t('module.beginner')}</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-2 bg-green-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold">{t('module2.title')}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('module2.description')}
                  </p>
                  <div className="text-green-600 text-sm font-medium">Module 2 • {t('module.intermediate')}</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-2 bg-purple-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold">{t('module3.title')}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('module3.description')}
                  </p>
                  <div className="text-purple-600 text-sm font-medium">Module 3 • {t('module.advanced')}</div>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
                translationKey="button.learnMore"
              />
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-md p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">{t('home.cta.title')}</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                {t('home.cta.description')}
              </p>
              
              <Button 
                onClick={handleGetStarted}
                variant="secondary"
                size="lg"
                translationKey="button.getStarted"
              />
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;