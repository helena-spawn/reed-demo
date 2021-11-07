import P5 from 'p5';
import { assert } from 'chai';
import SunFactory from '../src/factories/sunFactory';
import ReedFactory from '../src/factories/reedFactory';

describe("ReedFactory", () =>
{
    it("can be constructed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const canvasWidth = 900;
            const canvasHeight = 900;
            const drawHeight = 750;
            const sunFactory = new SunFactory(p5, canvasWidth, canvasHeight);
            
            // act
            const reedFactory = new ReedFactory(p5, canvasWidth, drawHeight, canvasHeight, sunFactory);

            // assert
            assert.isNotNull(reedFactory);
        };
        new P5(sketch);
    });
    it("can create", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const canvasWidth = 900;
            const canvasHeight = 900;
            const drawHeight = 750;
            const sunFactory = new SunFactory(p5, canvasWidth, canvasHeight);
            const reedFactory = new ReedFactory(p5, canvasWidth, drawHeight, canvasHeight, sunFactory);
            
            // act
            const reed = reedFactory.createReed(10, 100);

            // assert
            assert.isNotNull(reed);
        };
        new P5(sketch);
    });
});