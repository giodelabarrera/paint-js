
class Component {
  constructor(tagNameOrElement) {
    if (typeof tagNameOrElement === 'string') {
      this.element = document.createElement(tagNameOrElement)
    } else if (tagNameOrElement instanceof HTMLElement) {
      this.element = tagNameOrElement
    } else {
      throw new Error('tagNameOrElement must be of type string or HTMLElement')
    }
  }
}

export default Component