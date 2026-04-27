function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function TimerDisplay({ secondsElapsed }) {
  return (
    <div className="score-pill timer-pill">
      <span className="score-label">Time</span>
      <span className="score-value">{formatTime(secondsElapsed)}</span>
    </div>
  );
}

export default TimerDisplay;