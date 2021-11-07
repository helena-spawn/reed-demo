import P5 from 'p5';
import { assert } from 'chai';
import SunFactory from '../src/factories/sunFactory';

describe("SunFactory", () =>
{
    it("can be constructed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const canvasWidth = 900;
            const canvasHeight = 900;
            
            // act
            const sunFactory = new SunFactory(p5, canvasWidth, canvasHeight);

            // assert
            assert.isNotNull(sunFactory);
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
            const sunFactory = new SunFactory(p5, canvasWidth, canvasHeight);

            // act
            const sun = sunFactory.create();

            // assert
            assert.isNotNull(sun);
        };
        new P5(sketch);
    });
});
