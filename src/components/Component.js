
class Component {



  // constructor(tagNameOrElement) {
  //   // debugger
  //   if (typeof tagNameOrElement === "string") {
  //     this._element = document.createElement(tagNameOrElement)
  //   } else if (tagNameOrElement instanceof HTMLElement) {
  //     this._element = tagNameOrElement
  //   }

  //   this.render()
  // }

  constructor(props = {}) {
    this.props = props
    const div = document.createElement('div')
    div.innerHTML = this.render()
    this._element = div.firstElementChild
  }

  get element() {
    return this._element
  }

  set element(element) {
    this._element = element
  }

  toString() {
    return this._element.outerHTML
  }
}

export default Component