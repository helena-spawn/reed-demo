import P5 from 'p5';

const sketch = (p5: P5) => 
{
    const _canvasWidth = 900;
    const _canvasHeight = 900;
    const _bottomMargin = 150;
    const _debug = false;
    const snowGlobe = new snowGlobe();

    p5.setup = () => 
    {
        p5.createCanvas(_canvasWidth, _canvasHeight);
    };

    p5.draw = () => 
    {
        p5.background("hsb(220, 50%, 70%)");

    };

    p5.mousePressed = () =>
    {
    };
}
const mySketch = new P5(sketch);