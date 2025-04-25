import React from 'react';
import { Heart, Info, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-purple-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="h-6 w-6 text-pink-400" />
              <h2 className="text-xl font-bold">HIV Quest</h2>
            </div>
            <p className="text-purple-200 text-sm">
              A Journey to Knowledge
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2 text-pink-400" />
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li><a href="https://www.cdc.gov/hiv/" className="hover:text-pink-400 transition" target="_blank" rel="noopener noreferrer">CDC HIV Information</a></li>
              <li><a href="https://www.who.int/health-topics/hiv-aids" className="hover:text-pink-400 transition" target="_blank" rel="noopener noreferrer">WHO HIV/AIDS Resources</a></li>
              <li><a href="https://www.unaids.org/" className="hover:text-pink-400 transition" target="_blank" rel="noopener noreferrer">UNAIDS</a></li>
              <li><a href="https://www.hiv.gov/" className="hover:text-pink-400 transition" target="_blank" rel="noopener noreferrer">HIV.gov</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-pink-400" />
              {t('footer.support')}
            </h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li>
                <Link to="/contact-us" className="hover:text-pink-400 transition">
                  {t('footer.contactUs')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-700 mt-6 pt-6 text-center text-purple-300 text-sm">
          <p>© {new Date().getFullYear()} HIV Quest. {t('footer.rights')}</p>
          <p className="mt-1">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;