import LineWidth from '.'

describe('line width', () => {
  let width
  let isActive
  let onClick

  beforeEach(() => {
    width = 1
    isActive = true
    onClick = width => 'clicked'
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new LineWidth({ width, isActive })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new LineWidth({ width, isActive, onClick })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property width', () => {
      expect(() => {
        new LineWidth({ isActive })
      }).toThrowError('width is required')
    })

    test('should fail on trying to pass a undefined in property isActive', () => {
      expect(() => {
        new LineWidth({ width })
      }).toThrowError('isActive is required')
    })

    test('should fail on trying to pass incorrect type in property width', () => {
      width = '2.5'

      expect(() => {
        new LineWidth({ width, isActive })
      }).toThrowError('width must be of type number')
    })

    test('should fail on trying to pass incorrect type in property isActive', () => {
      isActive = 'false'

      expect(() => {
        new LineWidth({ width, isActive })
      }).toThrowError('isActive must be of type boolean')
    })
  })

  describe('initial', () => {
    let lineWidth

    beforeEach(() => {
      lineWidth = new LineWidth({ width, isActive, onClick })
    })

    test('should be an instance of LineWidth', () => {
      expect(lineWidth).toBeInstanceOf(LineWidth)
    })

    test('should the element be of type HTMLButtonElement', () => {
      expect(lineWidth.element).toBeDefined()
      expect(lineWidth.element).toBeInstanceOf(HTMLButtonElement)
    })

    test('should the element contain the class name LineWidth', () => {
      expect(lineWidth.element.classList.contains('LineWidth')).toBeTruthy()
    })

    test('should have the same width', () => {
      expect(lineWidth.width).toBe(width);
    })

    test('should have the same isActive', () => {
      expect(lineWidth.isActive).toBe(isActive);
    })

    test('should have the same onClick', () => {
      expect(lineWidth.onClick).toEqual(onClick);
    })
  })

  describe('handle click', () => {
    test('should handle the click correctly', () => {
      width = 2

      onClick = _width => {
        expect(_width).toBeDefined()
        expect(_width).toBe(width)
      }

      const lineWidth = new LineWidth({ width, isActive, onClick })
      lineWidth.element.dispatchEvent(new Event('click'))
    })
  })

  describe('active', () => {
    let lineWidth

    beforeEach(() => {
      isActive = false
      lineWidth = new LineWidth({ width, isActive, onClick })
    })

    test('should active correctly', () => {
      lineWidth.active()

      expect(lineWidth.isActive).toBeTruthy()
      expect(lineWidth.element.classList.contains('is-active')).toBeTruthy()
      expect(lineWidth.element.disabled).toBeTruthy()
    })
  })

  describe('deactivate', () => {
    let lineWidth

    beforeEach(() => {
      isActive = true
      lineWidth = new LineWidth({ width, isActive, onClick })
    })

    test('should deactivate correctly', () => {
      lineWidth.deactivate()

      expect(lineWidth.isActive).toBeFalsy()
      expect(lineWidth.element.classList.contains('is-active')).toBeFalsy()
      expect(lineWidth.element.disabled).toBeFalsy()
    })
  })
})