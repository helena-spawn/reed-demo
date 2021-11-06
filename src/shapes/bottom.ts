import P5 from "p5";

export default class Bottom
{
    _p5: P5;
    _lines: Array<P5.Vector>;
    _color: string;
    constructor(p5: P5, lines: Array<P5.Vector>, color: string)
    {
        this._p5 = p5;
        this._lines = lines;
        this._color = color;
    }

    display = (debug: boolean): void =>
    {
        this._p5.stroke("black");
        this._p5.strokeWeight(2);
        this._p5.fill(this._color);
        this._p5.beginShape();
        for (let i = 0; i < this._lines.length; i++)
        {
            if (i < this._lines.length - 1)
            {
                this._p5.vertex(this._lines[i].x, this._lines[i].y);
                this._p5.vertex(this._lines[i+1].x, this._lines[i+1].y);
            }    
        }
        this._p5.endShape();
    }

}