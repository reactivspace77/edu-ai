import React, { useState, useEffect } from 'react';
import { X, Calculator, BookOpen, CheckCircle, XCircle, FileText, Shapes } from 'lucide-react';
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
    let challengeQuestions: Question[] = [];
    
    if (challengeId === 'romana-analiza-epic') {
      challengeQuestions = [
        {
          id: '1',
          question: 'Care este elementul principal al textului epic?',
          options: ['Acțiunea', 'Sentimentele', 'Dialogul', 'Descrierea'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Cine este protagonistul într-un text epic?',
          options: ['Autorul', 'Cititorul', 'Personajul principal', 'Naratorul'],
          correctAnswer: 2
        },
        {
          id: '3',
          question: 'Ce reprezintă conflictul într-un text epic?',
          options: ['Dialogul dintre personaje', 'Lupta dintre forțe opuse', 'Descrierea peisajului', 'Monologul interior'],
          correctAnswer: 1
        },
        {
          id: '4',
          question: 'Care sunt momentele subiectului epic?',
          options: ['Început, mijloc, sfârșit', 'Expozițiune, intrigă, deznodământ', 'Cauză, efect, concluzie', 'Introducere, dezvoltare, încheiere'],
          correctAnswer: 1
        },
        {
          id: '5',
          question: 'Ce rol are naratorul în textul epic?',
          options: ['Participă la acțiune', 'Relatează întâmplările', 'Exprimă sentimente', 'Descrie peisajul'],
          correctAnswer: 1
        }
      ];
    } else if (challengeId === 'mate-geometrie-arii') {
      challengeQuestions = [
        {
          id: '1',
          question: 'Care este formula pentru aria unui dreptunghi?',
          options: ['l × L', 'l + L', '2(l + L)', 'l² + L²'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Care este formula pentru aria unui triunghi?',
          options: ['b × h', '(b × h) / 2', 'b + h', '2 × b × h'],
          correctAnswer: 1
        },
        {
          id: '3',
          question: 'Care este perimetrul unui pătrat cu latura de 5 cm?',
          options: ['10 cm', '15 cm', '20 cm', '25 cm'],
          correctAnswer: 2
        },
        {
          id: '4',
          question: 'Care este aria unui cerc cu raza de 3 cm? (π ≈ 3,14)',
          options: ['18,84 cm²', '28,26 cm²', '9,42 cm²', '6,28 cm²'],
          correctAnswer: 1
        },
        {
          id: '5',
          question: 'Un dreptunghi are lungimea de 8 cm și lățimea de 5 cm. Care este perimetrul?',
          options: ['13 cm', '26 cm', '40 cm', '21 cm'],
          correctAnswer: 1
        }
      ];
    } else if (challengeId === 'romana-morfologie') {
      challengeQuestions = [
        {
          id: '1',
          question: 'Care dintre următoarele este o parte de vorbire flexibilă?',
          options: ['Adverbul', 'Substantivul', 'Prepoziția', 'Conjuncția'],
          correctAnswer: 1
        },
        {
          id: '2',
          question: 'Ce exprimă verbul în propoziție?',
          options: ['O însușire', 'O acțiune sau o stare', 'O relație', 'O circumstanță'],
          correctAnswer: 1
        },
        {
          id: '3',
          question: 'Care este rolul adjectivului în propoziție?',
          options: ['Exprimă acțiunea', 'Determină substantivul', 'Leagă cuvintele', 'Exprimă circumstanțe'],
          correctAnswer: 1
        },
        {
          id: '4',
          question: 'Ce parte de vorbire este cuvântul "frumos" în propoziția "Copilul este frumos"?',
          options: ['Substantiv', 'Verb', 'Adjectiv', 'Adverb'],
          correctAnswer: 2
        },
        {
          id: '5',
          question: 'Care dintre următoarele este o parte de vorbire neflexibilă?',
          options: ['Pronumele', 'Numeralul', 'Adverbul', 'Articolul'],
          correctAnswer: 2
        }
      ];
    }
    
    setQuestions(challengeQuestions);
    setAnswers(new Array(challengeQuestions.length).fill(-1));
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
    switch(challengeId) {
      case 'romana-analiza-epic':
        return 'Analiza textului epic';
      case 'mate-geometrie-arii':
        return 'Geometrie - Arii și Perimetri';
      case 'romana-morfologie':
        return 'Morfologie - Părțile de vorbire';
      default:
        return 'Provocare';
    }
  };

  const getChallengeIcon = () => {
    switch(challengeId) {
      case 'romana-analiza-epic':
        return <BookOpen className="h-6 w-6 text-indigo-600" />;
      case 'mate-geometrie-arii':
        return <Shapes className="h-6 w-6 text-indigo-600" />;
      case 'romana-morfologie':
        return <FileText className="h-6 w-6 text-indigo-600" />;
      default:
        return <Calculator className="h-6 w-6 text-indigo-600" />;
    }
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