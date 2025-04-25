import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, HelpCircle, ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import { Question } from '../../types';
import { quizQuestions } from '../../data/quizData';
import Confetti from 'react-confetti';
import { useLanguage } from '../../context/LanguageContext';

interface QuizProps {
  moduleId: string;
  onComplete: (score: number) => void;
  onBack?: () => void;
}

const Quiz: React.FC<QuizProps> = ({ moduleId, onComplete, onBack }) => {
  const { t, language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Filter questions for this module
  const moduleQuestions = quizQuestions.filter(q => q.moduleId === moduleId);
  
  const currentQuestion = moduleQuestions[currentQuestionIndex];
  
  // Enhanced helper function to get localized question content
  const getLocalizedQuestion = (question: Question) => {
    // Create a consistent mapping between moduleId and translation keys
    const moduleMapping: Record<string, string> = {
      'what-is-hiv-aids': 'm1',
      'hiv-aids-prevention': 'm2',
      'symptoms-and-treatment': 'm3',
      'stigma-and-discrimination': 'm4',
      'healthy-relationships': 'm5'
    };
    
    const modulePrefix = moduleMapping[moduleId] || 'm1';
    
    // Extract question number from ID (e.g., "q1-m1" -> "q1")
    const questionNum = question.id.split('-')[0];
    
    // Create a base key for translations
    const baseKey = `quiz.${modulePrefix}.${questionNum}`;
    
    // Try to get translated content, fall back to hardcoded content if not found
    const translatedQuestion = t(`${baseKey}.question`);
    const questionText = translatedQuestion === `${baseKey}.question` ? 
      question.question : translatedQuestion;
    
    // Log if we're falling back to hardcoded content in development
    if (process.env.NODE_ENV === 'development' && translatedQuestion === `${baseKey}.question`) {
      console.warn(`Missing translation for ${baseKey}.question in ${language} language`);
    }
    
    // Get translated options
    const options = question.options.map((option, index) => {
      const translationKey = `${baseKey}.option${index + 1}`;
      const translatedOption = t(translationKey);
      
      if (process.env.NODE_ENV === 'development' && translatedOption === translationKey) {
        console.warn(`Missing translation for ${translationKey} in ${language} language`);
      }
      
      return translatedOption === translationKey ? option : translatedOption;
    });
    
    // Get translated explanation
    const explanationKey = `${baseKey}.explanation`;
    const translatedExplanation = t(explanationKey);
    
    if (process.env.NODE_ENV === 'development' && translatedExplanation === explanationKey) {
      console.warn(`Missing translation for ${explanationKey} in ${language} language`);
    }
    
    const explanation = translatedExplanation === explanationKey ?
      question.explanation : translatedExplanation;
    
    return {
      ...question,
      question: questionText,
      options: options,
      explanation: explanation
    };
  };
  
  // Get localized version of current question
  const localizedQuestion = currentQuestion ? getLocalizedQuestion(currentQuestion) : null;
  
  useEffect(() => {
    // Reset state when moving to a new question
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
  }, [currentQuestionIndex]);
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < moduleQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Quiz complete
      const finalScore = Math.round((score / moduleQuestions.length) * 100);
      setQuizComplete(true);
      setShowConfetti(finalScore >= 60);
      onComplete(finalScore);
    }
  };
  
  const getOptionClassName = (index: number) => {
    if (selectedAnswer === null) {
      return 'border border-purple-200 bg-white hover:border-purple-400 transition';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-800';
    }
    
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-800';
    }
    
    return 'border border-purple-200 bg-white opacity-50';
  };
  
  if (quizComplete) {
    const finalScore = Math.round((score / moduleQuestions.length) * 100);
    const passed = finalScore >= 60;
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-4">
            {passed ? (
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="mx-auto h-16 w-16 text-red-500" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {passed ? t('game.congratulations') : t('game.keepLearning')}
          </h2>
          
          <p className="text-lg mb-4">
            {t('game.youScored')} {finalScore}% {t('game.onThisQuiz')}
          </p>
          
          <p className="text-gray-600 mb-6">
            {passed 
              ? t('game.successMessage') 
              : t('game.failMessage')}
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setQuizComplete(false);
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setIsAnswerCorrect(null);
                setShowExplanation(false);
                setShowConfetti(false);
              }}
            >
              {t('game.retryQuiz')}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  if (!localizedQuestion) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse text-purple-800">
          {t('loading') || 'Loading...'}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
      {/* Back button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          {t('activities.backToActivities')}
        </Button>
      </div>

      <h2 className="text-xl font-bold mb-6 text-center text-purple-800">
        {t('activities.quiz.title')}
      </h2>
      
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          {t('game.question')} {currentQuestionIndex + 1} {t('game.of')} {moduleQuestions.length}
        </span>
        <span className="text-sm font-medium text-purple-600">
          {t('game.score')}: {score} / {moduleQuestions.length}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{localizedQuestion.question}</h3>
      
      <div className="space-y-3 mb-6">
        {localizedQuestion.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
            whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
          >
            <button
              className={`
                w-full text-left p-4 rounded-lg 
                ${getOptionClassName(index)}
                transition-all duration-200
                ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'}
              `}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border mr-3 text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </div>
                <p>{option}</p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
      
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`
            p-4 rounded-lg mb-6
            ${isAnswerCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
          `}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {isAnswerCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${isAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isAnswerCorrect ? t('game.correct') : t('game.incorrect')}
              </h3>
              <div className={`mt-2 text-sm ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                <p>{localizedQuestion.explanation}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="flex justify-between">
        <div className="text-sm text-gray-500 flex items-center">
          <HelpCircle className="h-4 w-4 mr-1 text-purple-500" />
          {selectedAnswer === null ? t('game.selectAnswer') : t('game.clickNext')}
        </div>
        
        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          {currentQuestionIndex < moduleQuestions.length - 1 ? t('game.next') : t('game.finish')}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;