// The maximum total intensity of an HTML color is 255+255+255 = 765
const MAX_INTENSITY = 765;

export class Color extends Material {
    constructor(r, g, b) {
        [this.r, this.g, this.b] = [r, g, b];
    }

    static White = new Color(255, 255, 255);
    static Black = new Color(0, 0, 0);
    static Gray50 = new Color(127, 127, 127);
    static Red = new Color(255,0,0);
    static Green = new Color(0,255,0);
    static Blue = new Color(0,0,255);
    static Yellow = new Color(255,255,0);

    getColorAt = _ => this;

    /** Clamp the supplied value between 0 and 255. 
     * Values < 0 become 0; values > 255 become 255. */
    clamp = value => (value > 0xff ? 0xff : value < 0 ? 0 : value);

    /** Clip the colour to prevent overflows, while maintaining 
     * the relative amounts of red/green/blue */
    clip = function () {
        let rr = this.r;
        let gg = this.g;
        let bb = this.b;
        var intensity = this.r + this.g + this.b;
        var overflow = intensity - MAX_INTENSITY;
        if (overflow > 0) {
            rr = rr + overflow * (rr / intensity);
            gg = gg + overflow * (gg / intensity);
            bb = bb + overflow * (bb / intensity);
        }
        return new Color(this.clamp(rr), this.clamp(gg), this.clamp(bb));
    }
    add = (that) => new Color(this.r + that.r, this.g + that.g, this.b + that.b);

    multiply = (that) => {
        let rr = Math.floor(this.r * that.r / 0xff);
        let gg = Math.floor(this.g * that.g / 0xff);
        let bb = Math.floor(this.b * that.b / 0xff);
        return new Color(rr, gg, bb);
    }

    scale = (factor) => new Color(this.r * factor, this.g * factor, this.b * factor);

    toString = () => `rgb(${this.r},${this.g},${this.b})`;
}
