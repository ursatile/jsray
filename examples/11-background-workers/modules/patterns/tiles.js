import { Material } from '../material.js';

export class Tiles extends Material {
    constructor(size, spacing, color1, color2) {
        super();
        this.size = size;
        this.spacing = spacing;
        this.color1 = color1;
        this.color2 = color2;
    }
    getColorAt = point => {
        let xs = this.size.x + this.spacing;
        let ys = this.size.y + this.spacing;
        let zs = this.size.z + this.spacing;
        let xx = (((point.x - xs / 2) % xs) + xs) % xs;
        let yy = (((point.y - ys / 2) % ys) + ys) % ys;
        let zz = (((point.z - zs / 2) % zs) + zs) % zs;
        if (xx < this.spacing || yy < this.spacing || zz < this.spacing) return this.color2;
        return this.color1;
    }
}