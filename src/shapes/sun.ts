import P5 from "p5";

export default class Sun
{
    _p5: P5;
    solarForce: number;
    _canvasHeight: number;
    _canvasWidth: number;
    _curveStartControlX: number; 
    _curveStartControlY: number; 
    _curveStartX: number;
    _curveStartY: number;
    _curveEndX: number;
    _curveEndY: number;
    _curveEndControlX: number;
    _curveEndControlY: number;
    _domeColor: string;

    constructor(p5: P5, canvasWidth: number, canvasHeight: number)
    {
        this._p5 = p5;
        this.solarForce = 4000;

        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;

        this._curveStartControlX = 0.1 * canvasWidth;
        this._curveStartControlY = canvasHeight + 7.5 * canvasHeight;
        this._curveStartX = 0;
        this._curveStartY = canvasHeight;
        this._curveEndX = canvasWidth;
        this._curveEndY = canvasHeight;
        this._curveEndControlX = 0.9 * canvasWidth;
        this._curveEndControlY = canvasHeight +  7.5 * canvasHeight;
    }

    display = (debug: boolean): void =>
	{
        this._p5.noFill();
		this._p5.stroke("black");
        this._p5.curve(
            this._curveStartControlX, 
            this._curveStartControlY, 
            this._curveStartX, 
            this._curveStartY,
            this._curveEndX,
            this._curveEndY,
            this._curveEndControlX, 
            this._curveEndControlY);
	};
}