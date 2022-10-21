export class Shape {

    constructor(color) {
        this.color = color;
    }

    findIntersections = ray => [];

    closestDistanceAlongRay = (ray) => {
        let distances = this.findIntersections(ray);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }
}
