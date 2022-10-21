import { MAX_DEPTH } from './settings.js';

export class Ray {
    /** Construct a new ray starting from the specified start 
     * point, and pointing in the specified direction */
    constructor(start, direction) {
        this.start = start;
        this.direction = direction.normalize();
    }
    /** Trace this ray through the specified scene, and return the resulting color. */
    trace = (scene, depth = 0) => {
        if (depth > MAX_DEPTH) return scene.background;
        let distanceToNearestShape = Infinity;
        let nearestIntersectingShape = null;
        scene.shapes.forEach(shape => {
            let distance = shape.closestDistanceAlongRay(this);
            if (distance < distanceToNearestShape) {
                distanceToNearestShape = distance;
                nearestIntersectingShape = shape;
            }
        });
        if (distanceToNearestShape == Infinity) return scene.background;
        let point = this.start.add(this.direction.scale(distanceToNearestShape));
        return nearestIntersectingShape.getColorAt(point, this, scene, depth + 1);
    }

    reflect = normal => {
        let inverse = this.direction.invert();
        return inverse.add(normal.scale(normal.dot(inverse)).add(this.direction).scale(2));
    }

    toString = () => `${this.start.toString()} => ${this.direction.toString()}`;
}