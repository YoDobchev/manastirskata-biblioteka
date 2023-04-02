const path = 'pictures/pic'+Number(Math.floor(Math.random() * 10) + 1)+'.jpg';
const img = new Image(900,900);
img.src = path;
img.onload = cutImageIntoPieces;


// Define variables
const pieces = [];
const canvasWidth = 900;
const canvasHeight = 900;

const canvasHolder = document.getElementById('canvas-container'); 
const canvasArray = Array.from(document.getElementById('canvas-container').children);

let sortedCanvases;

// Cut the image into 9 pieces
function cutImageIntoPieces() {
  const canvas = document.createElement('canvas');
  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

  let count = 1;
  sortedCanvases = [];
  for (let i = 1; i < canvasWidth; i += canvasWidth / 4) {
    for (let j = 1; j < canvasHeight; j += canvasHeight / 4) {
      const piece = document.getElementById('canvas' + count);
      piece.width = canvasWidth / 4;
      piece.height = canvasHeight / 4;
      piece.setAttribute('data-index', count - 1);
      const pieceCtx = piece.getContext('2d');
      pieceCtx.drawImage(canvas, i, j, canvasWidth / 4, canvasHeight / 4, 0, 0, canvasWidth / 4, canvasHeight / 4);
      pieces.push({ canvas: piece, x: i, y: j });
      
    
      sortedCanvases.push(piece);
      count++;
    }
  }
  // Shuffle the pieces
  shuffle();
}

// Shuffle the pieces randomly
function shuffle() {
  pieces.sort(() => Math.random() - 0.5);
  drawPieces();
}

// Draw the pieces in the correct position on the canvas
function drawPieces() {
  pieces.forEach((piece, index) => {

    const x = (index % 4) * (canvasWidth / 4);
    const y = Math.floor(index / 4) * (canvasHeight / 4);
    piece.canvas.style.left = x + 'px';
    piece.canvas.style.top = y + 'px';
    piece.x = x;
    piece.y = y;
    document.getElementById('canvas-container').appendChild(piece.canvas);
  });
}

let activeCanvasIndex = 0;
canvasHolder.children[activeCanvasIndex].className = 'active';

function setActiveCanvas(index) {
    canvasHolder.children[activeCanvasIndex].className = '';
    activeCanvasIndex = index;
    canvasHolder.children[activeCanvasIndex].className = 'active';
}


function swapCanvases(index1, index2){
  const canvasArray = Array.from(document.getElementById('canvas-container').children)
  
  const ctx1 = canvasArray[index1];
  const ctx2 = canvasArray[index2];
  let id1 = ctx1.id;
  let id2 = ctx2.id;
  ctx1.id = id2;
  ctx2.id = id1;

  // Create a temporary canvas to hold the contents of canvas1
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = canvasArray[index1].width;
  tempCanvas.height = canvasArray[index1].height;
  tempCtx.drawImage(canvasArray[index1], 0, 0);

  // Copy the contents of canvas2 to canvas1
  ctx1.getContext('2d').drawImage(canvasArray[index2], 0, 0);


  // Copy the contents of the temporary canvas to canvas2
  ctx2.getContext('2d').drawImage(tempCanvas, 0, 0);
}


function handleKeyDown(event) {
      
  switch (event.key) {
    case "ArrowUp":
      if (activeCanvasIndex >= 4) {
        setActiveCanvas(activeCanvasIndex - 4);
        if (event.shiftKey) {
          swapCanvases(activeCanvasIndex+4, activeCanvasIndex);
        }
      }
      break;
    case "ArrowDown":
      if (activeCanvasIndex < 12) {
        setActiveCanvas(activeCanvasIndex + 4);
        if (event.shiftKey){
          swapCanvases(activeCanvasIndex-4, activeCanvasIndex);
        } 
        
      }
      break;
    case "ArrowLeft":
      if (activeCanvasIndex % 4 !== 0) {
        setActiveCanvas(activeCanvasIndex - 1);
        if (event.shiftKey) {
          swapCanvases(activeCanvasIndex+1, activeCanvasIndex);
        }
      }
      break;
    case "ArrowRight":
      if ((activeCanvasIndex + 1) % 4 !== 0) {
        setActiveCanvas(activeCanvasIndex + 1);
      
        if (event.shiftKey) {
          swapCanvases(activeCanvasIndex-1, activeCanvasIndex);
        }
      }
      break;
    }
}

let mouseDown = false;
let startMouseX, startMouseY;

function handleMouseDown(event) {
  event.preventDefault();
  mouseDown = true;
  startMouseX = event.pageX - canvasHolder.offsetLeft;
  startMouseY = event.pageY - canvasHolder.offsetTop;
  dragStartIndex = parseInt(event.target.dataset.index);
}

function handleMouseMove(event) {
  event.preventDefault();

  if (mouseDown) {
    const canvasArray = Array.from(canvasHolder.children);
    const dragEndIndex = parseInt(event.target.dataset.index);
    const currentMouseX = event.pageX - canvasHolder.offsetLeft;
    const currentMouseY = event.pageY - canvasHolder.offsetTop;

    // Calculate the difference between the start mouse position and the current mouse position
    const diffX = currentMouseX - startMouseX;
    const diffY = currentMouseY - startMouseY;

    // Move the dragged canvas to the new position
    canvasArray[dragStartIndex].style.left = `${canvasArray[dragStartIndex].offsetLeft + diffX}px`;
    canvasArray[dragStartIndex].style.top = `${canvasArray[dragStartIndex].offsetTop + diffY}px`;

    // Swap canvases if the dragged canvas overlaps with another canvas
    for (let i = 0; i < canvasArray.length; i++) {
      if (i !== dragStartIndex) {
        const canvasRect = canvasArray[i].getBoundingClientRect();
        if (
          currentMouseX > canvasRect.left &&
          currentMouseX < canvasRect.right &&
          currentMouseY > canvasRect.top &&
          currentMouseY < canvasRect.bottom
        ) {
          swapCanvases(dragStartIndex, i);
          dragStartIndex = i;
          break;
        }
      }
    }
  }
}

function handleMouseUp() {
  mouseDown = false;
}


canvasHolder.addEventListener('mousedown', handleMouseDown);
canvasHolder.addEventListener('mousemove', handleMouseMove);
canvasHolder.addEventListener('mouseup', handleMouseUp);
window.addEventListener('keydown', handleKeyDown);
document.getElementById('check-puzzle').addEventListener('click', onClick);

function onClick(event){
  let trav = [
    0,4, 8, 12,1,5,9,13,2,6,10,14,3,7,11,15
  ];
  let t = true;
  console.log(canvasHolder.children);

 
  for (let i = 0; i < 16; ++i){
    console.log(canvasHolder.children[i].id, 'canvas'+Number(i+1));
    if (canvasHolder.children[i].id !== 'canvas'+Number(1+trav[i])){
      t=false;
      //break;
    }
  }
  isValid(t)
}

function isValid(bool){
  if (bool) {
    console.log('equal');
  }
  else {
    console.log('not equal');
  }
}



