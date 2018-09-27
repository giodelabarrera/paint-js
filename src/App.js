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
      ['black', 'red', 'yellow', 'blue'],
      'black',
      [0.1, 1, 2.5, 5],
      1
    )
    this.element.appendChild(paint.element)
  }
}

export default App