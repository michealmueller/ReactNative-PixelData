class MockExpo2DContext {
  constructor(width, options = {}) {
    this.width = width;
    this.options = options;
    this.drawImage = jest.fn();
    this.getImageData = jest.fn().mockReturnValue({
      data: new Uint8ClampedArray([255, 0, 0, 255])
    });
  }
}

module.exports = MockExpo2DContext; 