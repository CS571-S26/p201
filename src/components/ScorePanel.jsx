import { Button, Card } from 'react-bootstrap';
import BestScore from './BestScore';
import TimerDisplay from './TimerDisplay';

function ScorePanel({
  moves,
  matchedPairs,
  totalPairs,
  difficultyLabel,
  cardSetLabel,
  bestScore,
  secondsElapsed,
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
                <span className="score-label">Card Set</span>
                <span className="score-value">{cardSetLabel}</span>
              </div>

              <TimerDisplay secondsElapsed={secondsElapsed} />

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