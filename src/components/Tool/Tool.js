import Component from "../Component";
import './Tool.sass'

/**
 * Tool Component
 * @class Tool
 * @extends {Component}
 */
class Tool extends Component {

  /**
   * Creates an instance of Tool Component
   * @param {Object} props - The props of the component
   * @param {Array<any>} props.children - The children
   * @memberof Tool
   */
  constructor({ children }) {
    super('section')

    if (typeof children === 'undefined') throw new Error('children is required')

    if (!Array.isArray(children)) throw new Error('children must be of type Array')

    this.element.classList.add('Tool')

    this.children = children

    children.forEach(child => this.element.appendChild(child))
  }
}

export default Tool