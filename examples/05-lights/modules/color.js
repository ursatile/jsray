
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

    toString = () => `rgb(${this.r},${this.g},${this.b})`;
}
