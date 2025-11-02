import { GoogleGenAI, Type } from "@google/genai";
import { Lesson, Language } from '../types';

// Fix: Initialize the GoogleGenAI client. Ensure API_KEY is set in your environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const lessonSchema = {
  type: Type.OBJECT,
  properties: {
    vocabulary: {
      type: Type.ARRAY,
      description: "A list of 5-10 vocabulary words for a beginner.",
      items: {
        type: Type.OBJECT,
        properties: {
          word: {
            type: Type.STRING,
            description: "A vocabulary word in the target language."
          },
          translation: {
            type: Type.STRING,
            description: "The English translation of the word."
          }
        },
        required: ["word", "translation"]
      }
    },
    questions: {
      type: Type.ARRAY,
      description: "A list of 5 multiple-choice questions to test the vocabulary.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "A question in English asking for the translation of a word."
          },
          options: {
            type: Type.ARRAY,
            description: "An array of 4 possible answers in the target language.",
            items: {
              type: Type.STRING
            }
          },
          correctAnswer: {
            type: Type.STRING,
            description: "The correct answer from the options list."
          }
        },
        required: ["question", "options", "correctAnswer"]
      }
    }
  },
  required: ["vocabulary", "questions"]
};

export const generateLesson = async (language: Language): Promise<Lesson | null> => {
  const prompt = `Generate a beginner-level language lesson for learning ${language.name}. The lesson should include a vocabulary list and a multiple-choice quiz. Provide the output in JSON format.`;

  try {
    // Fix: Use ai.models.generateContent with a recommended model and configuration.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
      },
    });

    // Fix: Access the response text correctly using response.text.
    const responseText = response.text;
    if (!responseText) {
        console.error("No response text from Gemini.");
        return null;
    }
    
    const lesson = JSON.parse(responseText) as Lesson;
    
    // Basic validation
    if (!lesson.vocabulary || !lesson.questions) {
        console.error("Invalid lesson format received:", lesson);
        return null;
    }

    return lesson;
  } catch (error) {
    console.error("Error generating lesson:", error);
    return null;
  }
};
