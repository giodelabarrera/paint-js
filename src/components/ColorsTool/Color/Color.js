import Component from "../../Component";
import './Color.sass'

/**
 * Color Component
 *
 * @class Color
 * @extends {Component}
 */
class Color extends Component {
  
  /**
   * Creates an instance of Color
   * 
   * @param {Object} props - The props of the component
   * @param {string} props.code - The color code
   * @param {boolean} props.isActive - The flag value to active or deactivate
   * @param {mixed} [props.onClick] - The function to onClick event
   * @throws {Error} - Incorrect type
   * @memberof Color
   */
  constructor({ code, isActive, onClick }) {
    super('button')

    if (typeof code === 'undefined') throw new Error('code is required')
    if (typeof isActive === 'undefined') throw new Error('isActive is required')

    if (typeof code !== 'string') throw new Error('code must be of type string')
    if (typeof isActive !== 'boolean') throw new Error('isActive must be of type boolean')

    this.element.classList.add('Color')

    this.code = code
    this.isActive = isActive
    this.onClick = onClick

    const colorIcon = document.createElement('span')
    colorIcon.classList.add('Color-icon')
    colorIcon.style = `background-color: ${this.code}`
    this.element.appendChild(colorIcon)

    if (this.isActive) this.active()

    if (this.onClick) this.element.addEventListener('click', this.handleClick)
  }

  /**
   * Handler of the click
   *
   * @param {MouseEvent} event - The event
   * @memberof Color
   */
  handleClick = event => {
    this.onClick(this.code)

    this.active()
  }

  /**
   * Active the element
   *
   * @memberof Color
   */
  active() {
    this.isActive = true

    this.element.classList.add('is-active')
    this.element.disabled = true
  }

  /**
   * Deactive the element
   *
   * @memberof Color
   */
  deactivate() {
    this.isActive = false

    this.element.classList.remove('is-active')
    this.element.disabled = false
  }
}

export default Color