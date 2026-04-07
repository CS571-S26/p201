import MemoryCard from './MemoryCard';

function GameBoard({ cards, onCardClick, isChecking }) {
  return (
    <div className="game-board">
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={onCardClick}
          isDisabled={isChecking || card.flipped || card.matched}
        />
      ))}
    </div>
  );
}

export default GameBoard;