import P5 from 'p5';
import ReedArtist from './reedArtist';
import SnowGlobe from './shapes/snowGlobe';

const sketch = (p5: P5) => 
{
    const _canvasWidth = 900;
    const _canvasHeight = 900;
    const _bottomMargin = 150;
    const _drawHeight = _canvasHeight - _bottomMargin;
    const _debug = false;

    const hsbColor = p5.floor(p5.randomGaussian(180, 50));
	const _backgroundColor = "hsb(" + hsbColor + " , 40%, 80%)";

    let snowGlobe: SnowGlobe;
    const artist = new ReedArtist(p5, hsbColor, _canvasWidth, _canvasHeight, _drawHeight)

    p5.setup = () => 
    {
        p5.createCanvas(_canvasWidth, _canvasHeight);
        snowGlobe = artist.createSnowGlobe();
    };

    p5.draw = () => 
    {
        p5.background(_backgroundColor);
        snowGlobe.display(_debug);
    };

    p5.mousePressed = () =>
    {
    };

}
const mySketch = new P5(sketch);