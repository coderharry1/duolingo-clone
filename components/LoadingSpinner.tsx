
import React from 'react';
import { MascotIcon } from './icons';

interface LoadingSpinnerProps {
    message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50">
      <div className="animate-bounce">
          <MascotIcon />
      </div>
      <p className="mt-4 text-xl font-bold text-slate-600">{message}</p>
      <div className="mt-2 text-slate-500">Generating your lesson with AI...</div>
    </div>
  );
};

export default LoadingSpinner;
