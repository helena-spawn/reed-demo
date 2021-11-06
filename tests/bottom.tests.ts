import { assert } from 'chai';
import P5 from 'p5';
import Bottom from '../src/shapes/bottom';

describe("Bottom", () =>
{
    it("can be constructed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const drawHeight = 10;
            const canvasWidth = 900;
            const canvasHeight = 900;
            const bottomBoxLines = new Array<P5.Vector>();
            bottomBoxLines.push(p5.createVector(0, drawHeight));
            bottomBoxLines.push(p5.createVector(canvasWidth, drawHeight));
            bottomBoxLines.push(p5.createVector(canvasWidth, canvasHeight));
            bottomBoxLines.push(p5.createVector(0, canvasHeight));
            bottomBoxLines.push(p5.createVector(0, drawHeight));
            
            // act
            const bottom = new Bottom(p5, bottomBoxLines, "");

            // assert
            assert.isTrue(bottom != undefined);
        };
        new P5(sketch);
    });

    xit("can be displayed", () =>
    {
        const sketch = (p5:P5) =>
        {
            // arrange
            const drawHeight = 10;
            const canvasWidth = 900;
            const canvasHeight = 900;
            const bottomBoxLines = new Array<P5.Vector>();
            bottomBoxLines.push(p5.createVector(0, drawHeight));
            bottomBoxLines.push(p5.createVector(canvasWidth, drawHeight));
            bottomBoxLines.push(p5.createVector(canvasWidth, canvasHeight));
            bottomBoxLines.push(p5.createVector(0, canvasHeight));
            bottomBoxLines.push(p5.createVector(0, drawHeight));
            const bottom = new Bottom(p5, bottomBoxLines, "");
            
            // act
            bottom.display(false);

            // assert
        };
        new P5(sketch);
    });
});