import Component from "../../Component";

class LineWidth extends Component {
  constructor(width, isActive, onClick) {
    super('button')

    this.element.innerText = width

    this.width = width
    this.isActive = isActive
    this.onClick = onClick

    if (this.isActive) this.active()

    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = event => {
    this.onClick(this.width)
    
    this.active()
  }

  active() {
    this.isActive = true
    
    this.element.disabled = true
  }

  deactivate() {
    this.isActive = false

    this.element.disabled = false
  }
}

export default LineWidth