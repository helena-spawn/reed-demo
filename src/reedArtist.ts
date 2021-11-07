import P5 from "p5";
import ReedFactory from "./factories/reedFactory";
import SnowGlobeFactory from "./factories/snowGlobeFactory";
import Reed from "./shapes/reed";
import SnowGlobe from "./shapes/snowGlobe";

export default class ReedArtist
{
    _p5: P5;
    _strokeColor: string; 
    _bottomColor: string;
    _canvasHeight: number;
    _canvasWidth: number;
    _drawHeight: number;
    _reedFactory: ReedFactory;
    _snowGlobeFactory: SnowGlobeFactory;
    shapes: Array<Reed>;
    _snowGlobe: SnowGlobe;

    constructor(p5: P5, 
        reedFactory: ReedFactory,  
        snowGlobeFactory: SnowGlobeFactory,
        canvasWidth: number, 
        canvasHeight: number, 
        drawHeight: number)
    {
        this._p5 = p5;
        this._snowGlobeFactory = snowGlobeFactory;
        this._reedFactory = reedFactory;
        
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._drawHeight = drawHeight;
        this.shapes = new Array<Reed>();
    }

    create = (): void =>
    {
        this._snowGlobe = this._snowGlobeFactory.create();
        const numberOfReeds = this._p5.floor(this._p5.randomGaussian(1.5, 2));
		if (numberOfReeds <= 1)
		{
            const reed = this._reedFactory.createReed(0.5 * this._canvasWidth, 0.3 * this._canvasHeight);
			this.shapes.push(reed);
		}
		else if (numberOfReeds == 2)
		{
            let reed = this._reedFactory.createReed(0.5 * this._canvasWidth, 0.3 * this._canvasHeight);
            this.shapes.push(reed);
            reed = this._reedFactory.createReed(0.25 * this._canvasWidth, 0.4 * this._canvasHeight)
            this.shapes.push(reed);
		}
		else if (numberOfReeds >= 3)
		{
			let reed = this._reedFactory.createReed(0.5 * this._canvasWidth, 0.3 * this._canvasHeight);
            this.shapes.push(reed);
			reed = this._reedFactory.createReed(0.25 * this._canvasWidth, 0.4 * this._canvasHeight);
            this.shapes.push(reed);
			reed = this._reedFactory.createReed(0.75 * this._canvasWidth, 0.5 * this._canvasHeight);
            this.shapes.push(reed);
		}
    }

    draw = (debug: boolean): void =>
    {
        this._snowGlobe.display(debug);
        if (this.shapes.length > 0)
        {
            this.shapes.forEach(element => 
            {
                element.display(debug);
            });
        }
    };
}