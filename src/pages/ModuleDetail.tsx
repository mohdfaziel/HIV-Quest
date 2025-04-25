import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, PlayCircle, HelpCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import Quiz from '../components/games/Quiz';
import MatchingGame from '../components/games/MatchingGame';
import WordGame from '../components/games/WordGame';
import SimulationGame from '../components/games/SimulationGame';
import { useAuth } from '../context/AuthContext';
import { useModules } from '../context/ModuleContext';
import { moduleContent } from '../data/moduleData';
import PageTitle from '../components/common/PageTitle';
import { useLanguage } from '../context/LanguageContext';

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { currentUser } = useAuth();
  const { modules, updateProgress, unlockNextModule } = useModules();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'content' | 'activities'>('content');
  const [activeGame, setActiveGame] = useState<'none' | 'quiz' | 'matching' | 'word' | 'simulation'>('none');
  
  const module = modules.find(m => m.id === moduleId);
  const moduleIdx = modules.findIndex(m => m.id === moduleId);
  const nextModule = moduleIdx < modules.length - 1 ? modules[moduleIdx + 1] : null;
  
  // Reset state when module changes
  useEffect(() => {
    // Reset to content tab and no active game when module changes
    setActiveTab('content');
    setActiveGame('none');
  }, [moduleId]);
  
  // Check if user has access to this module
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (module && !module.unlocked) {
      navigate('/dashboard');
    }
  }, [currentUser, module, navigate]);
  
  if (!module || !moduleId) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <PageTitle title="Loading Module" />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-purple-800 font-medium">Loading module...</p>
        </div>
      </div>
    );
  }
  
  // Get content for this module
  const content = moduleContent[moduleId as keyof typeof moduleContent];
  
  // Handle quiz completion
  const handleQuizComplete = async (score: number) => {
    if (score >= 60) {
      await updateProgress(moduleId, score);
      await unlockNextModule(moduleId);
    }
  };
  
  // Render content tab
  const renderContent = () => {
    if (!content || !content.sections) {
      return (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-sm">
          <p className="text-center text-gray-600">Module content is not available.</p>
        </div>
      );
    }
    
    return (
      <div className="mt-6 space-y-8">
        {content.sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-purple-100"
          >
            <h3 className="text-xl font-bold mb-3 text-purple-800">{t(section.titleKey)}</h3>
            <div className="prose max-w-none text-gray-700">
              {t(section.contentKey).split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        ))}
        
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setActiveTab('activities')}
            size="lg"
            icon={<PlayCircle className="h-5 w-5" />}
          >
            {t('activities.continueToActivities')}
          </Button>
        </div>
      </div>
    );
  };
  
  // Render activities tab
  const renderActivities = () => {
    if (activeGame !== 'none') {
      switch (activeGame) {
        case 'quiz':
          return (
            <Quiz 
              moduleId={moduleId} 
              onComplete={handleQuizComplete} 
              onBack={() => setActiveGame('none')}
            />
          );
        case 'matching':
          return (
            <MatchingGame 
              moduleId={moduleId} 
              onComplete={() => setActiveGame('word')} 
              onBack={() => setActiveGame('none')}
            />
          );
        case 'word':
          return (
            <WordGame 
              moduleId={moduleId} 
              onComplete={() => setActiveGame('simulation')} 
              onBack={() => setActiveGame('none')}
            />
          );
        case 'simulation':
          return (
            <SimulationGame 
              moduleId={moduleId} 
              onComplete={() => setActiveGame('quiz')} 
              onBack={() => setActiveGame('none')}
            />
          );
        default:
          return null;
      }
    }
    
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:border-purple-300 transition"
          onClick={() => setActiveGame('matching')}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="ml-4 text-lg font-bold">{t('activities.matchingGame.title')}</h3>
          </div>
          <p className="text-gray-600">{t('activities.matchingGame.description')}</p>
          <Button 
            className="mt-4" 
            variant="outline"
            onClick={() => setActiveGame('matching')}
          >
            {t('activities.matchingGame.start')}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:border-purple-300 transition"
          onClick={() => setActiveGame('word')}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="ml-4 text-lg font-bold">{t('activities.wordGame.title')}</h3>
          </div>
          <p className="text-gray-600">{t('activities.wordGame.description')}</p>
          <Button 
            className="mt-4" 
            variant="outline"
            onClick={() => setActiveGame('word')}
          >
            {t('activities.wordGame.start')}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:border-purple-300 transition"
          onClick={() => setActiveGame('simulation')}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <PlayCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="ml-4 text-lg font-bold">{t('activities.simulation.title')}</h3>
          </div>
          <p className="text-gray-600">{t('activities.simulation.description')}</p>
          <Button 
            className="mt-4" 
            variant="outline"
            onClick={() => setActiveGame('simulation')}
          >
            {t('activities.simulation.start')}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:border-purple-300 transition md:col-span-2"
          onClick={() => setActiveGame('quiz')}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold">{t('activities.quiz.title')}</h3>
              <p className="text-sm text-gray-500">{t('activities.quiz.requirement')}</p>
            </div>
          </div>
          <p className="text-gray-600">{t('activities.quiz.description')}</p>
          <Button 
            className="mt-4" 
            variant="primary"
            onClick={() => setActiveGame('quiz')}
          >
            {t('activities.quiz.start')}
          </Button>
        </motion.div>
      </div>
    );
  };
  
  // Get translated title and description
  const moduleTitle = module?.titleKey ? t(module.titleKey) : 'Module';
  const moduleDescription = module?.descriptionKey ? t(module.descriptionKey) : '';
  
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <PageTitle 
        title={moduleTitle} 
        description={`Learn about ${moduleTitle} in the HIV Quest educational platform.`}
      />
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Module Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="mr-4 p-2 rounded-full hover:bg-purple-100 transition"
            >
              <ArrowLeft className="h-5 w-5 text-purple-600" />
            </button>
            
            <div>
              <h1 className="text-2xl font-bold">{moduleTitle}</h1>
              <p className="text-gray-600">{moduleDescription}</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          {module.completed && (
            <div className="mb-6">
              <ProgressBar progress={module.score} color="bg-green-500" />
            </div>
          )}
          
          {/* Module Navigation */}
          <div className="bg-white rounded-xl shadow-sm mb-6 p-1 flex">
            <button
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-center transition ${
                activeTab === 'content' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
              onClick={() => setActiveTab('content')}
            >
              <span className="flex items-center justify-center">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('module.content')}
              </span>
            </button>
            
            <button
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-center transition ${
                activeTab === 'activities' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
              onClick={() => setActiveTab('activities')}
            >
              <span className="flex items-center justify-center">
                <PlayCircle className="h-4 w-4 mr-2" />
                {t('activities.tab')}
              </span>
            </button>
          </div>
          
          {/* Module Content */}
          {activeTab === 'content' ? renderContent() : renderActivities()}
          
          {/* Module Navigation */}
          <div className="mt-8 flex justify-between">
            {moduleIdx > 0 && (
              <Button 
                variant="outline"
                onClick={() => navigate(`/module/${modules[moduleIdx - 1].id}`)}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                {t('module.previous')}
              </Button>
            )}
            
            <div className="flex-1"></div>
            
            {nextModule && nextModule.unlocked && (
              <Button 
                onClick={() => navigate(`/module/${nextModule.id}`)}
              >
                {t('module.next')}
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModuleDetail;