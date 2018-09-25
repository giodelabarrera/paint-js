import Component from "../../Component";

class RedoButton extends Component {
  constructor(disabled) {
    super('button')

    this.element.disabled = disabled
  }
}

export default RedoButton