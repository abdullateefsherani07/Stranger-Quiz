import React from 'react';

interface ResultMessageProps {
  isCorrect: boolean | null;
}

const ResultMessage: React.FC<ResultMessageProps> = ({ isCorrect }) => {
  if (isCorrect === null) {
    return null; // No message if no answer has been selected yet
  }

  return (
    <div className="result-message">
      {isCorrect ? (
        <p style={{ color: 'green' }}>Correct! Well done!</p>
      ) : (
        <p style={{ color: 'red' }}>Incorrect! Try again.</p>
      )}
    </div>
  );
};

export default ResultMessage;
