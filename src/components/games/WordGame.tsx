import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle, ThumbsUp, ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import { WordGame as WordGameType } from '../../types';
import { wordGames } from '../../data/gameData';
import Confetti from 'react-confetti';
import { useLanguage } from '../../context/LanguageContext';

interface WordGameProps {
  moduleId: string;
  onComplete: () => void;
  onBack?: () => void;
}

const WordGame: React.FC<WordGameProps> = ({ moduleId, onComplete, onBack }) => {
  const { t } = useLanguage();
  const game = wordGames.find(g => g.moduleId === moduleId) as WordGameType;
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWord, setShuffledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [solvedWords, setSolvedWords] = useState<number[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Get localized word and clue
  const getLocalizedWord = (index: number) => {
    if (game.wordsTranslationKeys && game.wordsTranslationKeys[index]) {
      const translatedWord = t(game.wordsTranslationKeys[index]);
      // If translation exists and it's not just returning the key
      if (translatedWord !== game.wordsTranslationKeys[index]) {
        return translatedWord;
      }
    }
    return game.words[index];
  };
  
  const getLocalizedClue = (index: number) => {
    if (game.cluesTranslationKeys && game.cluesTranslationKeys[index]) {
      const translatedClue = t(game.cluesTranslationKeys[index]);
      // If translation exists and it's not just returning the key
      if (translatedClue !== game.cluesTranslationKeys[index]) {
        return translatedClue;
      }
    }
    return game.clues[index];
  };
  
  // Shuffle the current word
  useEffect(() => {
    if (!game) return;
    
    const word = getLocalizedWord(currentWordIndex);
    const shuffled = shuffleWord(word);
    setShuffledWord(shuffled);
    setUserGuess('');
    setIsCorrect(null);
    setShowHint(false);
  }, [currentWordIndex, game]);
  
  // Shuffle letters in a word
  const shuffleWord = (word: string) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };
  
  // Check the user's guess
  const checkGuess = () => {
    const correct = userGuess.toUpperCase() === getLocalizedWord(currentWordIndex).toUpperCase();
    setIsCorrect(correct);
    
    if (correct) {
      setSolvedWords(prev => [...prev, currentWordIndex]);
      
      // Check if game is complete
      if (solvedWords.length + 1 === game.words.length) {
        setGameComplete(true);
      }
    }
  };
  
  // Move to the next word
  const nextWord = () => {
    if (currentWordIndex < game.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Start over with unsolved words
      const unsolvedWordIndex = game.words.findIndex((_, index) => !solvedWords.includes(index));
      if (unsolvedWordIndex !== -1) {
        setCurrentWordIndex(unsolvedWordIndex);
      } else {
        setGameComplete(true);
      }
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(e.target.value.toUpperCase());
    setIsCorrect(null);
  };
  
  // Reset the game
  const resetGame = () => {
    setCurrentWordIndex(0);
    setSolvedWords([]);
    setUserGuess('');
    setIsCorrect(null);
    setShowHint(false);
    setGameComplete(false);
  };
  
  if (!game) return <div>Loading game...</div>;
  
  if (gameComplete) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
        <Confetti recycle={false} numberOfPieces={200} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ThumbsUp className="mx-auto h-16 w-16 text-green-500 mb-4" />
          
          <h2 className="text-2xl font-bold mb-2">
            {t('wordgame.complete')}
          </h2>
          
          <p className="text-lg mb-6">
            {t('wordgame.success')}
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={resetGame}
            >
              {t('wordgame.playAgain')}
            </Button>
            
            <Button 
              onClick={onComplete}
            >
              {t('wordgame.continue')}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  const currentWord = getLocalizedWord(currentWordIndex);
  const currentClue = getLocalizedClue(currentWordIndex);
  
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
      
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold mb-2">{t('wordgame.title')}</h2>
        <p className="text-gray-600">
          {t('wordgame.instructions')}
        </p>
        <div className="mt-2 text-sm font-medium text-purple-600">
          {t('wordgame.wordsSolved')}: {solvedWords.length} / {game.words.length}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-medium text-gray-700 mb-2">{t('wordgame.clue')}</h3>
        <p className="p-3 bg-purple-50 rounded-lg text-purple-800">
          {currentClue}
        </p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {shuffledWord.split('').map((letter, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white font-bold rounded-md shadow-md"
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-4 mb-6">
        <input
          type="text"
          value={userGuess}
          onChange={handleInputChange}
          placeholder={t('wordgame.yourAnswer')}
          className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg"
          maxLength={currentWord.length}
        />
        
        <div className="flex space-x-3">
          <Button
            onClick={checkGuess}
            disabled={userGuess.length !== currentWord.length}
          >
            {t('wordgame.checkAnswer')}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowHint(true)}
            disabled={showHint}
            icon={<Lightbulb className="h-4 w-4" />}
          >
            {t('wordgame.hint')}
          </Button>
        </div>
      </div>
      
      {isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`
            p-4 rounded-lg mb-6 text-center
            ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
          `}
        >
          {isCorrect ? (
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="font-medium text-green-800">{t('wordgame.correct')}</p>
            </div>
          ) : (
            <p className="font-medium text-red-800">{t('wordgame.incorrect')}</p>
          )}
        </motion.div>
      )}
      
      {showHint && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6"
        >
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-800">
              {t('wordgame.hintText')} <span className="font-bold">{currentWord[0]}</span>
            </p>
          </div>
        </motion.div>
      )}
      
      {isCorrect && (
        <div className="flex justify-center">
          <Button onClick={nextWord}>
            {solvedWords.length === game.words.length - 1 ? t('wordgame.completeGame') : t('wordgame.nextWord')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordGame;