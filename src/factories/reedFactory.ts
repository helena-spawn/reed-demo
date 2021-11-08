import P5 from "p5";
import Branch from "../shapes/branch";
import Sun from "../shapes/sun";
import Reed from "../shapes/reed";
import DirectionType from "../directionType";
import SunFactory from "./sunFactory";

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
    sunFactory: SunFactory;

    constructor(p5: P5, 
        canvasWidth: number, 
        drawHeight: number, 
        canvasHeight: number, 
        sunFactory: SunFactory)
    {
        this._p5 = p5;
        this._canvasWidth = canvasWidth;
        this._drawHeight = drawHeight;
        this._canvasHeight = canvasHeight;
        this._counter = 0;
        
        this._numberOfFirstLevelBranches = 11;
        this._numberOfSubLevelBranches = 6;

        this._sun = sunFactory.create();
    }

    createReed = (x: number, height: number): Reed =>
    {
        const allBranches = this._create(x, height);
        const reed = new Reed(this._p5, allBranches);

        return reed;
    }

    _create = (x: number, height: number): Array<Branch> =>
    {
        let result = new Array<Branch>();
        
        const trunk = this._createTrunk(x, height);
        result.push(trunk);

        for (let i = 1; i < this._numberOfFirstLevelBranches; i++)
        {
            const direction = this._determineCardinalDirection(i);
            const level = 1 - (i / this._numberOfFirstLevelBranches);
            this._createBranch(trunk, direction, result, i, level, this._numberOfFirstLevelBranches);
        }

        return result;
    }
    
    _determineSunPositionOnCurveForDirection = (i: number, direction: DirectionType): number =>
    {
        let sunTime = 0;
        if (direction == DirectionType.EAST)
        {
            sunTime = this._p5.map(i, 1, this._numberOfFirstLevelBranches, 0.85, 0.5);
        }
        else
        {
            sunTime = this._p5.map(i, 1, this._numberOfFirstLevelBranches, 0.15, 0.5);
        }
        return sunTime;
    }

    _determineCardinalDirection = (counter: number): DirectionType =>
    {
        if (counter % 2 == 0)
        {
            return DirectionType.EAST;
        }
        return DirectionType.WEST;        
    }

    _createTrunk = (x: number, height: number): Branch =>
    {
        const start = this._p5.createVector(x, height);
        const end = this._p5.createVector(x, this._drawHeight);
        const startControl = this._createStartControl(start, end);
        const endControl = this._createEndControl(start, end);

        const trunk = new Branch(this._p5, start, startControl, end, endControl, undefined, undefined);
        return trunk;
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

    _createBranch = (parent: Branch, 
        direction: DirectionType, 
        branchContainer: Array<Branch>, 
        index: number, 
        level: number, 
        iterations: number): Array<Branch> => 
    {
        // create connector to the parent
        const start = this._getConnectorToTheParent(parent, level);
        
        const end = start.copy();
        
        // some magic nudging of the sun to get a different growth direction
        index = index + this._p5.random(-2, 2); 
        let sunPositionOnCurve = this._determineSunPositionOnCurveForDirection(index, direction);
        const attraction = this._sun.attract(end, sunPositionOnCurve).limit(parent.length / 2.5);
        end.add(attraction);

        const startControl = this._createStartControl(start, end);
        const endControl = this._createEndControl(start, end);

        const branch = new Branch(this._p5, end, endControl, start, startControl, parent, level);
        branchContainer.push(branch);

        if (iterations == 0)
        {  
            return branchContainer;
        }
        else
        {
            // some magic nudging of the level to obtain different connector nodes 
            // in the next recursive call
            const nextLevel = this._p5.constrain(this._p5.randomGaussian(0.3, 0.5), 0.1, 0.8);
            this._createBranch(branch, direction, branchContainer, index, nextLevel, iterations -1);
        }
    }

    _getConnectorToTheParent = (parent: Branch, level): P5.Vector =>
    {
        const x = this._p5.curvePoint(parent.startControl.x, parent.start.x, parent.end.x, parent.endControl.x, level);
        const y = this._p5.curvePoint(parent.startControl.y, parent.start.y, parent.end.y, parent.endControl.y, level);
        const start = this._p5.createVector(x, y);
        return start;
    }
}