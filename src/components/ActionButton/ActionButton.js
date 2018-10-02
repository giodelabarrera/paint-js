import Component from "../Component"
import './ActionButton.sass'

/**
 * ActionButton Component
 * @class ActionButton
 * @extends {Component}
 */
class ActionButton extends Component {

  /**
   * Creates an instance of ActionButton Component
   * @param {Object} props - The props of the component
   * @param {Array<any>} props.children - The children
   * @param {boolean} props.isEnable - The flag value to enable or disable
   * @param {mixed} [props.onClick] - The function to onClick event
   * @memberof ActionButton
   */
  constructor({ children, isEnable, onClick }) {
    super('button')

    if (typeof children === 'undefined') throw new Error('children is required')
    if (typeof isEnable === 'undefined') throw new Error('isEnable is required')

    if (!Array.isArray(children)) throw new Error('children must be of type Array')
    if (typeof isEnable !== 'boolean') throw new Error('isEnable must be of type boolean')

    this.element.classList.add('ActionButton')

    children.forEach(child => this.element.appendChild(child))

    this.element.disabled = true

    this.children = children
    this.isEnable = isEnable
    this.onClick = onClick

    if (this.isEnable) this.enable()

    if (this.onClick) this.element.addEventListener('click', this.handleClick)
  }

  /**
   * Handler of the click
   * @param {Event} event - The Event
   * @memberof ActionButton
   */
  handleClick = event => {
    this.onClick(this.isEnable)
  }

  /**
   * Enable the element
   *
   * @memberof ActionButton
   */
  enable() {
    this.isEnable = true

    this.element.classList.add('is-enable')
    this.element.disabled = false
  }

  /**
   * Disable the element
   *
   * @memberof ActionButton
   */
  disable() {
    this.isEnable = false

    this.element.classList.remove('is-enable')
    this.element.disabled = true
  }
}

export default ActionButton