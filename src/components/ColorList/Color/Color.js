import Component from "../../Component";

class Color extends Component {
  constructor(code, isActive, onClick) {
    super('button')

    this.element.innerText = code

    this.code = code
    this.isActive = isActive
    this.onClick = onClick

    if (this.isActive) this.active()

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

  deactivate() {
    this.isActive = false

    this.element.disabled = false
  }
}

export default Color