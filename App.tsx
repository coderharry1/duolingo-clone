import React, { useState } from 'react';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import LoadingSpinner from './components/LoadingSpinner';
import LessonScreen from './components/LessonScreen';
import LessonCompleteScreen from './components/LessonCompleteScreen';
import { generateLesson } from './services/geminiService';
import { Language, Lesson, AppState } from './types';

// Fix: Implement the main App component to handle application state and logic.
function App() {
  const [appState, setAppState] = useState<AppState>('selecting_language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const handleLanguageSelect = async (language: Language) => {
    setSelectedLanguage(language);
    setAppState('generating_lesson');
    try {
      const lesson = await generateLesson(language);
      if (lesson) {
        setCurrentLesson(lesson);
        setAppState('in_lesson');
      } else {
        alert("Failed to generate lesson. Please try again.");
        setAppState('selecting_language');
      }
    } catch (error) {
      console.error("Error during lesson generation:", error);
      alert("An error occurred while generating the lesson. Please check the console and try again.");
      setAppState('selecting_language');
    }
  };

  const handleLessonComplete = () => {
    setAppState('lesson_complete');
  };

  const handleRestart = () => {
    setAppState('selecting_language');
    setSelectedLanguage(null);
    setCurrentLesson(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'selecting_language':
        return <LanguageSelectionScreen onLanguageSelect={handleLanguageSelect} />;
      case 'generating_lesson':
        return <LoadingSpinner message={`Generating your ${selectedLanguage?.name || ''} lesson...`} />;
      case 'in_lesson':
        if (currentLesson) {
          return <LessonScreen lesson={currentLesson} onLessonComplete={handleLessonComplete} />;
        }
        // Fallback in case lesson is null
        handleRestart();
        return null;
      case 'lesson_complete':
        return <LessonCompleteScreen onContinue={handleRestart} />;
      default:
        return <LanguageSelectionScreen onLanguageSelect={handleLanguageSelect} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
