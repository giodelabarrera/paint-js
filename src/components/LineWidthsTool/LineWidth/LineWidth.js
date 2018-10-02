import Component from "../../Component";
import './LineWidth.sass'

/**
 * LineWidth Component
 *
 * @class LineWidth
 * @extends {Component}
 */
class LineWidth extends Component {

  /**
   * Creates an instance of LineWidth
   * 
   * @param {Object} props - The props of the component
   * @param {number} props.width - The width or size of the line
   * @param {boolean} props.isActive - The flag value to active or deactivate
   * @param {mixed} [props.onClick] - The function to onClick event
   * @throws {Error} - Incorrect type
   * @memberof LineWidth
   */
  constructor({ width, isActive, onClick }) {
    super('button')

    if (typeof width === 'undefined') throw new Error('width is required')
    if (typeof isActive === 'undefined') throw new Error('isActive is required')

    if (typeof width !== 'number') throw new Error('width must be of type number')
    if (typeof isActive !== 'boolean') throw new Error('isActive must be of type boolean')

    this.element.classList.add('LineWidth')

    this.width = width
    this.isActive = isActive
    this.onClick = onClick

    const lineWidthIcon = document.createElement('span')
    lineWidthIcon.classList.add('LineWidth-icon')
    lineWidthIcon.style = `width: calc(5px * ${this.width}); height: calc(5px * ${this.width})`
    this.element.appendChild(lineWidthIcon)

    if (this.isActive) this.active()

    if (this.onClick) this.element.addEventListener('click', this.handleClick)
  }

  /**
   * Handler of the click
   *
   * @param {MouseEvent} event - The event
   * @memberof LineWidth
   */
  handleClick = event => {
    this.onClick(this.width)

    this.active()
  }

  /**
   * Active the element
   *
   * @memberof LineWidth
   */
  active() {
    this.isActive = true

    this.element.classList.add('is-active')
    this.element.disabled = true
  }

  /**
   * Deactive the element
   *
   * @memberof LineWidth
   */
  deactivate() {
    this.isActive = false

    this.element.classList.remove('is-active')
    this.element.disabled = false
  }
}

export default LineWidth