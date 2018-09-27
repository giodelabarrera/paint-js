import Component from "../Component";
import Canvas from "../Canvas"
import ColorList from "../ColorList";
import LineWeightList from "../LineWeightList";
import ActionButton from "../ActionButton";

class Paint extends Component {
  constructor(width, height, colors, defaultColor, weights, defaultWeight) {
    super('section')

    this.width = width
    this.height = height
    // this.colors = colors
    // this.defaultColor = defaultColor
    // this.weights = weights
    // this.defaultWeight = defaultWeight

    this.strokes = []
    this.currentStroke = {}
    this.strokePosition = 0

    this.canvas = new Canvas(
      this.width,
      this.height,
      defaultColor,
      this.onCanvasMouseDown,
      this.onCanvasMouseMove,
      this.onCanvasMouseUp
    )
    this.element.appendChild(this.canvas.element)

    if (this.canvas) {

      const actionButtonsContainer = document.createElement('div')

      const undoContent = document.createElement('span')
      undoContent.innerText = 'undo'
      this.undoButton = new ActionButton([undoContent], false, this.onUndoClick)
      
      actionButtonsContainer.appendChild(this.undoButton.element)
      
      const redoContent = document.createElement('span')
      redoContent.innerText = 'redo'
      this.redoButton = new ActionButton([redoContent], false, this.onRedoClick)
      
      actionButtonsContainer.appendChild(this.redoButton.element)

      this.element.appendChild(actionButtonsContainer)

      const colorList = new ColorList(colors, defaultColor, this.onColorClick)
      this.element.appendChild(colorList.element)

      const lineWeightList = new LineWeightList(weights, defaultWeight, this.onLineWeightClick)
      this.element.appendChild(lineWeightList.element)
    }
  }

  onCanvasMouseDown = (context, coordinateX, coordinateY) => {
    context.beginPath()
    context.moveTo(coordinateX, coordinateY)

    this.currentStroke.color = context.strokeStyle;
    this.currentStroke.width = context.lineWidth;
    this.currentStroke.coordinates = [];
    this.currentStroke.coordinates.push({ x: coordinateX, y: coordinateY });
  }

  onCanvasMouseMove = (context, coordinateX, coordinateY) => {
    context.lineTo(coordinateX, coordinateY);
    context.stroke();

    this.currentStroke.coordinates.push({ x: coordinateX, y: coordinateY });
  }

  onCanvasMouseUp = () => {
    if (!this.undoButton.isEnable) {
      this.strokes = []

      this.redoButton.disable()
      // isBtnRedoActive = false;
      // btnRedo.disabled = true;
    }

    this.strokes.push(this.currentStroke)
    this.currentStroke = {}

    this.strokePosition = this.strokes.length - 1;

    this.undoButton.enable()
  }

  onColorClick = code => {
    const context = this.canvas.element.getContext('2d')
    context.strokeStyle = code
  }

  onLineWeightClick = weight => {
    const context = this.canvas.element.getContext('2d')
    context.lineWidth = weight
  }

  onUndoClick = isEnable => {
    if (isEnable) {
      const context = this.canvas.element.getContext('2d')
      
      context.save();
  
      context.clearRect(0, 0, this.width, this.height);
  
      this.strokePosition--
  
      if (this.strokePosition === -1) this.undoButton.disable()
  
      this.redoButton.enable()
      // isBtnRedoActive = true;
      // btnRedo.disabled = false;
  
      for (let strokeIndex = 0; strokeIndex <= this.strokePosition; strokeIndex++) {
        const stroke = this.strokes[strokeIndex]
  
        context.strokeStyle = stroke.color
        context.lineWidth = stroke.width
  
        stroke.coordinates.forEach((coordinate, coordinateIndex) => {
          if (coordinateIndex === 0) {
            context.beginPath()
            context.moveTo(coordinate.x, coordinate.y)
          }
          else {
            context.lineTo(coordinate.x, coordinate.y)
            context.stroke()
          }
        })
      }
  
      context.restore()
    }
  }

  onRedoClick = isEnable => {
    if (isEnable) {
      const context = this.canvas.element.getContext('2d')

      context.save();
  
      this.strokePosition++;
  
      if (this.strokePosition + 1 === this.strokes.length) this.redoButton.disable()
  
      this.undoButton.enable()
  
      const stroke = this.strokes[this.strokePosition];
  
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
  }
}

export default Paint