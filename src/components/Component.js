/**
 * Model class to components
 *
 * @class Component
 */
class Component {
  
  /**
   * Creates an instance of Component
   * @param {(string|HTMLElement)} tagNameOrElement - The tag name to create or HTLMElement to assign to element
   * @throws {Error} - tagNameOrElement must be string or HTMLElement
   * @memberof Component
   */
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