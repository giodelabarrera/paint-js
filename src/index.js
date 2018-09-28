import App from './App';
import './reset.sass'
import './index.sass'

const root = document.getElementById('root')
root.classList.add('has-vertical-center')

const app = new App()
root.appendChild(app.element)