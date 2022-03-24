import { THRESHOLD } from './settings.js';

export class Shape {

    constructor(texture) {
        this.texture = texture;
    }

    findIntersections = ray => [];

    closestDistanceAlongRay = (ray) => {
        let distances = this.findIntersections(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point) => this.texture.getColorAt(point);

    getNormalAt = point => Vector.O;
}
