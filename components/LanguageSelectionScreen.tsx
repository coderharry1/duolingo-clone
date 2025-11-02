import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';
import { MascotIcon } from './icons';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <MascotIcon />
        <h1 className="text-4xl font-extrabold text-slate-800 mt-4">LinguaGenius</h1>
        <p className="text-slate-600 text-lg mt-2">Choose a language to start your lesson</p>
      </div>

      <div className="w-full max-w-sm">
        <div className="space-y-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang)}
              className="w-full flex items-center p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left shadow-sm"
            >
              <span className="text-3xl mr-4">{lang.flag}</span>
              <span className="text-xl font-bold text-slate-700">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionScreen;
