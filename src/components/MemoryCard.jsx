function MemoryCard({ card, onClick, isDisabled }) {
  const isVisible = card.flipped || card.matched;

  return (
    <button
      type="button"
      className={`memory-card ${isVisible ? 'flipped' : ''} ${
        card.matched ? 'matched' : ''
      }`}
      onClick={() => onClick(card.id)}
      disabled={isDisabled}
      aria-label={isVisible ? `Card ${card.emoji}` : 'Hidden card'}
    >
      <span className="card-emoji">{isVisible ? card.emoji : '❓'}</span>
    </button>
  );
}

export default MemoryCard;