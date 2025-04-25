import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '../../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 hover:bg-purple-600 px-3 py-1.5 rounded-full transition"
      aria-label={`Switch to ${language === 'en' ? 'Indonesian' : 'English'}`}
    >
      <Languages className="w-5 h-5 text-pink-400" />
      <span className="inline">
        {language === 'en' ? 'EN' : 'ID'}
      </span>
    </button>
  );
};

export default LanguageToggle; 