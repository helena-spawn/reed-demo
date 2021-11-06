import { assert } from 'chai';
import P5 from 'p5';
import Bottom from '../src/shapes/bottom';
import SnowGlobe from '../src/shapes/snowGlobe';
import Sun from '../src/shapes/sun';

describe("SnowGlobe", () =>
{
    it("can be constructed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const arc = new Sun(p5, 100, 100);
            const bottom = new Bottom(p5, undefined, "")
            // act
            const snowGlobe = new SnowGlobe(arc, bottom);

            // assert
            assert.isTrue(snowGlobe != undefined);
        };
        new P5(sketch);
    });

    xit("can be displayed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const arc = new Sun(p5, 100, 100);
            const bottom = new Bottom(p5, undefined, "")
            const snowGlobe = new SnowGlobe(arc, bottom);
            
            // act
            snowGlobe.display(false);

            // assert
        };
        new P5(sketch);
    });
});