import P5 from "p5";

export default class Branch
{
    _p5:P5;
    start: P5.Vector;
    startControl: P5.Vector;
    end: P5.Vector;
    endControl: P5.Vector;
    endControlBase: P5.Vector;
    startControlBase: P5.Vector;
    acceleration: P5.Vector;
    velocity: P5.Vector;
    parent: Branch
    level: number;
    length: number;

    constructor(
        p5: P5, 
        start: P5.Vector, 
        startControl: P5.Vector,  
        end: P5.Vector, 
        endControl: P5.Vector,  
        parent: Branch, 
        level: number)
    {
        this._p5 = p5;
        this.parent = parent;
        this.start = start;
        this.rewriteStart();
        
        this.end = end;
        this.endControlBase = endControl.copy();
        this.velocity = this._p5.createVector(0, 0);
        this.acceleration = this._p5.createVector(0, 0);
        this.level = level;
        this.length = start.dist(end);

        this.startControl = startControl;
        this.endControl = endControl;
        this.startControlBase = startControl.copy();
    }

    rewriteStart = (): void =>
    {
        if (this.parent)
        {
            const x = this._p5.curvePoint(
                this.parent.startControl.x, 
                this.parent.start.x, 
                this.parent.end.x, this.parent.endControl.x, 
                this.level);
            const y = this._p5.curvePoint(
                this.parent.startControl.y, 
                this.parent.start.y, 
                this.parent.end.y, 
                this.parent.endControl.y, 
                this.level);
            this.end = this._p5.createVector(x, y);
        }
    }

    draw = (debug: boolean): void =>
    {
        this.update();
        this.display(debug);
    }

    display = (debug: boolean): void =>
    {
        const defaultStrokeWidth = 3;
        const defaultStrokeColor = "black";
        this._p5.noFill();
        if (debug)
        {
            const startNodeControlColor = "blue"
            const startNodeColor = "green";
            const endNodeColor = "red";
            const endNodeControlColor = "orange";
            const nodeStrokeWidth = 10;
            this._p5.strokeWeight(nodeStrokeWidth);
            this._p5.stroke(startNodeControlColor);
            this._p5.point(this.startControl.x, this.startControl.y);

            this._p5.strokeWeight(nodeStrokeWidth);
            this._p5.stroke(startNodeColor);
            this._p5.point(this.start.x, this.start.y);

            this._p5.strokeWeight(nodeStrokeWidth);
            this._p5.stroke(endNodeColor);
            this._p5.point(this.end.x, this.end.y);

            this._p5.strokeWeight(nodeStrokeWidth);
            this._p5.stroke(endNodeControlColor);
            this._p5.point(this.endControl.x, this.endControl.y);
        }

        this._p5.strokeWeight(defaultStrokeWidth);
        this._p5.stroke(defaultStrokeColor);
        this._p5.curveVertex(this.startControl.x, this.startControl.y);
        
        this._p5.strokeWeight(defaultStrokeWidth);
        this._p5.stroke(defaultStrokeColor);
        this._p5.curveVertex(this.start.x, this.start.y);
        
        this._p5.strokeWeight(defaultStrokeWidth);
        this._p5.stroke(defaultStrokeColor);
        this._p5.curveVertex(this.end.x, this.end.y);
        
        this._p5.strokeWeight(defaultStrokeWidth);
        this._p5.stroke(defaultStrokeColor);
        this._p5.curveVertex(this.endControl.x, this.endControl.y);
    }

    animate = (x: number): void =>
    {
        const force: P5.Vector = this._p5.createVector(10, 0);
        force.mult(-1);
        if (x < this.start.x)
        {
            force.mult(-1);
        }
        this.applyForce(force);
    }

    update = (): void =>
    {
        const wind = this._p5.createVector(0.1, 0);
        wind.add(this.acceleration);

        this.applyWind(wind);
        this.applyBounds();
        this.applyDrag();
    }

    applyWind = (wind:P5.Vector): void =>
    {
        this.startControl.add(wind);
        this.start.add(wind.copy().mult(0.5));
    }

    applyForce = (force: P5.Vector): void =>
    {
        this.acceleration.add(force);
    }

    applyBounds = (): void =>
    {
        const force: P5.Vector = this._p5.createVector(1, 0);
        if (this.startControl.x > this.startControlBase.x)
        {
            force.mult(-1);
        }
        
        this.applyForce(force);  
    }

    applyDrag = ():void =>
    {
        const drag: P5.Vector = this.acceleration.copy();
        const speedSquared: number = drag.magSq();
        const constant = -0.01;
        drag.normalize();
        drag.mult(constant * speedSquared);
        this.applyForce(drag);
    }
}