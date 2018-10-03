import Component from "./components/Component";
import Paint from "./components/Paint";
import './App.sass'

/**
 * App Component
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  
  /**
   * Creates an instance of App
   * 
   * @memberof App
   */
  constructor() {
    super('main')

    this.element.classList.add('App')

    const paint = new Paint({
      width: 900,
      height: 650,
      colors: [
        '#000000', '#fd5658', '#ffbc00', '#16c757', '#16affc',
        '#ffffff', '#a42b1d', '#ed8323', '#568b34', '#085799',
        '#cfd8dc', '#ff4081', '#ff6e40', '#aeea00', '#304ffe',
        '#4e342e', '#d414f6', '#8d6e63', '#1de9b6', '#7c4dff'
      ],
      lineWidths: [1, 2, 3, 4, 5],
      defaultColor: '#000000',
      defaultLineWidth: 1
    })
    this.element.appendChild(paint.element)
  }
}

export default App