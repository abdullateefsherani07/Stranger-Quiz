import { useState } from 'react';
import { quizData } from '../utils/quizData';

export const useQuizLogic = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === quizData.correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
  };

  return {
    question: quizData.question,
    options: quizData.options,
    selectedOption,
    isAnswerCorrect,
    handleOptionClick,
    resetQuiz,
  };
};
