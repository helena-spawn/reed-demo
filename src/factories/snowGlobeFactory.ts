import P5 from "p5";
import Bottom from "../shapes/bottom";
import SnowGlobe from "../shapes/snowGlobe";
import SunFactory from "./sunFactory";

export default class SnowGlobeFactory
{
    _p5: P5;
    _sunFactory: SunFactory;
    _canvasHeight: number;
    _canvasWidth: number;
    _drawHeight: number;
    _bottomColor: string;
    _strokeColor: string;
    constructor(p5: P5, sunFactory: SunFactory, hsbColor: number, canvasWidth: number, canvasHeight: number, drawHeight: number)
    {
        this._p5 = p5;
        this._sunFactory = sunFactory;
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._drawHeight = drawHeight;
        this._setupColorScheme(hsbColor);
    }

    create = (): SnowGlobe =>
    {
        const bottomShapeLines = this._setupBottom();
        const bottom = new Bottom(this._p5, bottomShapeLines, this._bottomColor);

        const sun = this._sunFactory.create();
        const snowGlobe = new SnowGlobe(sun, bottom);
        return snowGlobe;
    }

    _setupBottom = (): Array<P5.Vector> =>
    {
        const bottomBoxLines = new Array<P5.Vector>();
        bottomBoxLines.push(this._p5.createVector(0, this._drawHeight));
        bottomBoxLines.push(this._p5.createVector(this._canvasWidth, this._drawHeight));
        bottomBoxLines.push(this._p5.createVector(this._canvasWidth, this._canvasHeight));
        bottomBoxLines.push(this._p5.createVector(0, this._canvasHeight));
        bottomBoxLines.push(this._p5.createVector(0, this._drawHeight));
        return bottomBoxLines;
    }

    _setupColorScheme = (hsbColor: number) =>
    {
		this._bottomColor = "hsb(" + hsbColor + ", 40%, 40%)";
		this._strokeColor = "black";
    }
}