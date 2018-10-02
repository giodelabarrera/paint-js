import Canvas from '.'

describe('canvas', () => {
  let width
  let height
  let strokeColor
  let onMouseDown
  let onMouseMove
  let onMouseUp

  beforeEach(() => {
    width = 500
    height = 500
    strokeColor = '#000'
    onMouseDown = () => 'mouse down'
    onMouseMove = () => 'mouse move'
    onMouseUp = () => 'mouse up'
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new Canvas({ width, height })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new Canvas({ width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property width', () => {
      expect(() => {
        new Canvas({ height })
      }).toThrowError('width is required')
    })

    test('should fail on trying to pass a undefined in property height', () => {
      expect(() => {
        new Canvas({ width })
      }).toThrowError('height is required')
    })

    test('should fail on trying to pass incorrect type in property width', () => {
      width = '900'

      expect(() => {
        new Canvas({ width, height })
      }).toThrowError('width must be of type number')
    })

    test('should fail on trying to pass incorrect type in property height', () => {
      height = '500'

      expect(() => {
        new Canvas({ width, height })
      }).toThrowError('height must be of type number')
    })

    test('should fail on trying to pass incorrect type in property strokeColor', () => {
      strokeColor = 900

      expect(() => {
        new Canvas({ width, height, strokeColor })
      }).toThrowError('strokeColor must be of type string')
    })
  })

  describe('initial', () => {
    let canvas

    beforeEach(() => {
      canvas = new Canvas({ width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp })
    })

    test('should be an instance of Canvas', () => {
      expect(canvas).toBeInstanceOf(Canvas)
    })

    test('should the element be of type HTMLElement', () => {
      expect(canvas.element).toBeDefined()
      expect(canvas.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name Canvas', () => {
      expect(canvas.element.classList.contains('Canvas')).toBeTruthy()
    })

    test('should have the same width', () => {
      expect(canvas.width).toBe(width);
    })

    test('should have the same height', () => {
      expect(canvas.height).toBe(height);
    })

    test('should have the same strokeColor', () => {
      expect(canvas.strokeColor).toBe(strokeColor);
    })

    test('should have the same onMouseDown', () => {
      expect(canvas.onMouseDown).toEqual(onMouseDown);
    })

    test('should have the same onMouseMove', () => {
      expect(canvas.onMouseMove).toEqual(onMouseMove);
    })

    test('should have the same onMouseUp', () => {
      expect(canvas.onMouseUp).toEqual(onMouseUp);
    })
  })

  describe('handle mouse down', () => {

    test('should handle the mouse down correctly', () => {
      onMouseDown = (context, coordinateX, coordinateY) => {
        expect(context).toBeDefined()
        expect(context).toHaveProperty('beginPath')
        expect(context).toHaveProperty('moveTo')

        expect(coordinateX).toBeDefined()
        expect(typeof coordinateX).toBe('number')

        expect(coordinateY).toBeDefined()
        expect(typeof coordinateY).toBe('number')
      }

      const canvas = new Canvas({ width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp })
      canvas.element.dispatchEvent(new Event('mousedown'))
    })
  })

  describe('handle mouse move', () => {

    test('should handle the mouse move correctly', () => {
      onMouseMove = (context, coordinateX, coordinateY) => {
        expect(context).toBeDefined()
        expect(context).toHaveProperty('beginPath')
        expect(context).toHaveProperty('moveTo')

        expect(coordinateX).toBeDefined()
        expect(typeof coordinateX).toBe('number')

        expect(coordinateY).toBeDefined()
        expect(typeof coordinateY).toBe('number')
      }

      const canvas = new Canvas({ width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp })
      canvas.element.dispatchEvent(new Event('mousemove'))
    })
  })

  describe('handle mouse up', () => {

    test('should handle the mouse up correctly', () => {
      onMouseMove = (context, coordinateX, coordinateY) => {
        expect(context).toBeDefined()
        expect(context).toHaveProperty('beginPath')
        expect(context).toHaveProperty('moveTo')

        expect(coordinateX).toBeDefined()
        expect(typeof coordinateX).toBe('number')

        expect(coordinateY).toBeDefined()
        expect(typeof coordinateY).toBe('number')
      }

      const canvas = new Canvas({ width, height, strokeColor, onMouseDown, onMouseMove, onMouseUp })
      canvas.element.dispatchEvent(new Event('mouseup'))
    })
  })
})