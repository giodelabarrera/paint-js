import Paint from '.'
import 'jest-canvas-mock'

describe('paint', () => {
  let width
  let height
  let colors
  let lineWidths
  let defaultColor
  let defaultLineWidth

  beforeEach(() => {
    width = 900
    height = 600
    colors = ['#000000', '#fd5658', '#ffbc00', '#16c757', '#16affc']
    lineWidths = [1, 2, 3, 4, 5]
    defaultColor = '#000000'
    defaultLineWidth = 1
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new Paint({ width, height, colors, lineWidths })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property width', () => {
      expect(() => {
        new Paint({ height, colors, lineWidths })
      }).toThrowError('width is required')
    })

    test('should fail on trying to pass a undefined in property height', () => {
      expect(() => {
        new Paint({ width, colors, lineWidths })
      }).toThrowError('height is required')
    })

    test('should fail on trying to pass a undefined in property colors', () => {
      expect(() => {
        new Paint({ width, height, lineWidths })
      }).toThrowError('colors is required')
    })

    test('should fail on trying to pass a undefined in property lineWidths', () => {
      expect(() => {
        new Paint({ width, height, colors })
      }).toThrowError('lineWidths is required')
    })

    test('should fail on trying to pass incorrect type in property width', () => {
      width = '900'

      expect(() => {
        new Paint({ width, height, colors, lineWidths })
      }).toThrowError('width must be of type number')
    })

    test('should fail on trying to pass incorrect type in property height', () => {
      height = '500'

      expect(() => {
        new Paint({ width, height, colors, lineWidths })
      }).toThrowError('height must be of type number')
    })

    test('should fail on trying to pass incorrect type in property colors', () => {
      colors = '#000000, #fd5658, #ffbc00, #16c757, #16affc'

      expect(() => {
        new Paint({ width, height, colors, lineWidths })
      }).toThrowError('colors must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property lineWidths', () => {
      lineWidths = '1, 2, 3, 4, 5'

      expect(() => {
        new Paint({ width, height, colors, lineWidths })
      }).toThrowError('lineWidths must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property defaultColor', () => {
      defaultColor = Math.random()

      expect(() => {
        new Paint({ width, height, colors, lineWidths, defaultColor })
      }).toThrowError('defaultColor must be of type string')
    })

    test('should fail on trying to pass incorrect type in property defaultLineWidth', () => {
      defaultLineWidth = '3'

      expect(() => {
        new Paint({ width, height, colors, lineWidths, defaultLineWidth })
      }).toThrowError('defaultLineWidth must be of type number')
    })
  })

  describe('initial', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should be an instance of Paint', () => {
      expect(paint).toBeInstanceOf(Paint)
    })

    test('should the element be of type HTMLElement', () => {
      expect(paint.element).toBeDefined()
      expect(paint.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name Paint', () => {
      expect(paint.element.classList.contains('Paint')).toBeTruthy()
    })

    test('should have the same width', () => {
      expect(paint.width).toBe(width);
    })

    test('should have the same height', () => {
      expect(paint.height).toBe(height);
    })

    test('should have the same colors', () => {
      expect(paint.colors.length).toBe(colors.length);

      colors.forEach(child => expect(paint.colors).toContainEqual(child))
    })

    test('should have the same lineWidths', () => {
      expect(paint.lineWidths.length).toBe(lineWidths.length);

      lineWidths.forEach(child => expect(paint.lineWidths).toContainEqual(child))
    })

    test('should have the same defaultColor', () => {
      expect(paint.defaultColor).toEqual(defaultColor);
    })

    test('should have the same defaultLineWidth', () => {
      expect(paint.defaultLineWidth).toEqual(defaultLineWidth);
    })
  })

  describe('on canvas mouse down', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should handle the on mouse down correctly', () => {
      const { canvas } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))

      expect(paint.currentStroke).toBeDefined()
      expect(paint.currentStroke).toHaveProperty('color')
      expect(paint.currentStroke).toHaveProperty('width')
      expect(paint.currentStroke).toHaveProperty('coordinates')
      expect(paint.currentStroke.coordinates).toHaveLength(1)
    })
  })

  describe('on canvas mouse move', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should handle the on mouse move correctly', () => {
      const { canvas } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))

      expect(paint.currentStroke).toBeDefined()
      expect(paint.currentStroke).toHaveProperty('color')
      expect(paint.currentStroke).toHaveProperty('width')
      expect(paint.currentStroke).toHaveProperty('coordinates')
      expect(paint.currentStroke.coordinates).toHaveLength(2)
    })
  })

  describe('on canvas mouse up', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should handle the on mouse move correctly', () => {
      const { canvas, undoButton, redoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokes).toHaveLength(1)
      expect(paint.strokePosition).toBe(0)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should handle the on mouse move correctly when stroke is a pixel', () => {
      const { canvas, undoButton, redoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokes).toHaveLength(1)
      expect(paint.strokePosition).toBe(0)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should handle the on mouse move correctly when stroke is after of an undo action', () => {
      const { canvas, undoButton, redoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokes).toHaveLength(1)
      expect(paint.strokePosition).toBe(0)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })
  })

  // TODO: test it with node canvas
  // describe('on color click', () => {})

  // TODO: test it with node canvas
  // describe('on line width click', () => {})

  describe('on undo click', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should not perform undo when there is no stroke', () => {
      const { undoButton, redoButton } = paint

      expect(paint.strokePosition).toBe(0)

      expect(undoButton.isEnable).toBeFalsy()
      expect(undoButton.element.disabled).toBeTruthy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should undo correctly after a stroke', () => {
      const { canvas, undoButton, redoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))

      expect(paint.strokePosition).toBe(-1)

      expect(undoButton.isEnable).toBeFalsy()
      expect(undoButton.element.disabled).toBeTruthy()

      expect(redoButton.isEnable).toBeTruthy()
      expect(redoButton.element.disabled).toBeFalsy()
    })

    test('should undo correctly after of many stroke', () => {
      const { canvas, undoButton, redoButton } = paint

      for (let i = 0; i < 5; i++) {
        canvas.element.dispatchEvent(new Event('mousedown'))
        canvas.element.dispatchEvent(new Event('mousemove'))
        canvas.element.dispatchEvent(new Event('mouseup'))
      }

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokePosition).toBe(3)

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokePosition).toBe(2)

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokePosition).toBe(1)

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokePosition).toBe(0)
    })
  })

  describe('on redo click', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should not perform redo when there is no stroke', () => {
      const { undoButton, redoButton } = paint

      expect(paint.strokePosition).toBe(0)

      expect(undoButton.isEnable).toBeFalsy()
      expect(undoButton.element.disabled).toBeTruthy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should not perform redo when there is no undo action', () => {
      const { canvas, undoButton, redoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokePosition).toBe(0)

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should redo correctly after an undo action', () => {
      const { canvas, undoButton, redoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))
      redoButton.element.dispatchEvent(new Event('click'))

      expect(paint.strokePosition).toBe(0)

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })
  })

  describe('is stroke a pixel', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should correctly return that the stroke is a pixel', () => {
      const { canvas } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))

      expect(paint.isStrokeAPixel(paint.currentStroke)).toBeTruthy()
    })
  })

  describe('is new stroke after undo', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({ width, height, colors, lineWidths, defaultColor, defaultLineWidth })
    })

    test('should correctly return that a stroke has been made after of an undo action', () => {
      const { canvas, undoButton } = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))

      expect(paint.isNewStrokeAfterUndo(paint.strokePosition, paint.strokes)).toBeTruthy()
    })
  })

  // TODO: test it with node canvas
  // describe('draw coordinates', () => {})
})