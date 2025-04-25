import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import { SimulationStep } from '../../types';
import { simulationSteps } from '../../data/gameData';
import { useLanguage } from '../../context/LanguageContext';

interface SimulationGameProps {
  moduleId: string;
  onComplete: () => void;
  onBack?: () => void;
}

const SimulationGame: React.FC<SimulationGameProps> = ({ moduleId, onComplete, onBack }) => {
  const { t } = useLanguage();
  // Filter simulation steps for this module
  const moduleSteps = simulationSteps.filter(step => step.moduleId === moduleId);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  const currentStep = moduleSteps[currentStepIndex];
  
  if (!currentStep) {
    // No simulation for this module, skip
    onComplete();
    return null;
  }
  
  // Get localized content using translation keys if available
  const getLocalizedScenario = () => {
    if (currentStep.scenarioKey) {
      const translated = t(currentStep.scenarioKey);
      if (translated !== currentStep.scenarioKey) {
        return translated;
      }
    }
    return currentStep.scenario;
  };
  
  const getLocalizedOption = (index: number) => {
    if (currentStep.optionsKeys && currentStep.optionsKeys[index]) {
      const translated = t(currentStep.optionsKeys[index]);
      if (translated !== currentStep.optionsKeys[index]) {
        return translated;
      }
    }
    return currentStep.options[index];
  };
  
  const getLocalizedConsequence = (index: number) => {
    if (currentStep.consequencesKeys && currentStep.consequencesKeys[index]) {
      const translated = t(currentStep.consequencesKeys[index]);
      if (translated !== currentStep.consequencesKeys[index]) {
        return translated;
      }
    }
    return currentStep.consequences[index];
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent changing option after selection
    
    setSelectedOption(optionIndex);
    setShowFeedback(true);
  };
  
  const handleNextStep = () => {
    if (currentStepIndex < moduleSteps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Simulation complete
      setSimulationComplete(true);
    }
  };
  
  const getOptionClassName = (index: number) => {
    if (selectedOption === null) {
      return 'border border-purple-200 bg-white hover:border-purple-400 transition';
    }
    
    if (index === currentStep.correctOption) {
      return 'border-green-500 bg-green-50 text-green-800';
    }
    
    if (index === selectedOption && index !== currentStep.correctOption) {
      return 'border-red-500 bg-red-50 text-red-800';
    }
    
    return 'border border-purple-200 bg-white opacity-50';
  };
  
  if (simulationComplete) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          
          <h2 className="text-2xl font-bold mb-2">
            {t('simulation.complete')}
          </h2>
          
          <p className="text-lg mb-6">
            {t('simulation.success')}
          </p>
          
          <Button onClick={onComplete}>
            {t('simulation.continue')}
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
      {/* Back button */}
      {onBack && (
        <div className="mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            {t('activities.backToActivities')}
          </Button>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('simulation.title')}</h2>
          <span className="text-sm font-medium text-gray-500">
            {t('simulation.scenario')} {currentStepIndex + 1} {t('simulation.of')} {moduleSteps.length}
          </span>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4">
          <p className="text-purple-900">{getLocalizedScenario()}</p>
        </div>
        
        <h3 className="font-medium text-gray-700 mb-2">{t('simulation.whatWouldYouDo')}</h3>
      </div>
      
      <div className="space-y-3 mb-6">
        {currentStep.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: selectedOption === null ? 1.01 : 1 }}
            whileTap={{ scale: selectedOption === null ? 0.99 : 1 }}
          >
            <button
              className={`
                w-full text-left p-4 rounded-lg 
                ${getOptionClassName(index)}
                transition-all duration-200
                ${selectedOption === null ? 'cursor-pointer' : 'cursor-default'}
              `}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border mr-3 text-sm font-medium">
                  {index + 1}
                </div>
                <p>{getLocalizedOption(index)}</p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
      
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`
            p-4 rounded-lg mb-6
            ${selectedOption === currentStep.correctOption ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}
          `}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {selectedOption === currentStep.correctOption ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${selectedOption === currentStep.correctOption ? 'text-green-800' : 'text-amber-800'}`}>
                {selectedOption === currentStep.correctOption ? t('simulation.goodChoice') : t('simulation.feedback')}
              </h3>
              <div className={`mt-2 text-sm ${selectedOption === currentStep.correctOption ? 'text-green-700' : 'text-amber-700'}`}>
                <p>{getLocalizedConsequence(selectedOption)}</p>
                
                {selectedOption !== currentStep.correctOption && (
                  <p className="mt-2">
                    <span className="font-medium">{t('simulation.betterApproach')} </span>
                    {getLocalizedOption(currentStep.correctOption)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="flex justify-end">
        <Button
          onClick={handleNextStep}
          disabled={selectedOption === null}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          {currentStepIndex < moduleSteps.length - 1 ? t('simulation.nextScenario') : t('simulation.finish')}
        </Button>
      </div>
    </div>
  );
};

export default SimulationGame;