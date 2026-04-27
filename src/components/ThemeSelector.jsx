import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const THEMES = [
  { key: 'light', label: 'Light', description: 'Bright and clean layout' },
  { key: 'dark', label: 'Dark', description: 'Darker background for contrast' },
];

function ThemeSelector({ selectedTheme, onThemeChange }) {
  const [currentTheme, setCurrentTheme] = useState(selectedTheme || 'light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('memory-game-theme');

    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (selectedTheme) {
      setCurrentTheme(selectedTheme);
    }
  }, [selectedTheme]);

  const handleSelectTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('memory-game-theme', theme);
    window.dispatchEvent(new Event('memory-settings-changed'));
    onThemeChange?.(theme);
  };

  return (
    <div className="theme-selector">
      <div className="selector-options" role="group" aria-label="Theme options">
        {THEMES.map((theme) => (
          <Button
            key={theme.key}
            variant={currentTheme === theme.key ? 'primary' : 'outline-primary'}
            onClick={() => handleSelectTheme(theme.key)}
          >
            {theme.label}
          </Button>
        ))}
      </div>

      <div className="difficulty-info">
        {THEMES.map((theme) => (
          <div
            key={theme.key}
            className={`difficulty-pill ${
              currentTheme === theme.key ? 'selected' : ''
            }`}
          >
            <span className="score-label">{theme.label}</span>
            <span className="theme-description">{theme.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;