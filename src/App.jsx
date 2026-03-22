import { useState } from 'react';
import './App.css';

const emojis = ['🍎', '🍌', '🍇', '🍒', '🍎', '🍌', '🍇', '🍒'];

function shuffleCards() {
  return [...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
}

function App() {
  const [cards, setCards] = useState(shuffleCards());
  const [moves, setMoves] = useState(0);

  const handleCardClick = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      )
    );
    setMoves((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCards(shuffleCards());
    setMoves(0);
  };

  return (
    <div className="app">
      <h1>Card Match Game</h1>
      <p className="subtitle">A simple interactive memory card game</p>

      <div className="info-bar">
        <span>Moves: {moves}</span>
        <button onClick={handleRestart}>Restart Game</button>
      </div>

      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped ? card.emoji : '❓'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;