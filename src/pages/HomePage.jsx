import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function HomePage() {
  return (
    <div className="page-section">
      <section className="hero-section">
        <h1 className="display-title">Card Match Game</h1>
        <p className="lead-text">
          This is an interactive memory card game built with React. Players flip
          cards, try to find matching pairs, and restart the game whenever they
          want.
        </p>

        <div className="hero-actions">
          <Button as={Link} to="/game" variant="primary" size="lg">
            Play Now!
          </Button>
          <Button as={Link} to="/settings" variant="outline-primary" size="lg">
            Settings
          </Button>
        </div>
      </section>

      <Card className="feature-card">
        <Card.Body>
          <Card.Title>How to Play</Card.Title>
          <ul className="feature-list">
            <li>Click one card to reveal it.</li>
            <li>Click a second card to try to make a pair.</li>
            <li>If the two cards match, they stay visible.</li>
            <li>If they do not match, they flip back after a short delay.</li>
            <li>Match all pairs to win the game!</li>
            <li>Try different difficulty levels and card sets in the settings page!</li>          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;