import React from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onOptionClick: (option: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, options, selectedOption, onOptionClick }) => {
  return (
    <div className="quiz-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={selectedOption === option ? 'selected' : ''}
            onClick={() => onOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
