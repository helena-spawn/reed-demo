import P5 from "p5";
import Branch from "./Branch";

export default class Reed
{
    _p5:P5;
    _branches: Array<Branch>;
    constructor(p5: P5, branches: Array<Branch>)
    {
        this._p5 = p5;
        this._branches = branches;      
    }

    display = (debug: boolean):void =>
    {
        this._branches.forEach(element => 
        {   
            this._p5.beginShape();
            element.draw(debug);
            element.rewriteStart();
            this._p5.endShape();
        });
    }

    animate = (x: number): void =>
    {
        this._branches.forEach(element => 
        {
            element.animate(x);
        });
    }
}