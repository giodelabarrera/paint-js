import Component from "../Component";

class Canvas extends Component {
  constructor(width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp) {
    super('canvas')

    this.element.width = width
    this.element.height = height

    this.painting = false

    const context = this.element.getContext('2d')
    context.strokeStyle = strokeColor

    this.onMouseDown = onMouseDown
    this.onMouseMove = onMouseMove
    this.onMouseUp = onMouseUp

    this.element.addEventListener('mousedown', this.handleMouseDown)
    this.element.addEventListener('mousemove', this.handleMouseMove)
    this.element.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown = event => {
    this.painting = true

    const coordinateX = event.clientX - this.element.offsetLeft;
    const coordinateY = event.clientY - this.element.offsetTop;

    // const context = this.element.getContext('2d')
    // context.beginPath()
    // context.moveTo(coordinateX, coordinateY)

    this.onMouseDown(this.element.getContext('2d'), coordinateX, coordinateY)
  }

  handleMouseMove = event => {
    if (this.painting) {
      const coordinateX = event.clientX - this.element.offsetLeft;
      const coordinateY = event.clientY - this.element.offsetTop;
  
      // const context = this.element.getContext('2d')

      // context.lineTo(coordinateX, coordinateY);
      // context.stroke();

      this.onMouseMove(this.element.getContext('2d'), coordinateX, coordinateY)
    }
  }

  handleMouseUp = () => {
    this.painting = false

    this.onMouseUp()
  }
}

export default Canvas