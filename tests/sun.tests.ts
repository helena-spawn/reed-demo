import { assert } from 'chai';
import P5 from 'p5';
import Sun from '../src/shapes/sun';

describe("Sun", () =>
{
    it("can be constructed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange

            // act
            const sun = new Sun(p5, 900, 900);

            // assert
            assert.isTrue(sun != undefined);
        };
        new P5(sketch);
    });

    xit("can be displayed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const sun = new Sun(p5, 10, 10);
            
            // act
            sun.display(false);

            // assert
        };
        new P5(sketch);
    });
});