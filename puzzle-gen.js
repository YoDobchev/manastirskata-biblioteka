function generatePuzzle(image) {
    // Define the number of rows and columns in the puzzle
    const numRows = 3;
    const numCols = 3;
  
    // Calculate the size of each piece
    const pieceWidth = image.width / numCols;
    const pieceHeight = image.height / numRows;
  
    // Create the puzzle pieces
    const pieces = [];
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        const piece = {
          x: i * pieceWidth,
          y: j * pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          imageX: i * pieceWidth,
          imageY: j * pieceHeight,
          index: j * numCols + i
        };
        pieces.push(piece);
      }
    }
    console.log('in')
    // Shuffle the pieces
    shuffle(pieces);
  
    // Return the puzzle pieces
    return pieces;
}
  
// Shuffle function
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
  
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}


const img = new Image();
img.src = './pictures/nature.jpg';

const arr = generatePuzzle(img);
console.log(arr)
export {generatePuzzle};