export class Color {
    constructor(r, g, b) {
        [this.r, this.g, this.b] = [r, g, b];
    }

    toString = () => `rgb(${this.r},${this.g},${this.b})`;
}
