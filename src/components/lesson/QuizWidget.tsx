import React, { useState } from 'react';
import { LessonQuiz } from '../../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizWidgetProps {
  quizData: LessonQuiz[];
  onComplete: (score: number) => void;
}

const QuizWidget: React.FC<QuizWidgetProps> = ({ quizData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quizData.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    if (submitted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (submitted) return;
    
    let newScore = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (selectedAnswers[i] === quizData[i].correctAnswer) {
        newScore++;
      }
    }
    
    setScore(newScore);
    setSubmitted(true);
    onComplete(newScore);
  };

  const currentQuiz = quizData[currentQuestion];
  const isCorrect = selectedAnswers[currentQuestion] === currentQuiz.correctAnswer;
  const hasSelected = selectedAnswers[currentQuestion] !== -1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz rapid</h3>

      {quizData.length > 1 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Întrebarea {currentQuestion + 1} din {quizData.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-800 mb-4">{currentQuiz.question}</h4>
        
        <div className="space-y-3">
          {currentQuiz.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                selectedAnswers[currentQuestion] === index 
                  ? submitted
                    ? isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                    : 'bg-indigo-50 border-indigo-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                selectedAnswers[currentQuestion] === index
                  ? submitted
                    ? isCorrect
                      ? 'border-green-500 bg-green-500'
                      : 'border-red-500 bg-red-500'
                    : 'border-indigo-600 bg-indigo-600'
                  : 'border-gray-400'
              }`}>
                {selectedAnswers[currentQuestion] === index && (
                  <span className="flex items-center justify-center text-white text-xs">
                    {submitted && (
                      isCorrect ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />
                    )}
                  </span>
                )}
              </div>
              <span className={`ml-3 text-sm ${
                selectedAnswers[currentQuestion] === index
                  ? submitted
                    ? isCorrect
                      ? 'text-green-700 font-medium'
                      : 'text-red-700 font-medium'
                    : 'text-indigo-700 font-medium'
                  : 'text-gray-700'
              }`}>
                {option}
              </span>
              {submitted && index === currentQuiz.correctAnswer && selectedAnswers[currentQuestion] !== index && (
                <CheckCircle className="ml-auto h-4 w-4 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        {quizData.length > 1 && (
          <>
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Înapoi
            </button>

            <button
              onClick={() => {
                if (currentQuestion < quizData.length - 1) {
                  setCurrentQuestion(prev => prev + 1);
                } else if (!submitted && hasSelected) {
                  handleSubmit();
                }
              }}
              disabled={!hasSelected}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentQuestion < quizData.length - 1
                  ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  : submitted
                    ? 'text-white bg-green-600 hover:bg-green-700'
                    : 'text-white bg-indigo-600 hover:bg-indigo-700'
              } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              {currentQuestion < quizData.length - 1
                ? 'Următoarea'
                : submitted
                  ? `Scor: ${score}/${quizData.length}`
                  : 'Trimite răspuns'}
            </button>
          </>
        )}

        {quizData.length === 1 && (
          <button
            onClick={handleSubmit}
            disabled={!hasSelected || submitted}
            className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
              submitted
                ? 'text-white bg-green-600'
                : 'text-white bg-indigo-600 hover:bg-indigo-700'
            } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            {submitted
              ? `Scor: ${score}/${quizData.length}`
              : 'Trimite răspuns'}
          </button>
        )}
      </div>

      {submitted && (
        <div className={`mt-4 p-3 rounded-md ${
          score === quizData.length
            ? 'bg-green-50 text-green-700'
            : score === 0
              ? 'bg-red-50 text-red-700'
              : 'bg-amber-50 text-amber-700'
        }`}>
          {score === quizData.length ? (
            <p className="text-sm font-medium">
              Felicitări! Ai răspuns corect la toate întrebările.
            </p>
          ) : score === 0 ? (
            <p className="text-sm font-medium">
              Ai răspuns greșit la toate întrebările. Încearcă să revezi materialul.
            </p>
          ) : (
            <p className="text-sm font-medium">
              Ai răspuns corect la {score} din {quizData.length} întrebări.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizWidget;