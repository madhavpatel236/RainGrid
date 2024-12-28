// import React, { useState, useEffect } from "react";

// const RainGrid = () => {
//   const rows = 15; // Number of rows
//   const cols = 20; // Number of columns

//   // Initialize the grid with all null values
//   const [gridColors, setGridColors] = useState(
//     Array.from({ length: rows + 1 }, () => Array(cols).fill(null)) // Add an extra row for the "fade-out"
//   );

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setGridColors((prevGrid) => {
//         const newGrid = prevGrid.map((row) => [...row]); // Clone the grid

//         // Process each column independently
//         for (let col = 0; col < cols; col++) {
//           for (let row = rows; row >= 0; row--) { // Include the extra row (rows + 1)
//             if (newGrid[row][col]) {
//               // Move the cell's color downwards if space is available
//               if (row < rows && !newGrid[row + 1][col]) {
//                 newGrid[row + 1][col] = newGrid[row][col];
//                 newGrid[row][col] = null;
//               } else if (row === rows) {
//                 // Remove the color from the last row after it "falls behind"
//                 newGrid[row][col] = null;
//               }
//             }
//           }

//           // Randomly add a new "rain drop" at the top
//           if (Math.random() < 0.1 && !newGrid[0][col]) {
//             const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//               Math.random() * 256
//             )}, ${Math.floor(Math.random() * 256)})`;
//             newGrid[0][col] = randomColor;
//           }
//         }

//         return newGrid;
//       });
//     }, 50); // Faster updates (50ms instead of 200ms)

//     return () => clearInterval(intervalId);
//   }, [cols, rows]);

//   return (
//     <div className="relative w-full h-screen bg-black overflow-hidden">
//       {/* Futuristic Neon Background */}
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-700 opacity-80">
//         {/* Neon Glowing Lines */}
//         <div className="absolute top-0 left-0 w-full h-full animate-glowing-lines">
//           <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 animate-line"></div>
//           <div className="w-full h-1 bg-gradient-to-r from-pink-400 to-yellow-500 animate-line"></div>
//         </div>
//         {/* Animated Particles */}
//         <div className="absolute top-0 left-0 w-full h-full animate-particles">
//           {Array.from({ length: 200 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="w-2 h-2 bg-white opacity-15 rounded-full animate-pulse"
//               style={{
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${Math.random() * 2 + 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Main Grid with Falling Neon Drops */}
//       <div className="grid grid-cols-20 gap-0 relative z-10">
//         {gridColors.slice(0, rows).map((row, rowIndex) => (
//           <div key={rowIndex} className="flex">
//             {row.map((color, colIndex) => (
//               <div
//                 key={colIndex}
//                 className="w-6 h-6 border border-gray-800 transition-all duration-100 ease-out"
//                 style={{
//                   backgroundColor: color || "transparent",
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RainGrid;


import React, { useState, useEffect } from "react";

const RainGrid = () => {
  const rows = 15; // Number of rows
  const cols = 20; // Number of columns

  // Initialize the grid with all null values
  const [gridColors, setGridColors] = useState(
    Array.from({ length: rows + 1 }, () => Array(cols).fill(null)) // Add an extra row for the "fade-out"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGridColors((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]); // Clone the grid

        // Process each column independently
        for (let col = 0; col < cols; col++) {
          for (let row = rows; row >= 0; row--) { // Include the extra row (rows + 1)
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

          // Randomly add a new "rain drop" at the top
          if (Math.random() < 0.1 && !newGrid[0][col]) {
            const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`;
            newGrid[0][col] = randomColor;
          }
        }

        return newGrid;
      });
    }, 50); // Faster updates (50ms instead of 200ms)

    return () => clearInterval(intervalId);
  }, [cols, rows]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex justify-center items-center">
      {/* Futuristic Neon Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-700 opacity-80">
        {/* Neon Glowing Lines */}
        <div className="absolute top-0 left-0 w-full h-full animate-glowing-lines">
          <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 animate-line"></div>
          <div className="w-full h-1 bg-gradient-to-r from-pink-400 to-yellow-500 animate-line"></div>
        </div>
        {/* Animated Particles */}
        <div className="absolute top-0 left-0 w-full h-full animate-particles">
          {Array.from({ length: 200 }).map((_, idx) => (
            <div
              key={idx}
              className="w-2 h-2 bg-white opacity-15 rounded-full animate-pulse"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Grid with Falling Neon Drops */}
      <div className="grid grid-cols-20 gap-0 relative z-10">
        {gridColors.slice(0, rows).map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="w-6 h-6 border border-gray-800 transition-all duration-100 ease-out"
                style={{
                  backgroundColor: color || "transparent",
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
