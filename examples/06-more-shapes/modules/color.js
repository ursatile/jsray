import { Material } from './material.js';

export class Color extends Material {

    #r = 0;
    #g = 0;
    #b = 0;    

    constructor(r, g, b) {
        super();
        this.#r = r;
        this.#g = g;
        this.#b = b;
    }

    getColorAt = () => this;

    get r() { return this.#r; }
    get g() { return this.#g; }
    get b() { return this.#b; }

    get rgba() { return [this.r, this.g, this.b, 0xFF] };
    get html() { return `rgb(${this.r},${this.g},${this.b})` };

    static White = new Color(255, 255, 255);
    static Black = new Color(0, 0, 0);
    static Grey = new Color(127, 127, 127);    
    static Red = new Color(255,0,0);
    static Green = new Color(0,255,0);
    static Blue = new Color(0,0,255);
    static Yellow = new Color(255,255,0);
    static Magenta = new Color(255,0,255);
    static Cyan = new Color(0,255,255);

    /** Parse an HTML color string like #fff, #abc123 or rgb(10,20,30), 
     * and return an array of [r,g,b,a] values */
    static parse = str => {
        str = str.replace(/\s/g, ''); // Remove all spaces
        let values, r, g, b;

        // Checks for 6 digit hex (#abc123) 
        if (values = /#([\da-f]{2})([\da-f]{2})([\da-f]{2})/i.exec(str)) {
            [r,g,b] = values.slice(1).map(c => parseInt(c, 16));
            return new Color(r,g,b);
        }

        // Checks for 3 digit hex (#abc) 
        if (values = /#([\da-f])([\da-f])([\da-f])/i.exec(str)) {
            [r,g,b] = values.slice(1).map(c => parseInt(c, 16) * 17);
            return new Color(r,g,b);
        }
        
        // Checks for rgb(1,2,3) string and cast using unary + operator
        if (values = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str)) {
            [r,g,b] = [+values[1], +values[2], +values[3]];
            return new Color(r,g,b);
        }

        throw Error(`Invalid color: ${str}`);
    }

    add = (that) => new Color(this.r + that.r, this.g + that.g, this.b + that.b);

    multiply = (that) => {
        let rr = Math.floor(this.r * that.r / 0xff);
        let gg = Math.floor(this.g * that.g / 0xff);
        let bb = Math.floor(this.b * that.b / 0xff);
        return new Color(rr, gg, bb);
    }

    scale = (factor) => new Color(this.r * factor, this.g * factor, this.b * factor);
}
