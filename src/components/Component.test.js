import Component from './Component'

describe('component', () => {

  describe('entry', () => {
    
    test('should create correctly by tag name', () => {
      const tagName = 'p'
      const component = new Component(tagName)
      
      expect(component.element).toBeDefined()
    })

    test('should create correctly by HTMLElement', () => {
      const paragraph = document.createElement('p')
      const component = new Component(paragraph)
      
      expect(component.element).toBeDefined()
    })

    test('should fail on trying to pass a undefined parameter', () => {
      const tagNameOrElement = undefined

      expect(() => {
        new Component(tagNameOrElement)
      }).toThrowError('tagNameOrElement must be of type string or HTMLElement')
    })

    test('should fail on trying to pass a number parameter', () => {
      const tagNameOrElement = Math.random()

      expect(() => {
        new Component(tagNameOrElement)
      }).toThrowError('tagNameOrElement must be of type string or HTMLElement')
    })

    test('should fail on trying to pass a boolean parameter', () => {
      const tagNameOrElement = false

      expect(() => {
        new Component(tagNameOrElement)
      }).toThrowError('tagNameOrElement must be of type string or HTMLElement')
    })

    test('should fail on trying to pass a null parameter', () => {
      const tagNameOrElement = null

      expect(() => {
        new Component(tagNameOrElement)
      }).toThrowError('tagNameOrElement must be of type string or HTMLElement')
    })
  })

  describe('initial', () => {

    test('should be an instance of Component', () => {
      const tagNameOrElement = 'button'

      const component = new Component(tagNameOrElement)

      expect(component).toBeInstanceOf(Component)
    })

    test('should the element be of type HTMLElement', () => {
      let tagNameOrElement
      let component

      tagNameOrElement = 'div'
      component = new Component(tagNameOrElement)

      expect(component.element).toBeDefined()
      expect(component.element).toBeInstanceOf(HTMLElement)

      tagNameOrElement = document.createElement('div')
      component = new Component(tagNameOrElement)

      expect(component.element).toBeDefined()
      expect(component.element).toBeInstanceOf(HTMLElement)
    })
  })
})