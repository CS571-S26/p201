import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import GameBoard from '../components/GameBoard';
import ScorePanel from '../components/ScorePanel';

const EMOJI_POOL = [
  '🍎',
  '🍌',
  '🍇',
  '🍒',
  '🍉',
  '🍍',
  '🥝',
  '🍓',
  '🍑',
  '🍋',
  '🍊',
  '🥥',
  '🍕',
  '🍔',
  '🍩',
  '🍪',
  '🐶',
  '🐱',
  '🐼',
  '🦊',
];

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', pairs: 4 },
  medium: { label: 'Medium', pairs: 5 },
  hard: { label: 'Hard', pairs: 6 },
};

function getSavedDifficulty() {
  return localStorage.getItem('memory-game-difficulty') || 'easy';
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function generateCards(difficulty) {
  const pairCount = DIFFICULTY_CONFIG[difficulty].pairs;
  const selectedEmojis = shuffleArray(EMOJI_POOL).slice(0, pairCount);

  return shuffleArray([...selectedEmojis, ...selectedEmojis]).map(
    (emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    })
  );
}

function GamePage() {
  const [difficulty, setDifficulty] = useState(getSavedDifficulty);
  const [cards, setCards] = useState(() => generateCards(getSavedDifficulty()));
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const timerRef = useRef(null);

  const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
  const matchedPairs = cards.filter((card) => card.matched).length / 2;
  const isGameComplete = matchedPairs === totalPairs;

  const difficultyLabel = useMemo(
    () => DIFFICULTY_CONFIG[difficulty].label,
    [difficulty]
  );

  useEffect(() => {
    const savedDifficulty = getSavedDifficulty();
    setDifficulty(savedDifficulty);
    setCards(generateCards(savedDifficulty));
    setMoves(0);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    const savedBestScore = localStorage.getItem(
      `memory-game-best-score-${difficulty}`
    );

    setBestScore(savedBestScore ? Number(savedBestScore) : null);
  }, [difficulty]);

  useEffect(() => {
    if (
      isGameComplete &&
      moves > 0 &&
      (bestScore === null || moves < bestScore)
    ) {
      localStorage.setItem(`memory-game-best-score-${difficulty}`, moves);
      setBestScore(moves);
    }
  }, [isGameComplete, moves, bestScore, difficulty]);

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
    const savedDifficulty = getSavedDifficulty();

    window.clearTimeout(timerRef.current);
    setDifficulty(savedDifficulty);
    setCards(generateCards(savedDifficulty));
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
          You matched all pairs in {moves} moves on {difficultyLabel}. Great
          job!
        </Alert>
      )}

      <ScorePanel
        moves={moves}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        difficultyLabel={difficultyLabel}
        bestScore={bestScore}
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