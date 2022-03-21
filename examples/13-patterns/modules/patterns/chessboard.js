import { Material } from '../material.js';

export class Chessboard extends Material {
    constructor(color1, color2) {
        super();
        this.color1 = color1;
        this.color2 = color2;
    }
    getColorAt = point => Math.abs(Math.round(point.x)) % 2 == Math.abs(Math.round(point.z)) % 2 ? this.color1 : this.color2;
}