import React, { useState, useEffect } from "react";

const RainGrid = () => {
  const rows = 15; // Number of rows
  const cols = 20; // Number of columns
  const dropLength = 4; // Length of the raindrop
  const dropSpawnProbability = 0.02; // Lower the chance of creating new drops
  const animationInterval = 45; // Faster animation for Tetris-like speed
  const colorChangeInterval = 3000; // Change color every 3 seconds

  const [gridColors, setGridColors] = useState(
    Array.from({ length: rows + 1 }, () => Array(cols).fill(null)) // Add an extra row for fade-out
  );
  const [dropColor, setDropColor] = useState(
    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGridColors((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]); // Clone the grid

        // Process each column independently
        for (let col = 0; col < cols; col++) {
          for (let row = rows; row >= 0; row--) {
            // Include the extra row (rows + 1)
            if (newGrid[row][col]) {
              // Move the cell's color downwards if space is available
              if (row < rows && !newGrid[row + 1][col]) {
                newGrid[row + 1][col] = newGrid[row][col];
                newGrid[row][col] = null;
              } else if (row === rows) {
                // Remove the color from the last row after it "falls behind"
                newGrid[row][col] = null;
              }
            }
          }

          // Randomly add a new "raindrop" at the top
          if (Math.random() < dropSpawnProbability && !newGrid[0][col]) {
            for (let i = 0; i < dropLength && i < rows; i++) {
              if (!newGrid[i][col]) {
                newGrid[i][col] = {
                  color: dropColor,
                  opacity: 1 - i / dropLength,
                }; // Gradual fade from bottom
              }
            }
          }
        }

        return newGrid;
      });
    }, animationInterval); // Faster updates for Tetris-like movement

    return () => clearInterval(intervalId);
  }, [cols, rows, dropColor]);

  useEffect(() => {
    const colorChangeId = setInterval(() => {
      setDropColor(
        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`
      );
    }, colorChangeInterval);

    return () => clearInterval(colorChangeId);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex justify-center items-center">
      {/* Main Grid */}
      <div className="grid grid-cols-20 gap-0 relative z-10">
        {gridColors.slice(0, rows).map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="w-6 h-6 border border-gray-800 transition-all duration-50 ease-out"
                style={{
                  backgroundColor: cell?.color || "transparent",
                  opacity: cell?.opacity || 1, // Inverted fade: opacity decreases upwards
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RainGrid;