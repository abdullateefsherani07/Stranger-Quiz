import React from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import QuizCard from '../components/QuizCard';
import ResultMessage from '../components/ResultMessage';

const HomePage: React.FC = () => {
  const {
    question,
    options,
    selectedOption,
    isAnswerCorrect,
    handleOptionClick,
    resetQuiz,
  } = useQuizLogic();

  return (
    <div className="home-page">
      <QuizCard
        question={question}
        options={options}
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
      />
      <ResultMessage isCorrect={isAnswerCorrect} />
      <button onClick={resetQuiz}>Reset Quiz</button>
    </div>
  );
};

export default HomePage;
