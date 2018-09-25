import Component from "./components/Component";
import Paint from "./components/Paint";
import Title from "./components/Title";

class App extends Component {
  render() {
    return `
      <section>
        ${new Title({ name: 'Hello' })}
        ${new Paint()}
      </section>
    `
  }
}

export default App