export class Shape {

    constructor(color) {
        this.color = color;
    }

    intersect = ray => [];

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }
}
