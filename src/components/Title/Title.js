import Component from "../Component";

class Title extends Component {
  constructor(name) {
    super('h1')

    this.element.innerText = name
  }
}

export default Title