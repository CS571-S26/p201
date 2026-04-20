function BestScore({ bestScore }) {
  return (
    <div className="score-pill">
      <span className="score-label">Best Score</span>
      <span className="score-value">
        {bestScore === null ? '--' : bestScore}
      </span>
    </div>
  );
}

export default BestScore;