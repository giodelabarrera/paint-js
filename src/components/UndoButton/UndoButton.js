import Component from "../Component";

class UndoButton extends Component {
  constructor(isEnable, onClick) {
    super('button')

    this.element.innerText = 'undo'
    this.element.disabled = true

    this.isEnable = isEnable
    this.onClick = onClick

    if (this.isEnable) this.enable()

    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = event => {
    this.onClick()
  }

  enable() {
    this.isEnable = true
    
    this.element.disabled = false
  }

  disable() {
    this.isEnable = false

    this.element.disabled = true
  }
}

export default UndoButton