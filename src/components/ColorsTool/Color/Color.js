import Component from "../../Component";
import './Color.sass'

class Color extends Component {
  constructor(code, isActive, onClick) {
    super('button')

    const colorIcon = document.createElement('span')
    colorIcon.classList.add('Color-icon')
    colorIcon.style = `background-color: ${code}`
    this.element.appendChild(colorIcon)

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
    
    this.element.classList.add('is-active')
    this.element.disabled = true
  }

  deactivate() {
    this.isActive = false

    this.element.classList.remove('is-active')    
    this.element.disabled = false
  }
}

export default Color