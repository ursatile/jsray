import { Material } from '../material.js';

export class Stripes extends Material {
    constructor(color1, color2) {
        super();
        this.color1 = color1;
        this.color2 = color2;
    }
    getColorAt = point => Math.round(point.x) % 2 == 0 ? this.color1 : this.color2;
}
