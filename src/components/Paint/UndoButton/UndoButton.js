import Component from "../../Component";

class UndoButton extends Component {
  constructor(disabled) {
    super('button')

    this.element.disabled = disabled
  }
}

export default UndoButton