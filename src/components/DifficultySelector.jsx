import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const DIFFICULTIES = [
  { key: 'easy', label: 'Easy', cards: 8 },
  { key: 'medium', label: 'Medium', cards: 10 },
  { key: 'hard', label: 'Hard', cards: 12 },
];

function DifficultySelector({ selectedDifficulty, onDifficultyChange }) {
  const [currentDifficulty, setCurrentDifficulty] = useState(
    selectedDifficulty || 'easy'
  );

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('memory-game-difficulty');

    if (savedDifficulty) {
      setCurrentDifficulty(savedDifficulty);
    }
  }, []);

  useEffect(() => {
    if (selectedDifficulty) {
      setCurrentDifficulty(selectedDifficulty);
    }
  }, [selectedDifficulty]);

  const handleSelectDifficulty = (difficulty) => {
    setCurrentDifficulty(difficulty);
    localStorage.setItem('memory-game-difficulty', difficulty);
    onDifficultyChange?.(difficulty);
  };

  return (
    <div className="difficulty-selector">
      <div
        className="difficulty-options"
        role="group"
        aria-label="Difficulty options"
      >
        {DIFFICULTIES.map((difficulty) => (
          <Button
            key={difficulty.key}
            variant={
              currentDifficulty === difficulty.key
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
              currentDifficulty === difficulty.key ? 'selected' : ''
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