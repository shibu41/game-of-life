export const generateGrid = (numRows, numCols) =>
    Array.from({ length: numRows }, () => Array(numCols).fill(0));

export const toggleCell = (grid, rowIndex, colIndex) =>
    grid.map((row, i) =>
        row.map((cell, j) => (i === rowIndex && j === colIndex ? 1 - cell : cell))
    );
