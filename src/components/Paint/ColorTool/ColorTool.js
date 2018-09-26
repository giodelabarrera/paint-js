import Component from "../../Component";

class ColorTool extends Component {
  constructor(colors) {
    super('section')

    colors.forEach(color => this.element.appendChild(color.element))

    // this.element.disabled = disabled

    // state
    // this.active = 
  }

  onChangeColorClick() {
    
  }
}

export default ColorTool