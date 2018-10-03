import App from './App'
import 'jest-canvas-mock'

describe('app', () => {

  describe('initial', () => {
    let app

    beforeEach(() => {
      app = new App()
    })

    test('should be an instance of App', () => {
      expect(app).toBeInstanceOf(App)
    })

    test('should the element be of type HTMLElement', () => {
      expect(app.element).toBeDefined()
      expect(app.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name App', () => {
      expect(app.element.classList.contains('App')).toBeTruthy()
    })

    test('should the element contains the paint element', () => {
      const paint = app.element.querySelector('.Paint')

      expect(paint).toBeDefined()
      expect(paint.classList.contains('Paint')).toBeTruthy()
    })
  })
})