import Component from "../Component";
import Color from "./Color";
import './ColorsTool.sass'

/**
 * ColorsTool Component
 *
 * @class ColorsTool
 * @extends {Component}
 */
class ColorsTool extends Component {

  /**
   * Creates an instance of ColorsTool
   * @param {Object} props - The props of the component
   * @param {Array<string>} props.codes - The array of color codes
   * @param {string} props.defaultCode - The default color code
   * @param {mixed} [props.onColorClick] - The function to Color onClick event
   * @throws {Error} - Incorrect type
   * @memberof ColorsTool
   */
  constructor({ codes, defaultCode, onColorClick }) {
    super('section')

    if (typeof codes === 'undefined') throw new Error('codes is required')
    if (typeof defaultCode === 'undefined') throw new Error('defaultCode is required')

    if (!Array.isArray(codes)) throw new Error('codes must be of type Array')
    if (typeof defaultCode !== 'string') throw new Error('defaultCode must be of type string')

    this.element.classList.add('ColorsTool')

    this.codes = codes
    this.defaultCode = defaultCode
    this.onColorClick = onColorClick

    this.colors = []

    this.codes.forEach(code => {
      const isActive = code === this.defaultCode

      const onClick = this.onColorClick ? this.handleColorClick : undefined

      const color = new Color({ code, isActive, onClick })
      this.colors.push(color)

      this.element.appendChild(color.element)
    })
  }

  /**
   * Handler of the color click
   *
   * @param {string} code - The color code
   */
  handleColorClick = code => {
    this.colors.forEach(color => color.deactivate())

    this.onColorClick(code)
  }
}

export default ColorsTool