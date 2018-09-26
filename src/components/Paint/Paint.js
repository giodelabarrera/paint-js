import Component from "../Component";
import Canvas from "../Canvas"
import ColorPalette from "../ColorPalette";

class Paint extends Component {
  constructor(width, height, strokeColors, strokeColor) {
    super('section')

    this.canvas = new Canvas(width, height, strokeColor, this.onCanvasMouseDown, this.onCanvasMouseMove, this.onCanvasMouseUp)
    this.element.appendChild(this.canvas.element)

    if (this.canvas) {
      const colorPalette = new ColorPalette(strokeColors, strokeColor, this.onColorClick)
      this.element.appendChild(colorPalette.element)
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

  onColorClick = colorCode => {
    const context = this.canvas.element.getContext('2d')
    context.strokeStyle = colorCode
  }
}

export default Paint