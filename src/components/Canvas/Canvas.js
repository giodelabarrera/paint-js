import Component from "../Component";

/**
 * Canvas Component
 * @class Canvas
 * @extends {Component}
 */
class Canvas extends Component {

  /**
   * Creates an instance of Canvas
   * 
   * @param {Object} props - The props of the component
   * @param {number} props.width - The width of the element
   * @param {number} props.height - The height of the element
   * @param {string} [strokeColor] - The stroke color
   * @param {mixed} [onMouseDown] - The function to mouse down event
   * @param {mixed} [onMouseMove] - The function to mouse move event 
   * @param {mixed} [onMouseUp] - The function to mouse up event 
   * @throws {Error} - Incorrect type
   * @memberof Canvas
   */
  constructor({ width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp }) {
    super('canvas')

    if (typeof width === 'undefined') throw new Error('width is required')
    if (typeof height === 'undefined') throw new Error('height is required')

    if (typeof width !== 'number') throw new Error('width must be of type number')
    if (typeof height !== 'number') throw new Error('height must be of type number')

    if (strokeColor && typeof strokeColor !== 'string') throw new Error('strokeColor must be of type string')

    this.element.classList.add('Canvas')

    this.element.width = width
    this.element.height = height

    this.width = width
    this.height = height
    this.strokeColor = strokeColor
    this.onMouseDown = onMouseDown
    this.onMouseMove = onMouseMove
    this.onMouseUp = onMouseUp

    if (!this.strokeColor) this.strokeColor = '#000000'

    this.painting = false

    const context = this.element.getContext('2d')
    context.strokeStyle = this.strokeColor
    context.lineCap = 'round'
    context.lineJoin = 'round'

    if (this.onMouseDown) this.element.addEventListener('mousedown', this.handleMouseDown)
    if (this.onMouseMove) this.element.addEventListener('mousemove', this.handleMouseMove)
    if (this.onMouseUp) this.element.addEventListener('mouseup', this.handleMouseUp)
  }

  /**
   * Handler mouse down
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
  handleMouseDown = event => {
    this.painting = true

    const coordinateX = event.pageX - this.element.offsetLeft;
    const coordinateY = event.pageY - this.element.offsetTop;

    this.onMouseDown(this.element.getContext('2d'), coordinateX, coordinateY)
  }

  /**
   * Handler mouse move
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
  handleMouseMove = event => {
    if (this.painting) {
      const coordinateX = event.pageX - this.element.offsetLeft;
      const coordinateY = event.pageY - this.element.offsetTop;

      this.onMouseMove(this.element.getContext('2d'), coordinateX, coordinateY)
    }
  }

  /**
   * Handler mouse up
   * @param {MouseEvent} event - The event
   * @memberof Canvas
   */
  handleMouseUp = event => {
    this.painting = false

    const coordinateX = event.pageX - this.element.offsetLeft;
    const coordinateY = event.pageY - this.element.offsetTop;

    this.onMouseUp(this.element.getContext('2d'), coordinateX, coordinateY)
  }
}

export default Canvas