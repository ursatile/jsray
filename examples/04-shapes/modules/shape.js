import { THRESHOLD } from './settings.js';

export class Shape {

    constructor(material) {
        this.material = material;
    }

    findIntersections = ray => [];

    closestDistanceAlongRay = (ray) => {
        var intersections = this.findIntersections(ray).filter(distance => distance > THRESHOLD);
        return Math.min.apply(Math, intersections);
    }

    getColorAt = (point) => this.material.getColorAt(point);

    getNormalAt = point => Vector.O;
}
