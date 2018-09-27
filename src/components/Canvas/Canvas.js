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

    const coordinateX = event.pageX - this.element.offsetLeft;
    const coordinateY = event.pageY - this.element.offsetTop;

    this.onMouseDown(this.element.getContext('2d'), coordinateX, coordinateY)
  }

  handleMouseMove = event => {
    if (this.painting) {
      const coordinateX = event.pageX - this.element.offsetLeft;
      const coordinateY = event.pageY - this.element.offsetTop;

      this.onMouseMove(this.element.getContext('2d'), coordinateX, coordinateY)
    }
  }

  handleMouseUp = event => {
    this.painting = false

    const coordinateX = event.pageX - this.element.offsetLeft;
    const coordinateY = event.pageY - this.element.offsetTop;

    this.onMouseUp(this.element.getContext('2d'), coordinateX, coordinateY)
  }
}

export default Canvas