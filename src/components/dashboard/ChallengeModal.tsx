import React, { useState, useEffect } from 'react';
import { X, Calculator, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ChallengeModalProps {
  challengeId: string;
  onComplete: (challengeId: string, score: number) => void;
  onClose: () => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ challengeId, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Generate questions based on challenge type
    if (challengeId === '123e4567-e89b-12d3-a456-426614174006') {
      // Math equations challenge
      setQuestions([
        {
          id: '1',
          question: 'Rezolvă ecuația: 2x + 6 = 14',
          options: ['x = 4', 'x = 6', 'x = 8', 'x = 10'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Rezolvă ecuația: 3x - 9 = 0',
          options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
          correctAnswer: 1
        },
        {
          id: '3',
          question: 'Rezolvă ecuația: 5x + 10 = 25',
          options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
          correctAnswer: 1
        },
        {
          id: '4',
          question: 'Rezolvă ecuația: 4x - 8 = 16',
          options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
          correctAnswer: 2
        },
        {
          id: '5',
          question: 'Rezolvă ecuația: 6x + 12 = 30',
          options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
          correctAnswer: 1
        }
      ]);
    } else {
      // Literary figures challenge
      setQuestions([
        {
          id: '1',
          question: 'Identifică figura de stil din: "Vântul șoptește prin frunze"',
          options: ['Metaforă', 'Personificare', 'Comparație', 'Epitet'],
          correctAnswer: 1
        },
        {
          id: '2',
          question: 'Ce figură de stil este în: "Ochii săi erau două stele"?',
          options: ['Personificare', 'Metaforă', 'Hiperbola', 'Comparație'],
          correctAnswer: 1
        },
        {
          id: '3',
          question: 'Identifică figura de stil: "Alb ca zăpada"',
          options: ['Metaforă', 'Personificare', 'Comparație', 'Epitet'],
          correctAnswer: 2
        },
        {
          id: '4',
          question: 'Ce figură de stil este în: "Frumoasa ca o floare"?',
          options: ['Comparație', 'Metaforă', 'Personificare', 'Hiperbola'],
          correctAnswer: 0
        },
        {
          id: '5',
          question: 'Identifică figura de stil: "Marea urlă furioasă"',
          options: ['Metaforă', 'Personificare', 'Comparație', 'Epitet'],
          correctAnswer: 1
        }
      ]);
    }
    setAnswers(new Array(5).fill(-1));
  }, [challengeId]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      let correctAnswers = 0;
      questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    onComplete(challengeId, score);
  };

  const getChallengeTitle = () => {
    return challengeId === '123e4567-e89b-12d3-a456-426614174006' 
      ? 'Rezolvă 5 ecuații azi' 
      : 'Identifică figurile de stil';
  };

  const getChallengeIcon = () => {
    return challengeId === '123e4567-e89b-12d3-a456-426614174006' 
      ? <Calculator className="h-6 w-6 text-indigo-600" />
      : <BookOpen className="h-6 w-6 text-indigo-600" />;
  };

  if (questions.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  {getChallengeIcon()}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {getChallengeTitle()}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {!showResults ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Întrebarea {currentQuestion + 1} din {questions.length}</span>
                    <span>{answers.filter(a => a !== -1).length}/{questions.length} răspunsuri</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {questions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          answers[currentQuestion] === index
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            answers[currentQuestion] === index
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300'
                          }`}>
                            {answers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className={`${
                            answers[currentQuestion] === index
                              ? 'text-indigo-700 font-medium'
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Înapoi
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === -1}
                    className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? 'Următoarea' : 'Finalizează'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
                  score >= 4 ? 'bg-green-100' : score >= 2 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {score >= 4 ? (
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  ) : (
                    <XCircle className="h-10 w-10 text-red-600" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Provocare completă!
                </h3>
                
                <p className="text-lg text-gray-600 mb-6">
                  Ai răspuns corect la {score} din {questions.length} întrebări
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Rezultate detaliate:</h4>
                  <div className="space-y-2">
                    {questions.map((question, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Întrebarea {index + 1}</span>
                        <div className="flex items-center">
                          {answers[index] === question.correctAnswer ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={answers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                            {answers[index] === question.correctAnswer ? 'Corect' : 'Greșit'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className="px-8 py-3 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Continuă
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChallengeModal;