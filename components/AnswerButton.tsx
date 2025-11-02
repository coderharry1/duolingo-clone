
import React from 'react';

type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect';

interface AnswerButtonProps {
  text: string;
  state: ButtonState;
  onClick: () => void;
  disabled: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ text, state, onClick, disabled }) => {
  const baseClasses = "w-full text-left p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 focus:outline-none";
  const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";

  const stateClasses = {
    default: "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300",
    selected: "bg-blue-100 border-blue-400 text-blue-800 ring-2 ring-blue-400",
    correct: "bg-green-100 border-green-500 text-green-800",
    incorrect: "bg-red-100 border-red-500 text-red-800",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses[state]} ${disabledClasses}`}
    >
      {text}
    </button>
  );
};

export default AnswerButton;
