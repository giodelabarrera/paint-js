import Component from "../../Component";

class Color extends Component {
  constructor(colorCode, isActive, onClick) {
    super('button')

    this.element.innerText = colorCode

    this.code = colorCode
    this.onClick = onClick

    if (isActive) this.active()

    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = event => {
    this.onClick(this.code)
    this.active()
  }

  active() {
    this.isActive = true
    
    this.element.disabled = true
  }

  disable() {
    this.isActive = false

    this.element.disabled = false
  }
}

export default Color