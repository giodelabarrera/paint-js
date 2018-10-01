import Component from "../../Component";
import './LineWidth.sass'

class LineWidth extends Component {
  constructor(width, isActive, onClick) {
    super('button')

    this.element.classList.add('LineWidth')

    this.width = width
    this.isActive = isActive
    this.onClick = onClick

    const lineWidthIcon = document.createElement('span')
    lineWidthIcon.classList.add('LineWidth-icon')
    lineWidthIcon.style = `width: calc(5px * ${this.width}); height: calc(5px * ${this.width})`
    this.element.appendChild(lineWidthIcon)

    if (this.isActive) this.active()

    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = event => {
    this.onClick(this.width)
    
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

export default LineWidth