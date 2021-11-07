import P5 from "p5";
import Branch from "./shapes/branch";
import Sun from "./shapes/sun";
import Reed from "./shapes/reed";
import DirectionType from "./directionType";
import SnowGlobeFactory from "./snowGlobeFactory";
import SnowGlobe from "./shapes/snowGlobe";

export default class ReedFactory
{
    _p5:P5;
    _canvasWidth: number;
    _drawHeight: number;
    _canvasHeight: number;
    _counter: number;
    _sun: Sun;
    _numberOfFirstLevelBranches: number;
    _numberOfSubLevelBranches: number;
    snowGlobe: SnowGlobe;

    constructor(p5: P5, canvasWidth: number, drawHeight: number, canvasHeight: number, 
        snowGlobeFactory: SnowGlobeFactory)
    {
        this._p5 = p5;
        this._canvasWidth = canvasWidth;
        this._drawHeight = drawHeight;
        this._canvasHeight = canvasHeight;
        this._counter = 0;
        
        this._numberOfFirstLevelBranches = 10 ;
        this._numberOfSubLevelBranches = 2;

        this.snowGlobe = snowGlobeFactory.createSnowGlobe();
        this._sun = this.snowGlobe._arc;
    }

    createReed = (x: number, height: number): Reed =>
    {
        const allBranches = this._create(x, height);
        const reed = new Reed(this._p5, allBranches);

        return reed;
    }

    _create = (x: number, height: number): Array<Branch> =>
    {
        const result = new Array<Branch>();
        const mainBranch = this._createMainBranch(x, height);
        result.push(mainBranch);

        for (let i = 1; i < this._numberOfFirstLevelBranches; i++)
        {
            const direction = this._determineDirection(i);
            const sunPositionOnCurve = this._determineSunPositionOnCurveForDirection(i, direction);
            const branch = this._createBranch(mainBranch, 1 - (i / 10), sunPositionOnCurve);
            result.push(branch);

            for (let j = 1; j < this._numberOfSubLevelBranches; j++)
            {
                if (direction == DirectionType.EAST)
                {
                    let newSunPositionOnCurve = sunPositionOnCurve + this._p5.randomGaussian(0, 0.15);
                    let level = this._p5.constrain(this._p5.randomGaussian(0.2, 0.2), 0.2, 0.5);
                    const newBranch =this._createBranch(branch, level, newSunPositionOnCurve); 
                    result.push(newBranch);

                    newSunPositionOnCurve = newSunPositionOnCurve + this._p5.randomGaussian(0, 0.15);
                    level = this._p5.constrain(this._p5.randomGaussian(0.2, 0.2), 0.2, 0.5);
                    result.push(this._createBranch(newBranch, j / 6, newSunPositionOnCurve));
                }
                else
                {
                    let newSunPositionOnCurve = sunPositionOnCurve + this._p5.randomGaussian(0, 0.2);
                    let level = this._p5.constrain(this._p5.randomGaussian(0.2, 0.2), 0.2, 0.5);
                    const newBranch =this._createBranch(branch, level, newSunPositionOnCurve); 
                    result.push(newBranch);

                    newSunPositionOnCurve = newSunPositionOnCurve + this._p5.randomGaussian(0, 0.2);
                    level = this._p5.constrain(this._p5.randomGaussian(0.2, 0.2), 0.2, 0.5);
                    result.push(this._createBranch(newBranch, j / 6, newSunPositionOnCurve));
                }
            }
        }

        return result;
    }

    
    _determineSunPositionOnCurveForDirection = (i: number, direction: DirectionType): number =>
    {
        let sunTime = 0;
        if (direction == DirectionType.EAST)
        {
            sunTime = this._p5.map(i, 1, this._numberOfFirstLevelBranches, 1, 0.5);
        }
        else
        {
            sunTime = this._p5.map(i, 1, this._numberOfFirstLevelBranches, 0.1, 0.5);
        }
        return sunTime;
    }

    _determineDirection = (counter: number): DirectionType =>
    {
        if (counter % 2 == 0)
        {
            return DirectionType.EAST;
        }
        return DirectionType.WEST;        
    }

    _createMainBranch = (x: number, height: number): Branch =>
    {
        const start = this._p5.createVector(x, height);
        const end = this._p5.createVector(x, this._drawHeight);
        const startControl = this._createStartControl(start, end);
        const endControl = this._createEndControl(start, end);

        const mainBranch = new Branch(this._p5, start, startControl, end, endControl, undefined, undefined);
        return mainBranch;
    }

    _createStartControl = (start: P5.Vector, end: P5.Vector): P5.Vector =>
    {
        const heading = P5.Vector.sub(start, end).heading();
        const length = start.dist(end);
        const force = P5.Vector.fromAngle(heading).normalize().mult(length);
        force.add(this._p5.createVector(0, 0));
        const startControl = start.copy().add(force);
        return startControl;
    }

    _createEndControl = (start: P5.Vector, end: P5.Vector): P5.Vector =>
    {
        const heading = P5.Vector.sub(end, start).heading();
        const length = start.dist(end);
        const force = P5.Vector.fromAngle(heading).normalize().mult(length);
        force.add(this._p5.createVector(0, 0));
        const endControl = end.copy().add(force);
        return endControl;
    }

    _createBranch = (parent: Branch, level: number, t: number): Branch => 
    {
        const x = this._p5.curvePoint(parent.startControl.x, parent.start.x, parent.end.x, parent.endControl.x, level);
        const y = this._p5.curvePoint(parent.startControl.y, parent.start.y, parent.end.y, parent.endControl.y, level);
        const start = this._p5.createVector(x, y);

        const end = start.copy();
        const attraction = this._sun.attract(end, t).limit(parent.length / 3);
        end.add(attraction);

        const startControl = this._createStartControl(start, end);
        const endControl = this._createEndControl(start, end);
        const branch = new Branch(this._p5, end, endControl, start, startControl, parent, level);
        return branch;
    }
}