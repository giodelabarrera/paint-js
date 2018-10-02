import ColorsTool from '.'

describe('colors tool', () => {
  let codes
  let defaultCode
  let onColorClick

  beforeEach(() => {
    codes = ['#000000', '#fd5658', '#ffbc00', '#16c757', '#16affc']

    defaultCode = '#000000'

    onColorClick = code => 'clicked'
  })

  describe('entry', () => {

    test('should create correctly with required parameters', () => {
      expect(new ColorsTool({ codes, defaultCode })).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new ColorsTool({ codes, defaultCode, onColorClick })).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property codes', () => {
      expect(() => {
        new ColorsTool({ defaultCode })
      }).toThrowError('codes is required')
    })

    test('should fail on trying to pass a undefined in property defaultCode', () => {
      expect(() => {
        new ColorsTool({ codes })
      }).toThrowError('defaultCode is required')
    })

    test('should fail on trying to pass incorrect type in property codes', () => {
      codes = '#000000, #fd5658, #ffbc00'

      expect(() => {
        new ColorsTool({ codes, defaultCode })
      }).toThrowError('codes must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property defaultCode', () => {
      defaultCode = Math.random()

      expect(() => {
        new ColorsTool({ codes, defaultCode })
      }).toThrowError('defaultCode must be of type string')
    })
  })

  describe('initial', () => {
    let colorsTool

    beforeEach(() => {
      colorsTool = new ColorsTool({ codes, defaultCode, onColorClick })
    })

    test('should be an instance of ColorsTool', () => {
      expect(colorsTool).toBeInstanceOf(ColorsTool)
    })

    test('should the element be of type HTMLElement', () => {
      expect(colorsTool.element).toBeDefined()
      expect(colorsTool.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name ColorsTool', () => {
      expect(colorsTool.element.classList.contains('ColorsTool')).toBeTruthy()
    })

    test('should have the same codes', () => {
      expect(colorsTool.codes.length).toBe(codes.length);

      codes.forEach(child => expect(colorsTool.codes).toContainEqual(child))
    })

    test('should have the same defaultCode', () => {
      expect(colorsTool.defaultCode).toBe(defaultCode);
    })

    test('should have the same onColorClick', () => {
      expect(colorsTool.onColorClick).toEqual(onColorClick);
    })
  })

  describe('handle color click', () => {
    test('should handle the click correctly', () => {
      const expectedCode = '#fd5658'
      
      onColorClick = _code => {
        expect(_code).toBeDefined()
        expect(_code).toBe(expectedCode)
      }

      const colorsTool = new ColorsTool({ codes: [expectedCode], defaultCode, onColorClick })
      colorsTool.colors[0].element.dispatchEvent(new Event('click'))
    })
  })
})