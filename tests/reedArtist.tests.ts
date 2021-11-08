import P5 from 'p5';
import { assert } from 'chai';
import ReedArtist from '../src/reedArtist';
import SunFactory from '../src/factories/sunFactory';
import ReedFactory from '../src/factories/reedFactory';
import SnowGlobeFactory from '../src/factories/snowGlobeFactory';

describe("ReedArtist", () =>
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
            const reedFactory = new ReedFactory(p5, canvasWidth, drawHeight, canvasHeight, sunFactory);
            const snowGlobeFactory = new SnowGlobeFactory(p5, sunFactory, 40, canvasWidth, canvasHeight, drawHeight);
            
            // act
            const artist = new ReedArtist(p5, reedFactory, snowGlobeFactory, canvasWidth, canvasHeight, drawHeight)

            // assert
            assert.isNotNull(artist);
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
            const snowGlobeFactory = new SnowGlobeFactory(p5, sunFactory, 40, canvasWidth, canvasHeight, drawHeight);
            const artist = new ReedArtist(p5, reedFactory, snowGlobeFactory, canvasWidth, canvasHeight, drawHeight)

            // act
            artist.create();

            // assert
            assert.isTrue(artist.shapes.length > 0);
        };
        new P5(sketch);
    });
});