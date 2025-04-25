import React from 'react';
import { Instagram, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import profilePic from '../assets/me.jpg';
import PageTitle from '../components/common/PageTitle';
import { useLanguage } from '../context/LanguageContext';

const AboutCreator: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <PageTitle 
        title={t('creator.title')} 
        description={t('creator.metaDescription')}
      />
      <Header />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6 flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-purple-100 transition"
              aria-label={t('creator.goBack')}
            >
              <ArrowLeft className="h-5 w-5 text-purple-600" />
            </button>
            <h1 className="text-3xl font-bold text-purple-800">{t('creator.title')}</h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex flex-col items-center">
                <img 
                  src={profilePic} 
                  alt="Juwita Farah Shamlotta" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-purple-500 shadow-md"
                />
                
                <div className="flex space-x-6 mt-6">
                  <a 
                    href="https://www.instagram.com/farahshamlotta?igsh=Ym42Zmx2d2pzcXE5" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-purple-600 hover:text-pink-500 transition-colors"
                    aria-label={t('creator.instagramProfile')}
                  >
                    <Instagram className="h-7 w-7" />
                  </a>
                  <a 
                    href="mailto:farahshamlotta@gmail.com" 
                    className="text-purple-600 hover:text-pink-500 transition-colors"
                    aria-label={t('creator.sendEmail')}
                  >
                    <Mail className="h-7 w-7" />
                  </a>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-purple-800">Juwita Farah Shamlotta</h2>
                <p className="text-gray-500 mb-6 italic">{t('creator.nursing')}</p>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    {t('creator.paragraph1')}
                  </p>
                  
                  <p>
                    {t('creator.paragraph2')}
                  </p>
                  
                  <p>
                    {t('creator.paragraph3')} <a href="https://www.faziel.me/" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-medium hover:text-pink-500 transition-colors">Faziel</a>, {t('creator.paragraph3Continued')}
                  </p>
                  
                  <p>
                    {t('creator.paragraph4')}
                  </p>
                  
                  <div className="pt-4">
                    <p className="font-medium">
                      {t('creator.contactPrompt')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutCreator;