import React from 'react';
import './ActionPanel.css';

const ActionPanel = ({ actions, onActionSelected }) => (
  <menu className="actions">
    {!actions.length &&
      <span>No actions available</span>
    }
    {actions.map((action, i) =>
      <button
        className="button actionButton"
        key={i}
        onClick={() => onActionSelected(action)}>
        {action}
      </button>
    )}
  </menu>
);

ActionPanel.defaultProps = {
    actions: []
};

export default ActionPanel;
