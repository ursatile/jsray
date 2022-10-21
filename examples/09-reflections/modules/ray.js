import { MAX_DEPTH } from './settings.js';

export class Ray {
    /** Construct a new ray starting from the specified start 
     * point, and pointing in the specified direction */
    constructor(start, direction) {
        this.start = start;
        this.direction = direction;
    }

    /** Trace this ray through the specified scene, and return the resulting color. */
    trace = (scene, depth = 0) => {
        if (depth > MAX_DEPTH) return scene.background;
        let distances = scene.shapes.map(s => s.closestDistanceAlongRay(this));
        let shortestDistance = Math.min.apply(Math, distances);
        if (shortestDistance == Infinity) return scene.background;
        let nearestShape = scene.shapes[distances.indexOf(shortestDistance)];
        let point = this.start.add(this.direction.scale(shortestDistance));
        return nearestShape.getColorAt(point, this, scene, depth + 1);
    }

    reflect = normal => {
        let inverse = this.direction.invert();
        return inverse.add(normal.scale(normal.dot(inverse)).add(this.direction).scale(2));
    }
    get length() { return this.direction.length; }

    /** Construct a new ray between two points by calling Ray.from(point1).to(point2) */
    static from = origin => ({ to: target => new Ray(origin, target.subtract(origin)) });

    toString = () => `${this.start.toString()} => ${this.direction.toString()}`;
}