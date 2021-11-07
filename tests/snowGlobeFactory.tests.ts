import P5 from 'p5';
import { assert } from 'chai';
import SunFactory from '../src/factories/sunFactory';
import SnowGlobeFactory from '../src/factories/snowGlobeFactory';

describe("SnowGlobeFactory", () =>
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
            const snowGlobeFactory = new SnowGlobeFactory(p5, sunFactory, 40, canvasWidth, canvasHeight, drawHeight);

            // assert
            assert.isNotNull(snowGlobeFactory);
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
            const snowGlobeFactory = new SnowGlobeFactory(p5, sunFactory, 40, canvasWidth, canvasHeight, drawHeight);

            // act
            const snowGlobe = snowGlobeFactory.create();

            // assert
            assert.isNotNull(snowGlobe);
        };
        new P5(sketch);
    });
});
