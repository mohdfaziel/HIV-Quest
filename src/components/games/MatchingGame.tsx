import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import { PuzzlePiece } from '../../types';
import { puzzlePieces } from '../../data/gameData';
import Confetti from 'react-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

interface MatchingGameProps {
  moduleId: string;
  onComplete: () => void;
  onBack?: () => void;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ moduleId, onComplete, onBack }) => {
  const { t } = useLanguage();
  
  // Map the module ID to the corresponding section in puzzlePieces - do this outside of render
  const getModulePrefix = (id: string) => {
    if (id === 'what-is-hiv-aids') return 'p1-m1';
    if (id === 'hiv-aids-prevention') return 'p2-m2';
    if (id === 'symptoms-and-treatment') return 'p3-m3';
    if (id === 'stigma-and-discrimination') return 'p4-m4';
    if (id === 'healthy-relationships') return 'p5-m5';
    return 'p1-m1'; // Default to module 1
  };
  
  // Get pieces once on initial render
  const modulePiecesRef = useRef<PuzzlePiece[]>([]);
  
  useEffect(() => {
    const prefix = getModulePrefix(moduleId);
    let pieces = puzzlePieces.filter(piece => piece.id.startsWith(prefix));
    
    // Fallback to module 1 if no pieces found
    if (pieces.length === 0) {
      pieces = puzzlePieces.filter(piece => piece.id.startsWith('p1-m1'));
    }
    
    modulePiecesRef.current = pieces;
    
    // Initial setup
    const shuffledTerms = [...pieces].sort(() => Math.random() - 0.5);
    const shuffledDefinitions = [...pieces].sort(() => Math.random() - 0.5);
    
    setTerms(shuffledTerms);
    setDefinitions(shuffledDefinitions);
    setMatchedPairs([]);
    setGameComplete(false);
  }, [moduleId]);
  
  const [terms, setTerms] = useState<PuzzlePiece[]>([]);
  const [definitions, setDefinitions] = useState<PuzzlePiece[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Check if selected pair is a match
  useEffect(() => {
    if (!selectedTerm || !selectedDefinition) return;
    
    const termPiece = terms.find(t => t.id === selectedTerm);
    const definitionPiece = definitions.find(d => d.id === selectedDefinition);
    
    if (termPiece && definitionPiece && termPiece.id === definitionPiece.id) {
      // Matched!
      setMatchedPairs(prev => [...prev, termPiece.id]);
    }
    
    // Reset selections after a short delay
    const timeout = setTimeout(() => {
      setSelectedTerm(null);
      setSelectedDefinition(null);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [selectedTerm, selectedDefinition, terms, definitions]);
  
  // Check if game is complete
  useEffect(() => {
    if (matchedPairs.length > 0 && modulePiecesRef.current.length > 0 && 
        matchedPairs.length === modulePiecesRef.current.length) {
      setGameComplete(true);
    }
  }, [matchedPairs]);
  
  const handleTermClick = (id: string) => {
    if (selectedTerm || matchedPairs.includes(id)) return;
    setSelectedTerm(id);
  };
  
  const handleDefinitionClick = (id: string) => {
    if (selectedDefinition || matchedPairs.includes(id)) return;
    setSelectedDefinition(id);
  };
  
  const resetGame = () => {
    const pieces = modulePiecesRef.current;
    const shuffledTerms = [...pieces].sort(() => Math.random() - 0.5);
    const shuffledDefinitions = [...pieces].sort(() => Math.random() - 0.5);
    
    setTerms(shuffledTerms);
    setDefinitions(shuffledDefinitions);
    setMatchedPairs([]);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setGameComplete(false);
  };
  
  if (gameComplete) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <Confetti recycle={false} numberOfPieces={200} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          
          <h2 className="text-2xl font-bold mb-2">
            {t('matching.complete')}
          </h2>
          
          <p className="text-lg mb-6">
            {t('matching.success')}
          </p>
          
          <Button onClick={onComplete}>
            {t('matching.continue')}
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
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
        <h2 className="text-xl font-bold text-center text-purple-800 mb-2">{t('matching.title')}</h2>
        <p className="text-center text-gray-600">{t('matching.instructions')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700 mb-2">{t('matching.terms')}</h3>
          {terms.map((piece) => (
            <motion.div
              key={piece.id}
              whileHover={{ scale: !matchedPairs.includes(piece.id) ? 1.02 : 1 }}
              whileTap={{ scale: !matchedPairs.includes(piece.id) ? 0.98 : 1 }}
            >
              <button
                className={`
                  w-full text-left p-3 rounded-lg border transition
                  ${matchedPairs.includes(piece.id) 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : selectedTerm === piece.id 
                      ? 'bg-purple-100 border-purple-300' 
                      : 'bg-white border-purple-200 hover:border-purple-400'}
                  ${!matchedPairs.includes(piece.id) ? 'cursor-pointer' : 'cursor-default'}
                `}
                onClick={() => handleTermClick(piece.id)}
                disabled={matchedPairs.includes(piece.id)}
              >
                <div className="flex items-center justify-between">
                  <span>{piece.term}</span>
                  {matchedPairs.includes(piece.id) && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700 mb-2">{t('matching.definitions')}</h3>
          {definitions.map((piece) => (
            <motion.div
              key={piece.id}
              whileHover={{ scale: !matchedPairs.includes(piece.id) ? 1.02 : 1 }}
              whileTap={{ scale: !matchedPairs.includes(piece.id) ? 0.98 : 1 }}
            >
              <button
                className={`
                  w-full text-left p-3 rounded-lg border transition
                  ${matchedPairs.includes(piece.id) 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : selectedDefinition === piece.id 
                      ? 'bg-purple-100 border-purple-300' 
                      : 'bg-white border-purple-200 hover:border-purple-400'}
                  ${!matchedPairs.includes(piece.id) ? 'cursor-pointer' : 'cursor-default'}
                `}
                onClick={() => handleDefinitionClick(piece.id)}
                disabled={matchedPairs.includes(piece.id)}
              >
                <div className="flex items-center justify-between">
                  <span>{piece.definition}</span>
                  {matchedPairs.includes(piece.id) && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          variant="outline" 
          onClick={resetGame}
        >
          {t('matching.resetGame')}
        </Button>
      </div>
    </div>
  );
};

export default MatchingGame;