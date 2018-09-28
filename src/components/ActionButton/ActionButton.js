import Component from "../Component"
import './ActionButton.sass'

class ActionButton extends Component {
  constructor(children, isEnable, onClick) {
    super('button')

    children.forEach(child => this.element.appendChild(child))

    this.element.disabled = true

    this._isEnable = isEnable
    this._onClick = onClick

    if (this._isEnable) this.enable()

    this.element.addEventListener('click', this.handleClick)
  }

  get isEnable() {
    return this._isEnable
  }

  handleClick = event => {
    this._onClick(this._isEnable)
  }

  enable() {
    this._isEnable = true
    
    this.element.disabled = false
  }

  disable() {
    this._isEnable = false

    this.element.disabled = true
  }
}

export default ActionButton