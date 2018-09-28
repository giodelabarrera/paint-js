import Component from "../Component";
import './Tool.sass'

class Tool extends Component {
  constructor(children) {
    super('section')

    children.forEach(child => this.element.appendChild(child))
  }
}

export default Tool