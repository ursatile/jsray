class Material {
    constructor() { }
    getColorAt = point => Color.Gray50;
}

// The maximum total intensity of an HTML color is 255+255+255 = 765
const MAX_INTENSITY = 765;

export class Color extends Material {
    static White = new Color(255, 255, 255);
    static Black = new Color(0, 0, 0);
    static Gray50 = new Color(127, 127, 127);

    constructor(r, g, b) {
        super();
        if (g == undefined) {
            [this.r, this.g, this.b] = this.parseHtmlColor(r);
        } else {
            [this.r, this.g, this.b] = [r, g, b];
        }
    }

    getColorAt = _ => this;

    /** Clamp the supplied value between 0 and 255. Values < 0 become 0; values > 255 become 255. */
    clamp = value => (value > 0xff ? 0xff : value < 0 ? 0 : value);

    /** Clip the colour to prevent overflows, while maintaining the relative amounts of red/green/blue */
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

    /** Parse an HTML color string like #fff, #abc123 or rgb(10,20,30), and return an array of [r,g,b,a] values */
    parseHtmlColor = str => {
        str = str.replace(/\s/g, ''); // Remove all spaces
        let values;
        // Checks for 6 digit hex and converts string to integer
        if (values = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(str)) return values.slice(1).map(c => parseInt(c, 16));
        // Checks for 3 digit hex and converts string to integer
        if (values = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(str)) return values.slice(1).map(c => parseInt(c, 16) * 17);
        // Checks for rgba and converts string to integer/float using unary + operator to save bytes
        if (values = /rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(str)) return [+values[1], +values[2], +values[3], +values[4]];
        // Checks for rgb and converts string to integer/float using unary + operator to save bytes
        if (values = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str)) return [+values[1], +values[2], +values[3]];
        else throw Error(`Invalid color: ${str}`);
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