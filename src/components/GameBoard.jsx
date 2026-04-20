import MemoryCard from './MemoryCard';

function GameBoard({ cards, onCardClick, isChecking }) {
  let boardClassName = 'game-board';

  if (cards.length === 10) {
    boardClassName += ' game-board-medium';
  }

  return (
    <div className={boardClassName}>
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