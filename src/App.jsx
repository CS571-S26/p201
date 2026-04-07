import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <HashRouter>
      <NavigationBar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;