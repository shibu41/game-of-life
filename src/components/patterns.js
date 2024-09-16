import { generateGrid } from "./gridUtils";

export const predefinedPatterns = {
    glider: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ],
    blinkers: [[1, 1, 1]],
    toad: [
        [0, 1, 1, 1],
        [1, 1, 1, 0]
    ]
};

export const loadPattern = (patternName, numRows, numCols) => {
    const pattern = predefinedPatterns[patternName];
    if (!pattern) return generateGrid(numRows, numCols);

    const newGrid = generateGrid(numRows, numCols);
    pattern.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (r < numRows && c < numCols) {
                newGrid[r][c] = cell;
            }
        });
    });

    return newGrid;
};
