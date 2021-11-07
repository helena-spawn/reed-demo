import P5 from 'p5';
import ReedArtist from './reedArtist';
import ReedFactory from './reedFactory';
import SnowGlobeFactory from './snowGlobeFactory';

const sketch = (p5: P5) => 
{
    const _canvasWidth = 900;
    const _canvasHeight = 900;
    const _bottomMargin = 150;
    const _drawHeight = _canvasHeight - _bottomMargin;
    const _debug = false;

    const hsbColor = p5.floor(p5.randomGaussian(180, 50));
	const _backgroundColor = "hsb(" + hsbColor + " , 40%, 80%)";
    const snowGlobeFactory = new SnowGlobeFactory(p5, hsbColor, _canvasWidth, _canvasHeight, _drawHeight);
    const reedFactory = new ReedFactory(p5, _canvasWidth, _drawHeight, _canvasHeight, snowGlobeFactory)
    const artist = new ReedArtist(p5, reedFactory, _canvasWidth, _canvasHeight, _drawHeight)

    p5.setup = () => 
    {
        p5.createCanvas(_canvasWidth, _canvasHeight);
        artist.create();
    };

    p5.draw = () => 
    {
        p5.background(_backgroundColor);
        artist.draw(_debug);
    };

}
const mySketch = new P5(sketch);