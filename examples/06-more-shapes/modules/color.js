export class Color {
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
