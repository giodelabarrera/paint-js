import Component from "../Component";
import Canvas from "../Canvas"
import ColorList from "../ColorList";
import LineWeightList from "../LineWeightList";

class Paint extends Component {
  constructor(width, height, colors, defaultColor, weights, defaultWeight) {
    super('section')

    // this.width = width
    // this.height = height
    // this.colors = colors
    // this.defaultColor = defaultColor
    // this.weights = weights
    // this.defaultWeight = defaultWeight

    this.canvas = new Canvas(
      width,
      height,
      defaultColor,
      this.onCanvasMouseDown,
      this.onCanvasMouseMove,
      this.onCanvasMouseUp
    )
    this.element.appendChild(this.canvas.element)

    if (this.canvas) {
      const colorList = new ColorList(colors, defaultColor, this.onColorClick)
      this.element.appendChild(colorList.element)

      const lineWeightList = new LineWeightList(weights, defaultWeight, this.onLineWeightClick)
      this.element.appendChild(lineWeightList.element)
    }
  }

  onCanvasMouseDown(context, coordinateX, coordinateY) {
    context.beginPath()
    context.moveTo(coordinateX, coordinateY)
  }

  onCanvasMouseMove(context, coordinateX, coordinateY) {
    context.lineTo(coordinateX, coordinateY);
    context.stroke();
  }

  onCanvasMouseUp() { }

  onColorClick = code => {
    const context = this.canvas.element.getContext('2d')
    context.strokeStyle = code
  }
  
  onLineWeightClick = weight => {
    const context = this.canvas.element.getContext('2d')
    context.lineWidth = weight
  }
}

export default Paint