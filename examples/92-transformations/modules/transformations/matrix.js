import { Vector } from "../vector";

export class Matrix {
    constructor() {
        var m = Array.prototype.concat.apply([], arguments);
        if (!m.length) {
            m = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
        this.m = new Float32Array(m);
    }
    toString = () => `[ ${this.m[0]}, ${this.m[1]}, ${this.m[2]}, ${this.m[3]},
  ${this.m[4]}, ${this.m[5]}, ${this.m[6]}, ${this.m[7]},
  ${this.m[8]}, ${this.m[9]}, ${this.m[10]}, ${this.m[11]},
  ${this.m[12]}, ${this.m[13]}, ${this.m[14]}, ${this.m[15]} ]`;

    // transformPoint = vector => {
    //     var m = this.m;
    //     return new Vector(
    //         m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3],
    //         m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7],
    //         m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11]
    //     ).divide(m[12] * v.x + m[13] * v.y + m[14] * v.z + m[15]);
    // };

    // ### .transformPoint(vector)
    //
    // Transforms the vector as a vector with a w coordinate of 0. This
    // means translations will have no effect, for example.
    //     transformVector: function (v) {
    //         var m = this.m;
    //         return new Vector(
    //             m[0] * v.x + m[1] * v.y + m[2] * v.z,
    //             m[4] * v.x + m[5] * v.y + m[6] * v.z,
    //             m[8] * v.x + m[9] * v.y + m[10] * v.z
    //         );
    //     }
    // };

    inverse = () => {
        let m = this.m;
        let inv = [
            +m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10],
            -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10],
            +m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6],
            -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6],

            -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10],
            +m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10],
            -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6],
            +m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6],

            +m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9],
            -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9],
            +m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5],
            -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5],

            -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9],
            +m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9],
            -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5],
            +m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5]
        ]
        var det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];
        return new Matrix(inv.map(i => i / det));
    };

    transpose = () => new Matrix([
        this.m[0], this.m[4], this.m[8], this.m[12],
        this.m[1], this.m[5], this.m[9], this.m[13],
        this.m[2], this.m[6], this.m[10], this.m[14],
        this.m[3], this.m[7], this.m[11], this.m[15]
    ]);

    apply = v => new Vector(
        v.x * this.m[0] + v.y * this.m[4] + v.z * this.m[8] + v.w * this.m[12],
        v.x * this.m[1] + v.y * this.m[5] + v.z * this.m[9] + v.w * this.m[13],
        v.x * this.m[2] + v.y * this.m[6] + v.z * this.m[10] + v.w * this.m[14],
        v.x * this.m[3] + v.y * this.m[7] + v.z * this.m[11] + v.w * this.m[15]
    );
    ylppa = v => this.inverse().transpose().apply(v);

    multiply = that => {
        var a = this.m, b = that.m;
        return new Matrix([
            a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
            a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
            a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
            a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],

            a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
            a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
            a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
            a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],

            a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
            a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
            a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
            a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],

            a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
            a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
            a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
            a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
        ]);
    };

    static identity = new Matrix([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    static scale = (x, y, z) => new Matrix([
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]);

    static translate = (x, y, z) => new Matrix([
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]);

    static rotate = (x, y, z, degrees) => {
        if (!degrees || (!x && !y && !z)) return this.identity();
        var abs = Math.sqrt(x * x + y * y + z * z);
        degrees *= Math.PI / 180; x /= abs; y /= abs; z /= abs;
        var c = Math.cos(degrees), s = Math.sin(degrees), t = 1 - c;
        return new Matrix([
            x * x * t + c, x * y * t - z * s, x * z * t + y * s, 0,
            y * x * t + z * s, y * y * t + c, y * z * t - x * s, 0,
            z * x * t - y * s, z * y * t + x * s, z * z * t + c, 0,
            0, 0, 0, 1
        ]);
    }
}
