export const getNextGeneration = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    return grid.map((row, i) =>
        row.map((cell, j) => {
            const neighbors = [
                [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
                [i, j - 1],                 [i, j + 1],
                [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
            ].reduce((acc, [x, y]) => {
                return (x >= 0 && x < numRows && y >= 0 && y < numCols) 
                    ? acc + grid[x][y] 
                    : acc;
            }, 0);

            if (cell && (neighbors < 2 || neighbors > 3)) return 0; // Under/Overpopulation
            if (!cell && neighbors === 3) return 1; // Reproduction
            return cell;
        })
    );
};
