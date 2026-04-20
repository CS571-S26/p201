import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const DIFFICULTIES = [
  { key: 'easy', label: 'Easy', cards: 8 },
  { key: 'medium', label: 'Medium', cards: 10 },
  { key: 'hard', label: 'Hard', cards: 12 },
];

function DifficultySelector() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('memory-game-difficulty');

    if (savedDifficulty) {
      setSelectedDifficulty(savedDifficulty);
    }
  }, []);

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    localStorage.setItem('memory-game-difficulty', difficulty);
  };

  return (
    <div className="difficulty-selector">
      <div className="difficulty-options">
        {DIFFICULTIES.map((difficulty) => (
          <Button
            key={difficulty.key}
            variant={
              selectedDifficulty === difficulty.key
                ? 'primary'
                : 'outline-primary'
            }
            onClick={() => handleSelectDifficulty(difficulty.key)}
          >
            {difficulty.label}
          </Button>
        ))}
      </div>

      <div className="difficulty-info">
        {DIFFICULTIES.map((difficulty) => (
          <div
            key={difficulty.key}
            className={`difficulty-pill ${
              selectedDifficulty === difficulty.key ? 'selected' : ''
            }`}
          >
            <span className="score-label">{difficulty.label}</span>
            <span className="score-value">{difficulty.cards} Cards</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;