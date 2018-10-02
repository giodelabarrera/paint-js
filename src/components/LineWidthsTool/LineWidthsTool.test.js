import LineWidthsTool from '.'

describe('line widths tool', () => {
  let widths
  let defaultWidth
  let onLineWidthClick

  beforeEach(() => {
    widths = [1, 2, 3, 4, 5]

    defaultWidth = 1

    onLineWidthClick = width => 'clicked'
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new LineWidthsTool({ widths, defaultWidth })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new LineWidthsTool({ widths, defaultWidth, onLineWidthClick })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property widths', () => {
      expect(() => {
        new LineWidthsTool({ defaultWidth })
      }).toThrowError('widths is required')
    })

    test('should fail on trying to pass a undefined in property defaultWidth', () => {
      expect(() => {
        new LineWidthsTool({ widths })
      }).toThrowError('defaultWidth is required')
    })

    test('should fail on trying to pass incorrect type in property widths', () => {
      widths = '1, 2, 3, 4, 5'

      expect(() => {
        new LineWidthsTool({ widths, defaultWidth })
      }).toThrowError('widths must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property defaultWidth', () => {
      defaultWidth = '2'

      expect(() => {
        new LineWidthsTool({ widths, defaultWidth })
      }).toThrowError('defaultWidth must be of type number')
    })
  })

  describe('initial', () => {
    let lineWidthsTool

    beforeEach(() => {
      lineWidthsTool = new LineWidthsTool({ widths, defaultWidth, onLineWidthClick })
    })

    test('should be an instance of LineWidthsTool', () => {
      expect(lineWidthsTool).toBeInstanceOf(LineWidthsTool)
    })

    test('should the element be of type HTMLElement', () => {
      expect(lineWidthsTool.element).toBeDefined()
      expect(lineWidthsTool.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name LineWidthsTool', () => {
      expect(lineWidthsTool.element.classList.contains('LineWidthsTool')).toBeTruthy()
    })

    test('should have the same widths', () => {
      expect(lineWidthsTool.widths.length).toBe(widths.length);

      widths.forEach(child => expect(lineWidthsTool.widths).toContainEqual(child))
    })

    test('should have the same defaultWidth', () => {
      expect(lineWidthsTool.defaultWidth).toBe(defaultWidth);
    })

    test('should have the same onLineWidthClick', () => {
      expect(lineWidthsTool.onLineWidthClick).toEqual(onLineWidthClick);
    })
  })

  describe('handle line width click', () => {
    test('should handle the click correctly', () => {
      const expectedWidth = 4
      
      onLineWidthClick = _width => {
        expect(_width).toBeDefined()
        expect(_width).toBe(expectedWidth)
      }

      const lineWidthsTool = new LineWidthsTool({ widths: [expectedWidth], defaultWidth, onLineWidthClick })
      lineWidthsTool.lineWidths[0].element.dispatchEvent(new Event('click'))
    })
  })
})