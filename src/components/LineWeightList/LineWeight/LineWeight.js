import Component from "../../Component";

class LineWeight extends Component {
  constructor(weight, isActive, onClick) {
    super('button')

    this.element.innerText = weight

    this.weight = weight
    this.isActive = isActive
    this.onClick = onClick

    if (this.isActive) this.active()

    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = event => {
    this.onClick(this.weight)
    
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

export default LineWeight