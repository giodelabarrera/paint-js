import Component from "../../Component";
import './Canvas.sass'

class Canvas extends Component {
  constructor(width, height) {
    super('canvas')

    this.element.width = width
    this.element.height = height

    this.context = this.element.getContext('2d')
    this.painting = false

    this.componentInit()
  }

  componentInit() {
    this.element.addEventListener('mousedown', this.handleMouseDown)
    this.element.addEventListener('mousemove', this.handleMouseMove)
    this.element.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown = (event) => {
    this.painting = true

    const coordinateX = event.clientX - this.element.offsetLeft;
    const coordinateY = event.clientY - this.element.offsetTop;

    this.context.beginPath()
    this.context.moveTo(coordinateX, coordinateY)
  }

  handleMouseMove = (event) => {
    if (this.painting) {
      const coordinateX = event.clientX - this.element.offsetLeft;
      const coordinateY = event.clientY - this.element.offsetTop;
  
      this.context.lineTo(coordinateX, coordinateY);
      this.context.stroke();
    }
  }

  handleMouseUp = (event) => {
    this.painting = false
  }
}

export default Canvas