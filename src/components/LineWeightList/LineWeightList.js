import Component from "../Component";
import LineWeight from "./LineWeight";

class LineWeightList extends Component {
  constructor(weights, defaultWeight, onLineWeightClick) {
    super('section')

    this.weights = weights
    this.defaultWeight = defaultWeight
    this.onLineWeightClick = onLineWeightClick

    this.lineWeights = []

    this.weights.forEach(weight => {
      const isActive = weight === this.defaultWeight
      
      const lineWeight = new LineWeight(weight, isActive, this.handleLineWeightClick)
      this.lineWeights.push(lineWeight)

      this.element.appendChild(lineWeight.element)
    })
  }

  handleLineWeightClick = code => {
    this.lineWeights.forEach(lineWeight => lineWeight.deactivate())

    this.onLineWeightClick(code)
  }
}

export default LineWeightList