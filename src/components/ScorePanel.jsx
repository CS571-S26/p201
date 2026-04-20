import { Button, Card } from 'react-bootstrap';
import BestScore from './BestScore';

function ScorePanel({
  moves,
  matchedPairs,
  totalPairs,
  difficultyLabel,
  bestScore,
  onRestart,
}) {
  return (
    <div className="score-panel">
      <Card className="score-card">
        <Card.Body>
          <div className="score-grid">
            <div className="score-items">
              <div className="score-pill">
                <span className="score-label">Difficulty</span>
                <span className="score-value">{difficultyLabel}</span>
              </div>

              <div className="score-pill">
                <span className="score-label">Moves</span>
                <span className="score-value">{moves}</span>
              </div>

              <div className="score-pill">
                <span className="score-label">Matched Pairs</span>
                <span className="score-value">
                  {matchedPairs} / {totalPairs}
                </span>
              </div>

              <BestScore bestScore={bestScore} />
            </div>

            <Button variant="primary" onClick={onRestart}>
              Restart Game
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ScorePanel;