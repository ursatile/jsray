import { Material } from '../material.js';

export class Chessboard extends Material {
    constructor(color1, color2, size = 1) {
        super();
        this.color1 = color1;
        this.color2 = color2;
        this.size = size;
    }
    getColorAt = point => {
        let rank = Math.floor(point.x/this.size) % 2;
        let file = Math.floor(point.z/this.size) % 2;
        let light = ((rank ^ file) & 1) == 1;
        return (light ? this.color1 : this.color2);
    }
}

export class Chessblock extends Material {
    constructor(color1, color2, size = 1) {
        super();
        this.color1 = color1;
        this.color2 = color2;
        this.size = size;
    }

    getColorAt = point => {
        let rank = Math.floor(point.x/this.size) % 2;
        let file = Math.floor(point.z/this.size) % 2;
        let alti = Math.floor(point.y/this.size) % 2;
        let light = ((rank ^ file ^ alti) & 1) == 1;
        return (light ? this.color1 : this.color2);
    }
}