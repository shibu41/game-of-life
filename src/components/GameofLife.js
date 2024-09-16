import React, { useState, useEffect, useCallback } from 'react';
import { generateGrid, toggleCell } from './gridUtils';
import { getNextGeneration } from './getNextGeneration';
import { loadPattern, predefinedPatterns } from './patterns'; 
import './GameofLife.css'; 

const defaultSize = { numRows: 25, numCols: 25 };

const GameOfLife = () => {
  const [gridSize, setGridSize] = useState(defaultSize);
  const [grid, setGrid] = useState(() => generateGrid(defaultSize.numRows, defaultSize.numCols));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    setGrid(generateGrid(gridSize.numRows, gridSize.numCols));
  }, [gridSize]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setGrid(prevGrid => getNextGeneration(prevGrid));
    }, speed);

    return () => clearInterval(interval);
  }, [running, speed]);

  const handleCellClick = useCallback((rowIndex, colIndex) => {
    setGrid(prevGrid => toggleCell(prevGrid, rowIndex, colIndex));
  }, []);

  const handleStartStop = () => {
    setRunning(prev => !prev);
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setGridSize(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value, 10));
  };

  const handlePattern = (patternName) => {
    setGrid(loadPattern(patternName, gridSize.numRows, gridSize.numCols));
  };

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <div className="game-container">
      <div className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}>
        <div className="sidebar-controls">
          <div className="size-controls">
            <label>
              Rows:
              <input
                type="number"
                name="numRows"
                min="3"
                value={gridSize.numRows}
                onChange={handleSizeChange}
              />
            </label>
            <label>
              Cols:
              <input
                type="number"
                name="numCols"
                min="3"
                value={gridSize.numCols}
                onChange={handleSizeChange}
              />
            </label>
          </div>
          <div className="speed-controls">
            <label>
              Speed:
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={speed}
                onChange={handleSpeedChange}
              />
              <span>{speed} ms</span>
            </label>
          </div>
          <div>Patterns</div>
          <div className="pattern-buttons">
            {Object.keys(predefinedPatterns).map(patternName => (
              <button key={patternName} className="btn" onClick={() => handlePattern(patternName)}>
                Load {patternName.charAt(0).toUpperCase() + patternName.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="main-content">
        <header className="header">
          <h1>Conway's Game of Life</h1>
          <button className="btn start-stop-button" onClick={handleStartStop}>
            {running ? 'Stop' : 'Start'}
          </button>
        </header>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize.numCols}, 20px)`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`cell ${cell ? 'alive' : 'dead'}`}
              />
            ))
          )}
        </div>
      </div>
      <div className="sidebar-toggle-wrapper">
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          {sidebarVisible ? '→' : '←'}
        </button>
      </div>
    </div>
  );
};

export default GameOfLife;
