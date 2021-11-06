import { assert } from 'chai';
import P5 from 'p5';
import SnowGlobe from '../src/shapes/snowGlobe';

describe("SnowGlobe", () =>
{
    it("can be constructed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange

            // act
            const snowGlobe = new SnowGlobe();

            // assert
            assert.isTrue(snowGlobe != undefined);
        };
        new P5(sketch);
    });
});