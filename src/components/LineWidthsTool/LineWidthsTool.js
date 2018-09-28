import Component from "../Component";
import LineWidth from "./LineWidth";
import './LineWidthsTool.sass'

class LineWidthsTool extends Component {
  constructor(widths, defaultWidth, onLineWidthClick) {
    super('section')

    this.widths = widths
    this.defaultWidth = defaultWidth
    this.onLineWidthClick = onLineWidthClick

    this.lineWidths = []

    this.widths.forEach(width => {
      const isActive = width === this.defaultWidth
      
      const lineWidth = new LineWidth(width, isActive, this.handleLineWidthClick)
      this.lineWidths.push(lineWidth)

      this.element.appendChild(lineWidth.element)
    })
  }

  handleLineWidthClick = code => {
    this.lineWidths.forEach(lineWidth => lineWidth.deactivate())

    this.onLineWidthClick(code)
  }
}

export default LineWidthsTool