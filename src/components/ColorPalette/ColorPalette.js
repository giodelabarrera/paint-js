import Component from "../Component";
import Color from "./Color";

class ColorPalette extends Component {
  constructor(colorCodes, defaultColor, onColorClick) {
    super('section')

    this.activeColor = defaultColor
    this.onColorClick = onColorClick

    this.colors = []

    colorCodes.forEach(colorCode => {
      const isActive = colorCode === this.activeColor
      const color = new Color(colorCode, isActive, this.handleColorClick)
      // this.colors.push({ key: colorCode, color })
      this.colors.push(color)
      this.element.appendChild(color.element)
    })
  }

  handleColorClick = (colorCode) => {
    this.colors.forEach(color => color.disable())

    this.onColorClick(colorCode)
  }
}

export default ColorPalette