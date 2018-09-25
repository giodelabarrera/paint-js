import Component from "../Component";
import Canvas from "./Canvas"
import Color from "./Color";
import ColorTool from "./ColorTool";

class Paint extends Component {
  constructor() {
    super('section')

    const canvas = new Canvas(500, 500)
    this.element.appendChild(canvas.element)

    const colorTool = new ColorTool([new Color('black'), new Color('red')])
    this.element.appendChild(colorTool.element)

    


    // const rowsContainer = document.createElement('div')

    // const undo = document.createElement('button')
    // undo.innerText = 'Undo'
    // rowsContainer.appendChild(undo)

    // const redo = document.createElement('button')
    // redo.innerText = 'Redo'
    // rowsContainer.appendChild(redo)

    // this.element.appendChild(rowsContainer)

    // const colorsContainer = document.createElement('div')

    // const black = document.createElement('button')
    // black.innerText = 'Black'
    // colorsContainer.appendChild(black)

    // const red = document.createElement('button')
    // red.innerText = 'Red'
    // colorsContainer.appendChild(red)

    // this.element.appendChild(colorsContainer)
  }

  // <canvas id="board" width="500" height="500">
  //   Hola
  // </canvas>
  // <div>
  //     <button id="btn-undo">Undo</button>
  //     <button id="btn-redo">Redo</button>
  //   </div>
  // <div>
  //   <button id="btn-black">Black</button>
  //   <button id="btn-red">Red</button>
  // </div>
  // <div>
  //   <button id="line-sm">Line SM</button>
  //   <button id="line-md">Line MD</button>
  //   <button id="line-xl">Line XL</button>
  // </div>
}

export default Paint