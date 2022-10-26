import { Material } from '../material.js';

export class Chessboard extends Material {
    constructor(color1, color2, size = 1) {
        super();
        this.color1 = color1;
        this.color2 = color2;
        this.size = size;
    }
    getColorAt = point => {
        let rank = Math.abs(Math.round(point.x/this.size)) % 2;
        let file = Math.abs(Math.round(point.z/this.size)) % 2;
        return (rank == file ? this.color1 : this.color2);
    }
}

export class Stripes extends Material {
    constructor(color1, color2) {
        super();
        this.color1 = color1;
        this.color2 = color2;
    }
    getColorAt = point => Math.round(point.x) % 2 == 0 ? this.color1 : this.color2;
}

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