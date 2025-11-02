import React from 'react';
import Confetti from './Confetti';
import { CheckCircleIcon } from './icons';

interface LessonCompleteScreenProps {
  onContinue: () => void;
}

const LessonCompleteScreen: React.FC<LessonCompleteScreenProps> = ({ onContinue }) => {
  return (
    <>
      <Confetti />
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="transform scale-125">
            <CheckCircleIcon />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 mt-6">Lesson Complete!</h1>
        <p className="text-slate-600 text-lg mt-2">You did an amazing job. Keep up the great work!</p>
        <button
          onClick={onContinue}
          className="mt-8 px-10 py-4 bg-green-500 text-white font-extrabold text-xl rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          CONTINUE
        </button>
      </div>
    </>
  );
};

export default LessonCompleteScreen;