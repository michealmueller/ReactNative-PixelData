export = MockExpo2DContext;
declare class MockExpo2DContext {
    constructor(width: any, options?: {});
    width: any;
    options: {};
    drawImage: jest.Mock<any, any, any>;
    getImageData: jest.Mock<any, any, any>;
}
