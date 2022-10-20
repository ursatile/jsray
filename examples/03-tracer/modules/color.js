export class Color {
    constructor(r, g, b) {
        if (g == undefined) {
            [this.r, this.g, this.b] = this.parseHtmlColor(r);
        } else {
            [this.r, this.g, this.b] = [r, g, b];
        }
    }

    static White = new Color("#fff");
    static Black = new Color("#000");
    static Gray50 = new Color("#888");

    /** Parse an HTML color string like #fff, #abc123 or rgb(10,20,30), 
     * and return an array of [r,g,b,a] values */
    parseHtmlColor = str => {
        str = str.replace(/\s/g, ''); // Remove all spaces
        let values;        

        // Checks for 6 digit hex (#abc123) 
        if (values = /#([\da-f]{2})([\da-f]{2})([\da-f]{2})/i.exec(str)) {
            return values.slice(1).map(c => parseInt(c, 16));
        }

        // Checks for 3 digit hex (#abc) 
        if (values = /#([\da-f])([\da-f])([\da-f])/i.exec(str)) {
            return values.slice(1).map(c => parseInt(c, 16) * 17);
        }

        // Checks for rgb(1,2,3) string and cast using unary + operator
        if (values = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str)) {
            return [+values[1], +values[2], +values[3]];
        }

        throw Error(`Invalid color: ${str}`);
    }

    toString = () => `rgb(${this.r},${this.g},${this.b})`;
}
