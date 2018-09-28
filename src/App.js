import Component from "./components/Component";
import Title from "./components/Title";
import Paint from "./components/Paint";

class App extends Component {
  constructor(element) {
    super(element)

    const title = new Title('Paint')
    this.element.appendChild(title.element)

    const paint = new Paint(
      500,
      500,
      [
        '#000000', '#fd5658', '#ffbc00', '#16c757', '#16affc',
        '#ffffff', '#a42b1d', '#ed8323', '#568b34', '#085799',
        '#cfd8dc', '#ff4081', '#ff6e40', '#aeea00', '#304ffe',
        '#4e342e', '#d414f6', '#8d6e63', '#1de9b6', '#7c4dff'
      ],
      '#000000',
      [1, 2, 3, 4, 5],
      1
    )
    this.element.appendChild(paint.element)
  }
}

export default App