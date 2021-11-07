import P5 from "p5";
import Sun from "../shapes/sun";

export default class SunFactory
{
    _p5: P5;
    _canvasWidth: number; 
    _canvasHeight: number;

    constructor(p5: P5, canvasWidth: number, canvasHeight: number)
    {
        this._p5 = p5;
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
    }

    create = (): Sun =>
    {
        const sun = new Sun(this._p5, this._canvasWidth, this._canvasHeight);
        return sun;
    }
}