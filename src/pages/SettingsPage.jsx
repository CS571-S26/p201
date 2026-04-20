import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import DifficultySelector from '../components/DifficultySelector';

function SettingsPage() {
  return (
    <div className="page-section">
      <section className="game-header-box">
        <h1 className="display-title">Game Settings</h1>
        <p className="lead-text">
          Choose a difficulty level before starting the game. Higher
          difficulties use more cards, so the board becomes more challenging.
        </p>
      </section>

      <Card className="feature-card settings-card">
        <Card.Body>
          <Card.Title>Select Difficulty</Card.Title>
          <DifficultySelector />

          <div className="hero-actions settings-actions">
            <Button as={Link} to="/game" variant="primary">
              Start Game
            </Button>
            <Button as={Link} to="/" variant="outline-secondary">
              Back Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SettingsPage;