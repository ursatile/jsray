import { Material } from '../material.js';
import { ColorMap } from './colormap.js';

export class Rings extends Material {
    constructor(colors) {
        super();
        this.colorMap = new ColorMap(colors);
    }
    getColorAt = point => this.colorMap.getColorAtValue(Math.sqrt(point.x * point.x + point.z * point.z));
}
