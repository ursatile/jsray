import { THRESHOLD } from './settings.js';

export class Shape {

    constructor(material) {
        this.material = material;
    }

    findIntersections = ray => [];

    closestDistanceAlongRay = (ray) => {
        let distances = this.findIntersections(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point) => this.material.getColorAt(point);

    getNormalAt = point => Vector.O;
}
