import { Color } from './color.js';

export class Light {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }

    illuminate = (point, normal, color) => {
        let direction = this.position.add(point.invert());
        let brightness = normal.dot(direction.normalize());
        return color.multiply(this.color).scale(brightness);
    }
}