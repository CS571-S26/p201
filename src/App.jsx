import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage';

function getSavedTheme() {
  const savedTheme = localStorage.getItem('memory-game-theme');

  return savedTheme === 'dark' ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    const handleSettingsChange = () => {
      setTheme(getSavedTheme());
    };

    window.addEventListener('memory-settings-changed', handleSettingsChange);

    return () => {
      window.removeEventListener(
        'memory-settings-changed',
        handleSettingsChange
      );
    };
  }, []);

  return (
    <HashRouter>
      <div className={`app-theme app-theme-${theme}`}>
        <NavigationBar />
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;