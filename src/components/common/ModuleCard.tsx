import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, ArrowRight, 
  Info, Shield, Stethoscope, Users, Heart } from 'lucide-react';
import { Module } from '../../types';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface ModuleCardProps {
  module: Module;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const getIcon = () => {
    switch (module.icon) {
      case 'info': return <Info className="h-6 w-6 text-blue-500" />;
      case 'shield': return <Shield className="h-6 w-6 text-green-500" />;
      case 'stethoscope': return <Stethoscope className="h-6 w-6 text-red-500" />;
      case 'users': return <Users className="h-6 w-6 text-purple-500" />;
      case 'heart': return <Heart className="h-6 w-6 text-pink-500" />;
      default: return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const handleClick = () => {
    if (module.unlocked) {
      navigate(`/module/${module.id}`);
    }
  };

  // Get translated title and description
  const moduleTitle = module.titleKey ? t(module.titleKey) : 'Module';
  const moduleDescription = module.descriptionKey ? t(module.descriptionKey) : '';

  return (
    <motion.div
      whileHover={{ scale: module.unlocked ? 1.03 : 1 }}
      whileTap={{ scale: module.unlocked ? 0.98 : 1 }}
      className={`
        rounded-xl border overflow-hidden shadow-md 
        ${module.unlocked 
          ? 'border-purple-200 bg-white cursor-pointer' 
          : 'border-gray-200 bg-gray-100 opacity-70 cursor-not-allowed'}
      `}
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-full bg-purple-50">
            {getIcon()}
          </div>
          <div>
            {module.completed ? (
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{module.score}%</span>
              </div>
            ) : module.unlocked ? (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                {t('dashboard.inProgress')}
              </span>
            ) : (
              <div className="flex items-center text-gray-400">
                <Lock className="h-4 w-4 mr-1" />
                <span className="text-xs">{t('dashboard.notStarted')}</span>
              </div>
            )}
          </div>
        </div>
        
        <h3 className="mt-4 text-lg font-semibold text-gray-800">{moduleTitle}</h3>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {moduleDescription}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {t('module.difficulty')}: {
              module.order === 1 ? t('module.beginner') :
              module.order === 2 ? t('module.intermediate') :
              t('module.advanced')
            }
          </div>
          
          {module.unlocked && (
            <button className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition">
              {module.completed ? t('module.complete') : t('module.start')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;