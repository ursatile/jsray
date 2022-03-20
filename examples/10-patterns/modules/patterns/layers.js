import { Material } from '../material.js';
import { ColorMap } from './colormap.js';

export class Layers extends Material {
    constructor(colors) {
        super();
        this.colorMap = new ColorMap(colors);
    }
    getColorAt = point => this.colorMap.getColorAtValue(point.y);
}
