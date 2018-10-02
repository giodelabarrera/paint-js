import Component from "../Component";
import LineWidth from "./LineWidth";
import './LineWidthsTool.sass'

/**
 * LineWidthsTool Component
 *
 * @class LineWidthsTool
 * @extends {Component}
 */
class LineWidthsTool extends Component {

  /**
   * Creates an instance of LineWidthsTool
   * @param {Object} props - The props of the component
   * @param {Array<number>} props.widths - The array of line widths
   * @param {number} props.defaultWidth - The default width
   * @param {mixed} [props.onLineWidthClick] - The function to LineWidth onClick event
   * @throws {Error} - Incorrect type
   * @memberof LineWidthsTool
   */
  constructor({ widths, defaultWidth, onLineWidthClick }) {
    super('section')

    if (typeof widths === 'undefined') throw new Error('widths is required')
    if (typeof defaultWidth === 'undefined') throw new Error('defaultWidth is required')

    if (!Array.isArray(widths)) throw new Error('widths must be of type Array')
    if (typeof defaultWidth !== 'number') throw new Error('defaultWidth must be of type number')

    this.element.classList.add('LineWidthsTool')

    this.widths = widths
    this.defaultWidth = defaultWidth
    this.onLineWidthClick = onLineWidthClick

    this.lineWidths = []

    this.widths.forEach(width => {
      const isActive = width === this.defaultWidth

      const onClick = this.onLineWidthClick ? this.handleLineWidthClick : undefined

      const lineWidth = new LineWidth({ width, isActive, onClick })
      this.lineWidths.push(lineWidth)

      this.element.appendChild(lineWidth.element)
    })
  }

  /**
   * Handler of the lineWidth click
   *
   * @param {number} width -  The width
   * @memberof LineWidthsTool
   */
  handleLineWidthClick = width => {
    this.lineWidths.forEach(lineWidth => lineWidth.deactivate())

    this.onLineWidthClick(width)
  }
}

export default LineWidthsTool