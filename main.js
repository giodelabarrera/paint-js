let draw = false;
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');

const btnBlack = document.getElementById('btn-black');
const btnRed = document.getElementById('btn-red');

const lineSM = document.getElementById('line-sm');
const lineMD = document.getElementById('line-md');
const lineXL = document.getElementById('line-xl');

let strokes = [];
let stroke = {};
let strokePosition = 0;

let isBtnUndoActive = false;
btnUndo.disabled = true;

let isBtnRedoActive = false;
btnRedo.disabled = true;

// MOUSE

canvas.addEventListener('mousedown', function (event) {
  draw = true;

  const coordinateX = event.clientX - this.offsetLeft;
  const coordinateY = event.clientY - this.offsetTop;

  context.beginPath();
  context.moveTo(coordinateX, coordinateY);

  stroke.color = context.strokeStyle;
  stroke.width = context.lineWidth;
  stroke.coordinates = [];
  stroke.coordinates.push({ x: coordinateX, y: coordinateY });
});

canvas.addEventListener('mousemove', function (event) {
  if (draw) {
    const coordinateX = event.clientX - this.offsetLeft;
    const coordinateY = event.clientY - this.offsetTop;

    context.lineTo(coordinateX, coordinateY);
    context.stroke();

    stroke.coordinates.push({ x: coordinateX, y: coordinateY });
  }
})

canvas.addEventListener('mouseup', function (event) {
  draw = false

  if (!isBtnUndoActive) {
    strokes = [];

    isBtnRedoActive = false;
    btnRedo.disabled = true;
  }

  strokes.push(stroke);
  stroke = {};

  strokePosition = strokes.length - 1;

  isBtnUndoActive = true;
  btnUndo.disabled = false;

  console.log(strokes);
})

// COLORS

btnBlack.addEventListener('click', function (e) {
  context.strokeStyle = 'black';
});

btnRed.addEventListener('click', function (e) {
  context.strokeStyle = 'red';
});

// LINE

lineSM.addEventListener('click', function (e) {
  context.lineWidth = 0.2;
});

lineMD.addEventListener('click', function (e) {
  context.lineWidth = 1;
});

lineXL.addEventListener('click', function (e) {
  context.lineWidth = 5;
});

// HISTORY

btnUndo.addEventListener('click', function (e) {
  if (isBtnUndoActive) {
    context.save();

    context.clearRect(0, 0, canvas.width, canvas.height);

    strokePosition--

    if (strokePosition === -1) {
      isBtnUndoActive = false;
      btnUndo.disabled = true;
    }

    isBtnRedoActive = true;
    btnRedo.disabled = false;

    for (let strokeIndex = 0; strokeIndex <= strokePosition; strokeIndex++) {
      const stroke = strokes[strokeIndex];

      context.strokeStyle = stroke.color
      context.lineWidth = stroke.width;

      stroke.coordinates.forEach((coordinate, coordinateIndex) => {
        if (coordinateIndex === 0) {
          context.beginPath();
          context.moveTo(coordinate.x, coordinate.y);
        }
        else {
          context.lineTo(coordinate.x, coordinate.y);
          context.stroke();
        }
      });
    }

    context.restore();
  }
});

btnRedo.addEventListener('click', function (e) {
  if (isBtnRedoActive) {
    context.save();

    strokePosition++;

    if (strokePosition + 1 === strokes.length) {
      isBtnRedoActive = false;
      btnRedo.disabled = true;
    }

    isBtnUndoActive = true;
    btnUndo.disabled = false;

    const stroke = strokes[strokePosition];

    context.strokeStyle = stroke.color
    context.lineWidth = stroke.width;

    stroke.coordinates.forEach((coordinate, coordinateIndex) => {
      if (coordinateIndex === 0) {
        context.beginPath();
        context.moveTo(coordinate.x, coordinate.y);
      }
      else {
        context.lineTo(coordinate.x, coordinate.y);
        context.stroke();
      }
    });

    context.restore();
  }
});