import { THRESHOLD } from './settings.js';

export class Shape {

    constructor(color) {
        this.color = color;
    }

    intersect = () => { throw ("Classes which extend Shape must implement intersect"); };

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }
}
