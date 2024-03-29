import { Color } from './color.js';
import { Finish } from './finish.js';

export class Texture {

    constructor(material, finish) {
        this.material = material ?? Color.Grey;
        this.finish = finish ?? Finish.Default;
    }

    getColorAt = point => this.material.getColorAt(point);

}

export { Color, Finish };