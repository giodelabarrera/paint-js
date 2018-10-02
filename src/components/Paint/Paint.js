import Component from "../Component";
import Canvas from "../Canvas"
import ColorsTool from "../ColorsTool";
import LineWidthsTool from "../LineWidthsTool";
import ActionButton from "../ActionButton";
import Tool from "../Tool";
import './Paint.sass'

class Paint extends Component {
  constructor(width, height, colors, defaultColor, lineWidths, defaultLineWidth) {
    super('section')

    // if (typeof width !== 'number') throw new Error('width must be of type number')
    // if (typeof height !== 'number') throw new Error('height must be of type number')
    // if (!Array.isArray(colors)) throw new Error('colors must be of type Array')
    // if (typeof defaultColor !== 'string') throw new Error('defaultColor must be of type string')
    // if (!Array.isArray(lineWidths)) throw new Error('lineWidths must be of type Array')
    // if (typeof defaultLineWidth !== 'string') throw new Error('defaultLineWidth must be of type string')

    this.element.classList.add('Paint')

    this.width = width
    this.height = height

    this.strokes = []
    this.currentStroke = {}
    this.strokePosition = 0

    const canvasWrapper = document.createElement('section')
    canvasWrapper.classList.add('Paint-canvasWrapper')

    this.canvas = new Canvas(
      this.width,
      this.height,
      defaultColor,
      this.onCanvasMouseDown,
      this.onCanvasMouseMove,
      this.onCanvasMouseUp
    )
    canvasWrapper.appendChild(this.canvas.element)

    this.element.appendChild(canvasWrapper)

    if (this.canvas) {

      const toolsWrapper = document.createElement('section')
      toolsWrapper.classList.add('Paint-toolsWrapper')

      // undo button
      const undoContent = document.createElement('i')
      undoContent.className = 'action-button-content far fa-arrow-alt-circle-left'
      this.undoButton = new ActionButton([undoContent], false, this.onUndoClick)

      // redo button
      const redoContent = document.createElement('i')
      redoContent.className = 'action-button-content far fa-arrow-alt-circle-right'
      this.redoButton = new ActionButton([redoContent], false, this.onRedoClick)
      
      const actionButtonsContainer = new Tool([this.undoButton.element, this.redoButton.element])
      toolsWrapper.appendChild(actionButtonsContainer.element)

      // colors tool
      const colorsTool = new ColorsTool(colors, defaultColor, this.onColorClick)
      
      const colorsToolContainer = new Tool([colorsTool.element])
      toolsWrapper.appendChild(colorsToolContainer.element)

      // line widths tool
      const lineWidthsTool = new LineWidthsTool(lineWidths, defaultLineWidth, this.onLineWidthClick)

      const lineWidthsContainer = new Tool([lineWidthsTool.element])
      toolsWrapper.appendChild(lineWidthsContainer.element)
      
      this.element.appendChild(toolsWrapper)
    }
  }

  onCanvasMouseDown = (context, coordinateX, coordinateY) => {
    context.beginPath()
    context.moveTo(coordinateX, coordinateY)

    this.currentStroke.color = context.strokeStyle
    this.currentStroke.width = context.lineWidth
    this.currentStroke.coordinates = []
    this.currentStroke.coordinates.push({ x: coordinateX, y: coordinateY })
  }

  onCanvasMouseMove = (context, coordinateX, coordinateY) => {
    context.lineTo(coordinateX, coordinateY)
    context.stroke()

    this.currentStroke.coordinates.push({ x: coordinateX, y: coordinateY })
  }

  onCanvasMouseUp = (context, coordinateX, coordinateY) => {
    if (this.isStrokeAPixel(this.currentStroke)) {
      coordinateX--
      coordinateY--

      context.lineTo(coordinateX, coordinateY)
      context.stroke()

      this.currentStroke.coordinates.push({ x: coordinateX, y: coordinateY })
    }

    if (this.isNewStrokeAfterUndo(this.strokePosition, this.strokes)) {
      this.strokes.splice(this.strokePosition + 1, this.strokes.length - (this.strokePosition + 1))
    }

    this.strokes.push(this.currentStroke)

    this.strokePosition = this.strokes.length - 1;

    this.currentStroke = {}

    this.undoButton.enable()
    this.redoButton.disable()
  }

  onColorClick = code => {
    const context = this.canvas.element.getContext('2d')
    context.strokeStyle = code
  }

  onLineWidthClick = width => {
    const context = this.canvas.element.getContext('2d')
    context.lineWidth = width
  }

  onUndoClick = isEnable => {
    if (isEnable) {
      const context = this.canvas.element.getContext('2d')

      context.save()

      context.clearRect(0, 0, this.width, this.height)

      this.strokePosition--

      if (this.strokePosition === -1) this.undoButton.disable()

      this.redoButton.enable()

      for (let index = 0; index <= this.strokePosition; index++) {
        const stroke = this.strokes[index]

        context.strokeStyle = stroke.color
        context.lineWidth = stroke.width

        this.drawCoordinates(stroke.coordinates, context)
      }

      context.restore()
    }
  }

  onRedoClick = isEnable => {
    if (isEnable) {
      const context = this.canvas.element.getContext('2d')

      context.save()

      this.strokePosition++

      if (this.strokePosition === this.strokes.length - 1) this.redoButton.disable()

      this.undoButton.enable()

      const stroke = this.strokes[this.strokePosition]

      context.strokeStyle = stroke.color
      context.lineWidth = stroke.width

      this.drawCoordinates(stroke.coordinates, context)

      context.restore()
    }
  }

  isStrokeAPixel(stroke) {
    return stroke.coordinates.length === 1
  }

  isNewStrokeAfterUndo(strokePosition, strokes) {
    return strokes.length > 0 && strokePosition !== strokes.length - 1
  }

  drawCoordinates(coordinates, context) {
    coordinates.forEach((coordinate, index) => {
      if (index === 0) {
        context.beginPath()
        context.moveTo(coordinate.x, coordinate.y)
      }
      else {
        context.lineTo(coordinate.x, coordinate.y)
        context.stroke()
      }
    })
  }
}

export default Paint