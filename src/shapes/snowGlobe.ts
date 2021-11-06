import Bottom from "./bottom";
import Sun from "./sun";

export default class SnowGlobe
{
    _bottom: Bottom;
    _arc: Sun;
    constructor(arc: Sun, bottom: Bottom)
    {
        this._bottom = bottom;
        this._arc = arc;
    }

    display = (debug: boolean): void =>
    {
        this._arc.display(debug);
        this._bottom.display(debug);
    }
}