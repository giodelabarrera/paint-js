import Component from "../../Component";

class Color extends Component {
  constructor(color, onClick) {
    super('button')

    this.element.innerText = color

    this.onClick = onClick
    
    this.element.addEventListener('click', this.handleClick)
  }

  handleClick = (event) => {
    this.onClick()
  }
}

export default Color