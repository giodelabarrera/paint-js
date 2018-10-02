import Tool from '.'

describe('tool', () => {

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      const buttonTexts = ['Change color', 'Change line width', 'Apply filters']

      const children = buttonTexts.map(textButton => {
        const button = document.createElement('button')
        button.innerText = textButton
        return button
      })

      expect(new Tool({ children })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property children', () => {
      const children = undefined

      expect(() => {
        new Tool({ children })
      }).toThrowError('children is required')
    })

    test('should fail on trying to pass a string in property children', () => {
      const children = 'tools'

      expect(() => {
        new Tool({ children })
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass a number in property children', () => {
      const children = Math.random()

      expect(() => {
        new Tool({ children })
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass a boolean in property children', () => {
      const children = false

      expect(() => {
        new Tool({ children })
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass a null in property children', () => {
      const children = null

      expect(() => {
        new Tool({ children })
      }).toThrowError('children must be of type Array')
    })
  })

  describe('initial', () => {

    let tool
    let children

    beforeEach(() => {
      const buttonTexts = ['Change color', 'Change line width', 'Apply filters']

      children = buttonTexts.map(textButton => {
        const button = document.createElement('button')
        button.innerText = textButton
        return button
      })

      tool = new Tool({ children })
    })

    test('should be an instance of Tool', () => {
      expect(tool).toBeInstanceOf(Tool)
    })

    test('should the element be of type HTMLElement', () => {
      expect(tool.element).toBeDefined()
      expect(tool.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name Tool', () => {
      expect(tool.element.classList.contains('Tool')).toBeTruthy()
    })

    test('should have the same children', () => {
      expect(tool.children.length).toBe(children.length);

      children.forEach(child => expect(tool.children).toContainEqual(child))
    })
  })
})