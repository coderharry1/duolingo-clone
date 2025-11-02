
import React from 'react';
import { FeedbackState } from '../types';
import { CorrectIcon, IncorrectIcon } from './icons';

interface FeedbackBannerProps {
  feedback: FeedbackState;
  correctAnswer: string;
  onContinue: () => void;
}

const FeedbackBanner: React.FC<FeedbackBannerProps> = ({ feedback, correctAnswer, onContinue }) => {
  if (feedback === 'none') return null;

  const isCorrect = feedback === 'correct';
  const bannerClasses = isCorrect ? 'bg-green-500' : 'bg-red-500';
  const textClasses = isCorrect ? 'text-green-100' : 'text-red-100';
  const buttonClasses = isCorrect
    ? 'bg-white text-green-600 hover:bg-green-100'
    : 'bg-white text-red-600 hover:bg-red-100';

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 sm:p-6 transition-transform duration-300 ease-in-out transform translate-y-0 ${bannerClasses}`}>
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <div className="mr-4">
                {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
            </div>
            <div>
                <h3 className="font-extrabold text-white text-xl">
                    {isCorrect ? 'Correct!' : 'Incorrect!'}
                </h3>
                {!isCorrect && (
                    <p className={`mt-1 font-bold ${textClasses}`}>Correct answer: {correctAnswer}</p>
                )}
            </div>
        </div>
        <button
          onClick={onContinue}
          className={`px-8 py-3 rounded-lg font-extrabold text-lg shadow-md ${buttonClasses} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current`}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default FeedbackBanner;
