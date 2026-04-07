import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import GameBoard from '../components/GameBoard';
import ScorePanel from '../components/ScorePanel';

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

function GamePage() {
  const [cards, setCards] = useState(() => shuffleCards());
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef(null);

  const totalPairs = emojis.length / 2;
  const matchedPairs = cards.filter((card) => card.matched).length / 2;
  const isGameComplete = matchedPairs === totalPairs;

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCardClick = (id) => {
    if (isChecking) {
      return;
    }

    const clickedCard = cards.find((card) => card.id === id);

    if (!clickedCard || clickedCard.flipped || clickedCard.matched) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );

    setCards(updatedCards);

    const openCards = updatedCards.filter(
      (card) => card.flipped && !card.matched
    );

    if (openCards.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [firstCard, secondCard] = openCards;
      const isMatch = firstCard.emoji === secondCard.emoji;

      timerRef.current = window.setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => {
            const isChosenCard =
              card.id === firstCard.id || card.id === secondCard.id;

            if (!isChosenCard) {
              return card;
            }

            if (isMatch) {
              return { ...card, matched: true };
            }

            return { ...card, flipped: false };
          })
        );

        setIsChecking(false);
      }, isMatch ? 500 : 900);
    }
  };

  const handleRestart = () => {
    window.clearTimeout(timerRef.current);
    setCards(shuffleCards());
    setMoves(0);
    setIsChecking(false);
  };

  return (
    <div className="page-section">
      <section className="game-header-box">
        <h1 className="display-title">Card Match Game</h1>
        <p className="lead-text">
          Flip two cards at a time and try to match all pairs.
        </p>
      </section>

      {isGameComplete && (
        <Alert variant="success" className="game-alert">
          You matched all pairs in {moves} moves. Great job!
        </Alert>
      )}

      <ScorePanel
        moves={moves}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        onRestart={handleRestart}
      />

      <GameBoard
        cards={cards}
        onCardClick={handleCardClick}
        isChecking={isChecking}
      />
    </div>
  );
}

export default GamePage;