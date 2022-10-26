export class Vector {

    #x = 0;
    #y = 0;
    #z = 0;
    #length = null;
    #squid = null;

    constructor(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;        
    }

    get x() { return this.#x; }
    get y() { return this.#y; }
    get z() { return this.#z; }

    get length() { 
        return this.#length ??= Math.sqrt(this.squid);
    };

    /** Return the squared Euclidian distance of this e */
    get squid() {
        return this.#squid ??= (this.#x * this.#x + this.#y * this.#y + this.#z * this.#z);
    }

    /** the unit X vector <1,0,0> */
    static X = new Vector(1, 0, 0);

    /** the unit Y vector <0,1,0> */
    static Y = new Vector(0, 1, 0);

    /** the unit Z vector <0,0,1> */
    static Z = new Vector(0, 0, 1);

    /** the zero vector, aka the origin <0,0,0> */
    static O = new Vector(0, 0, 0);

    /** return the dot-product of this vector and that vector */
    dot = (that) => this.x * that.x + this.y * that.y + this.z * that.z;

    /** return the cross-product of this vector and that vector */
    cross = (that) => new Vector(
        this.y * that.z - this.z * that.y,
        this.z * that.x - this.x * that.z,
        this.x * that.y - this.y * that.x
    );
    
    /** return a vector in which each component is divided by d */
    divide = d => new Vector(this.x / d, this.y / d, this.z / d);

    /** return a vector in the same direction whose length is 1 */
    unit = () => this.divide(this.length);

    /** return a vector of equal length and opposite direction */
    invert = () => new Vector(-this.x, -this.y, -this.z);

    /** add this vector to that vector, and return their sum */
    add = that => new Vector(this.x + that.x, this.y + that.y, this.z + that.z);

    /** calculate the difference between two vectors 
     * by subtracting that vector from this vector */
    subtract = that => new Vector(this.x - that.x, this.y - that.y, this.z - that.z);

    /** scale this vector by the specified factor */
    scale = (factor) => new Vector(this.x * factor, this.y * factor, this.z * factor);

    static from = (origin) => ({ to: target => target.subtract(origin) });
}

