import React from 'react';
import { predefinedPatterns } from './patterns';
import './Sidebar.css';

const Sidebar = ({ onPatternLoad }) => (
  <div className="sidebar">
    <h2>Patterns</h2>
    <div className="pattern-buttons">
      {Object.keys(predefinedPatterns).map(patternName => (
        <button
          key={patternName}
          onClick={() => onPatternLoad(patternName)}
        >
          Load {patternName}
        </button>
      ))}
    </div>
  </div>
);

export default Sidebar;
