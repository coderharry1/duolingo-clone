import React, { useState } from 'react';
import { Lesson, Question, FeedbackState } from '../types';
import ProgressBar from './ProgressBar';
import AnswerButton from './AnswerButton';
import FeedbackBanner from './FeedbackBanner';

interface LessonScreenProps {
  lesson: Lesson;
  onLessonComplete: () => void;
}

const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, onLessonComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>('none');

  const currentQuestion: Question = lesson.questions[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    if (feedback !== 'none') return;
    setSelectedAnswer(option);
    if (option === currentQuestion.correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setFeedback('none');
    } else {
      onLessonComplete();
    }
  };

  const getButtonState = (option: string) => {
    if (feedback === 'none') {
      return selectedAnswer === option ? 'selected' : 'default';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'correct';
    }
    if (option === selectedAnswer) {
      return 'incorrect';
    }
    return 'default';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <ProgressBar current={currentQuestionIndex} total={lesson.questions.length} />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 my-8 text-center">
            {currentQuestion.question}
          </h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <AnswerButton
                key={option}
                text={option}
                onClick={() => handleAnswerSelect(option)}
                state={getButtonState(option)}
                disabled={feedback !== 'none'}
              />
            ))}
          </div>
        </div>
      </main>
      <FeedbackBanner
        feedback={feedback}
        correctAnswer={currentQuestion.correctAnswer}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default LessonScreen;
