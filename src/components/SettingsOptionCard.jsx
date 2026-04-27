import { useState } from 'react';
import { Card } from 'react-bootstrap';

function SettingsOptionCard({ title, summary, description, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="feature-card settings-option-card">
      <button
        type="button"
        className="settings-option-header"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <div className="settings-option-copy">
          <h2 className="settings-option-title">{title}</h2>
          <p className="settings-option-description">{description}</p>
        </div>

        <div className="settings-option-meta">
          <span className="settings-option-summary">{summary}</span>
          <span className="settings-option-icon" aria-hidden="true">
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {isOpen && <Card.Body className="settings-option-body">{children}</Card.Body>}
    </Card>
  );
}

export default SettingsOptionCard;