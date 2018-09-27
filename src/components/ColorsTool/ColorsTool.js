import Component from "../Component";
import Color from "./Color";

class ColorsTool extends Component {
  constructor(codes, defaultCode, onColorClick) {
    super('section')

    this.codes = codes
    this.defaultCode = defaultCode
    this.onColorClick = onColorClick

    this.colors = []

    this.codes.forEach(code => {
      const isActive = code === this.defaultCode
      
      const color = new Color(code, isActive, this.handleColorClick)
      this.colors.push(color)

      this.element.appendChild(color.element)
    })
  }

  handleColorClick = code => {
    this.colors.forEach(color => color.deactivate())

    this.onColorClick(code)
  }
}

export default ColorsTool