import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DifficultySelector from '../components/DifficultySelector';
import CardSetSelector from '../components/CardSetSelector';
import ThemeSelector from '../components/ThemeSelector';
import SettingsOptionCard from '../components/SettingsOptionCard';

const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const CARD_SET_LABELS = {
  fruits: 'Fruits',
  animals: 'Animals',
  foods: 'Foods',
};

const THEME_LABELS = {
  light: 'Light',
  dark: 'Dark',
};

function getSavedSetting(key, fallback, options) {
  const savedValue = localStorage.getItem(key);

  return options[savedValue] ? savedValue : fallback;
}

function SettingsPage() {
  const [difficulty, setDifficulty] = useState(() =>
    getSavedSetting('memory-game-difficulty', 'easy', DIFFICULTY_LABELS)
  );
  const [cardSet, setCardSet] = useState(() =>
    getSavedSetting('memory-game-card-set', 'fruits', CARD_SET_LABELS)
  );
  const [theme, setTheme] = useState(() =>
    getSavedSetting('memory-game-theme', 'light', THEME_LABELS)
  );

  return (
    <div className="page-section">
      <section className="game-header-box">
        <h1 className="display-title">Game Settings</h1>
        <p className="lead-text">
          Customize the difficulty, card set, and theme before starting the
          game. Each setting is saved automatically for your next round.
        </p>
      </section>

      <div className="settings-option-list">
        <SettingsOptionCard
          title="Difficulty"
          summary={DIFFICULTY_LABELS[difficulty]}
          description="Choose how many cards appear on the board."
        >
          <DifficultySelector
            selectedDifficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />
        </SettingsOptionCard>

        <SettingsOptionCard
          title="Card Set"
          summary={CARD_SET_LABELS[cardSet]}
          description="Choose which group of icons will appear on the cards."
        >
          <CardSetSelector
            selectedCardSet={cardSet}
            onCardSetChange={setCardSet}
          />
        </SettingsOptionCard>

        <SettingsOptionCard
          title="Theme"
          summary={THEME_LABELS[theme]}
          description="Switch between a light theme and a dark theme."
        >
          <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />
        </SettingsOptionCard>
      </div>

      <div className="hero-actions settings-actions">
        <Button as={Link} to="/game" variant="primary">
          Start Game
        </Button>
        <Button as={Link} to="/" variant="outline-secondary">
          Back Home
        </Button>
      </div>
    </div>
  );
}

export default SettingsPage;