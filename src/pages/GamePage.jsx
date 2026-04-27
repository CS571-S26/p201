import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import GameBoard from '../components/GameBoard';
import ScorePanel from '../components/ScorePanel';

const CARD_SETS = {
  fruits: {
    label: 'Fruits',
    emojis: [
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
    ],
  },
  animals: {
    label: 'Animals',
    emojis: [
      '🐶',
      '🐱',
      '🐼',
      '🦊',
      '🐵',
      '🐸',
      '🐧',
      '🐢',
      '🦁',
      '🐯',
      '🐰',
      '🐨',
    ],
  },
  foods: {
    label: 'Foods',
    emojis: [
      '🍕',
      '🍔',
      '🍩',
      '🍪',
      '🌮',
      '🍟',
      '🥨',
      '🍿',
      '🥐',
      '🍜',
      '🍣',
      '🧁',
    ],
  },
};

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', pairs: 4 },
  medium: { label: 'Medium', pairs: 5 },
  hard: { label: 'Hard', pairs: 6 },
};

function getSavedDifficulty() {
  const savedDifficulty = localStorage.getItem('memory-game-difficulty');

  return DIFFICULTY_CONFIG[savedDifficulty] ? savedDifficulty : 'easy';
}

function getSavedCardSet() {
  const savedCardSet = localStorage.getItem('memory-game-card-set');

  return CARD_SETS[savedCardSet] ? savedCardSet : 'fruits';
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function generateCards(difficulty, cardSet) {
  const pairCount = DIFFICULTY_CONFIG[difficulty].pairs;
  const selectedEmojis = shuffleArray(CARD_SETS[cardSet].emojis).slice(
    0,
    pairCount
  );

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
  const [cardSet, setCardSet] = useState(getSavedCardSet);
  const [cards, setCards] = useState(() =>
    generateCards(getSavedDifficulty(), getSavedCardSet())
  );
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
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

  const cardSetLabel = useMemo(() => CARD_SETS[cardSet].label, [cardSet]);

  useEffect(() => {
    const savedBestScore = localStorage.getItem(
      `memory-game-best-score-${difficulty}-${cardSet}`
    );

    setBestScore(savedBestScore ? Number(savedBestScore) : null);
  }, [difficulty, cardSet]);

  useEffect(() => {
    if (isGameComplete) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSecondsElapsed((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isGameComplete]);

  useEffect(() => {
    if (
      isGameComplete &&
      moves > 0 &&
      (bestScore === null || moves < bestScore)
    ) {
      localStorage.setItem(
        `memory-game-best-score-${difficulty}-${cardSet}`,
        moves
      );
      setBestScore(moves);
    }
  }, [isGameComplete, moves, bestScore, difficulty, cardSet]);

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
    const savedCardSet = getSavedCardSet();

    window.clearTimeout(timerRef.current);
    setDifficulty(savedDifficulty);
    setCardSet(savedCardSet);
    setCards(generateCards(savedDifficulty, savedCardSet));
    setMoves(0);
    setSecondsElapsed(0);
    setIsChecking(false);
  };

  return (
    <div className="page-section">
      <section className="game-header-box">
        <h1 className="display-title">Card Match Game</h1>
        <p className="lead-text">
          Flip two cards at a time and try to match all pairs. The timer starts
          automatically when the game loads.
        </p>
      </section>

      {isGameComplete && (
        <Alert variant="success" className="game-alert">
          You matched all pairs in {moves} moves and {secondsElapsed} seconds on{' '}
          {difficultyLabel}. Great job!
        </Alert>
      )}

      <ScorePanel
        moves={moves}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        difficultyLabel={difficultyLabel}
        cardSetLabel={cardSetLabel}
        bestScore={bestScore}
        secondsElapsed={secondsElapsed}
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