import Component from "../Component";
import Canvas from "./Canvas"
import Color from "./Color";
import ColorTool from "./ColorTool";

class Paint extends Component {
  constructor() {
    super('section')

    const canvas = new Canvas(500, 500, this.onCanvasMouseDown, this.onCanvasMouseMove, this.onCanvasMouseUp)
    this.element.appendChild(canvas.element)
  }

  onCanvasMouseDown(context, coordinateX, coordinateY) {
    context.beginPath()
    context.moveTo(coordinateX, coordinateY)
  }

  onCanvasMouseMove(context, coordinateX, coordinateY) {
    context.lineTo(coordinateX, coordinateY);
    context.stroke();
  }

  onCanvasMouseUp() {
    alert('finish')
  }
}

export default Paint