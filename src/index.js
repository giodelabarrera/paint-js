import './reset.sass'
import './index.sass'
import App from './App';

const root = document.getElementById('root')
root.classList.add('has-vertical-center')

const app = new App()
root.appendChild(app.element)

// // @flow
// function square(n: number): number {
//   return n * n;
// }

// square("2");