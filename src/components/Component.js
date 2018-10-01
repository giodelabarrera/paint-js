class Component {
  // @flow
  constructor(tagNameOrElement: HTMLElement) {
    if (typeof tagNameOrElement === 'string') {
      this._element = document.createElement(tagNameOrElement)
    } else if (tagNameOrElement instanceof HTMLElement) {
      this._element = tagNameOrElement
    }

    this.element.classList.add(this.constructor.name)
  }

  get element() {
    return this._element
  }

  set element(element) {
    this._element = element
  }
}

export default Component