import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const CARD_SETS = [
  { key: 'fruits', label: 'Fruits', preview: '🍎 🍌 🍇 🍒' },
  { key: 'animals', label: 'Animals', preview: '🐶 🐱 🐼 🦊' },
  { key: 'foods', label: 'Foods', preview: '🍕 🍔 🍩 🍪' },
];

function CardSetSelector({ selectedCardSet, onCardSetChange }) {
  const [currentCardSet, setCurrentCardSet] = useState(
    selectedCardSet || 'fruits'
  );

  useEffect(() => {
    const savedCardSet = localStorage.getItem('memory-game-card-set');

    if (savedCardSet) {
      setCurrentCardSet(savedCardSet);
    }
  }, []);

  useEffect(() => {
    if (selectedCardSet) {
      setCurrentCardSet(selectedCardSet);
    }
  }, [selectedCardSet]);

  const handleSelectCardSet = (cardSet) => {
    setCurrentCardSet(cardSet);
    localStorage.setItem('memory-game-card-set', cardSet);
    onCardSetChange?.(cardSet);
  };

  return (
    <div className="card-set-selector">
      <div className="selector-options" role="group" aria-label="Card set options">
        {CARD_SETS.map((cardSet) => (
          <Button
            key={cardSet.key}
            variant={
              currentCardSet === cardSet.key ? 'primary' : 'outline-primary'
            }
            onClick={() => handleSelectCardSet(cardSet.key)}
          >
            {cardSet.label}
          </Button>
        ))}
      </div>

      <div className="difficulty-info">
        {CARD_SETS.map((cardSet) => (
          <div
            key={cardSet.key}
            className={`difficulty-pill ${
              currentCardSet === cardSet.key ? 'selected' : ''
            }`}
          >
            <span className="score-label">{cardSet.label}</span>
            <span className="score-value card-set-preview">
              {cardSet.preview}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSetSelector;