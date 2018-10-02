import Color from '.'

describe('color', () => {
  let code
  let isActive
  let onClick

  beforeEach(() => {
    code = '#000000'
    isActive = true
    onClick = isActive => 'clicked'
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new Color({ code, isActive })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new Color({ code, isActive, onClick })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property code', () => {
      expect(() => {
        new Color({ isActive })
      }).toThrowError('code is required')
    })

    test('should fail on trying to pass a undefined in property isActive', () => {
      expect(() => {
        new Color({ code })
      }).toThrowError('isActive is required')
    })

    test('should fail on trying to pass incorrect type in property code', () => {
      code = Math.random()

      expect(() => {
        new Color({ code, isActive })
      }).toThrowError('code must be of type string')
    })

    test('should fail on trying to pass incorrect type in property isActive', () => {
      isActive = 'test'

      expect(() => {
        new Color({ code, isActive })
      }).toThrowError('isActive must be of type boolean')
    })
  })

  describe('initial', () => {
    let color

    beforeEach(() => {
      color = new Color({ code, isActive, onClick })
    })

    test('should be an instance of Color', () => {
      expect(color).toBeInstanceOf(Color)
    })

    test('should the element be of type HTMLButtonElement', () => {
      expect(color.element).toBeDefined()
      expect(color.element).toBeInstanceOf(HTMLButtonElement)
    })

    test('should the element contain the class name Color', () => {
      expect(color.element.classList.contains('Color')).toBeTruthy()
    })

    test('should have the same code', () => {
      expect(color.code).toBe(code);
    })

    test('should have the same isActive', () => {
      expect(color.isActive).toBe(isActive);
    })

    test('should have the same onClick', () => {
      expect(color.onClick).toEqual(onClick);
    })
  })

  describe('handle click', () => {
    test('should handle the click correctly', () => {
      code = '#cecece'

      onClick = _code => {
        expect(_code).toBeDefined()
        expect(_code).toBe(code)
      }

      const color = new Color({ code, isActive, onClick })
      color.element.dispatchEvent(new Event('click'))
    })
  })

  describe('active', () => {
    let color

    beforeEach(() => {
      isActive = false
      color = new Color({ code, isActive, onClick })
    })

    test('should active correctly', () => {
      color.active()

      expect(color.isActive).toBeTruthy()
      expect(color.element.classList.contains('is-active')).toBeTruthy()
      expect(color.element.disabled).toBeTruthy()
    })
  })

  describe('deactivate', () => {
    let color

    beforeEach(() => {
      isActive = true
      color = new Color({ code, isActive, onClick })
    })

    test('should deactivate correctly', () => {
      color.deactivate()

      expect(color.isActive).toBeFalsy()
      expect(color.element.classList.contains('is-active')).toBeFalsy()
      expect(color.element.disabled).toBeFalsy()
    })
  })
})