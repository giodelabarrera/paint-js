import ActionButton from '.'

describe('action button', () => {
  let children
  let isEnable
  let onClick

  beforeEach(() => {
    const spanTexts = ['Undo', 'Redo']

    children = spanTexts.map(spanText => {
      const span = document.createElement('span')
      span.innerText = spanText
      return span
    })

    isEnable = true
    
    onClick = isEnable => 'clicked'
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new ActionButton({ children, isEnable })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new ActionButton({ children, isEnable, onClick })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property children', () => {
      expect(() => {
        new ActionButton({ isEnable })
      }).toThrowError('children is required')
    })

    test('should fail on trying to pass a undefined in property isEnable', () => {
      expect(() => {
        new ActionButton({ children })
      }).toThrowError('isEnable is required')
    })

    test('should fail on trying to pass incorrect type in property children', () => {
      children = 'span'

      expect(() => {
        new ActionButton({ children, isEnable })
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property isEnable', () => {
      isEnable = 'test'

      expect(() => {
        new ActionButton({ children, isEnable })
      }).toThrowError('isEnable must be of type boolean')
    })
  })

  describe('initial', () => {
    let actionButton

    beforeEach(() => {
      actionButton = new ActionButton({ children, isEnable, onClick })
    })

    test('should be an instance of ActionButton', () => {
      expect(actionButton).toBeInstanceOf(ActionButton)
    })

    test('should the element be of type HTMLButtonElement', () => {
      expect(actionButton.element).toBeDefined()
      expect(actionButton.element).toBeInstanceOf(HTMLButtonElement)
    })

    test('should the element contain the class name ActionButton', () => {
      expect(actionButton.element.classList.contains('ActionButton')).toBeTruthy()
    })

    test('should have the same children', () => {
      expect(actionButton.children.length).toBe(children.length);

      children.forEach(child => expect(actionButton.children).toContainEqual(child))
    })

    test('should have the same isEnable', () => {
      expect(actionButton.isEnable).toBe(isEnable);
    })

    test('should have the same onClick', () => {
      expect(actionButton.onClick).toEqual(onClick);
    })
  })

  describe('handle click', () => {
    let actionButton

    test('should handle the click correctly', () => {
      onClick = isEnable => {
        expect(isEnable).toBeDefined()
        expect(isEnable).toBeTruthy()
      }

      actionButton = new ActionButton({ children, isEnable, onClick })
      actionButton.element.dispatchEvent(new Event('click'))
    })
  })

  describe('enable', () => {
    let actionButton

    beforeEach(() => {
      isEnable = false
      actionButton = new ActionButton({ children, isEnable, onClick })
    })

    test('should enable correctly', () => {
      actionButton.enable()

      expect(actionButton.isEnable).toBeTruthy()
      expect(actionButton.element.classList.contains('is-enable')).toBeTruthy()
      expect(actionButton.element.disabled).toBeFalsy()
    })
  })

  describe('disable', () => {
    let actionButton

    beforeEach(() => {
      isEnable = true
      actionButton = new ActionButton({ children, isEnable, onClick })
    })

    test('should disable correctly', () => {
      actionButton.disable()

      expect(actionButton.isEnable).toBeFalsy()
      expect(actionButton.element.classList.contains('is-enable')).toBeFalsy()
      expect(actionButton.element.disabled).toBeTruthy()
    })
  })

})