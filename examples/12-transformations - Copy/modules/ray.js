import { MAX_DEPTH } from './settings.js';
import { Vector } from './vector.js';

export class Ray {
    /** Construct a new ray starting from the specified start 
     * point, and pointing in the specified direction */
    constructor(start, direction) {
        this.start = new Vector(start.x, start.y, start.z, 1); // start;
        this.direction = direction.normalize();
    }
    /** Trace this ray through the specified scene, and return the resulting color. */
    trace = (scene, depth = 0) => {
        if (depth > MAX_DEPTH) return scene.background;
        let distanceToNearestShape = Infinity;
        let nearestIntersectingShape = null;
        //let point = null;
        scene.shapes.forEach(shape => {
            //let intersect = shape.closestPointAlongRay(this);
            let distance = shape.closestDistanceAlongRay(this); // intersect.length;
            if (distance < distanceToNearestShape) {
                distanceToNearestShape = distance;
                nearestIntersectingShape = shape;
                //point = intersect;
            }
        });
        if (distanceToNearestShape == Infinity) return scene.background;
        let point = this.start.add(this.direction.scale(distanceToNearestShape));
        return nearestIntersectingShape.getColorAt(point, this, scene, depth + 1);
    }

    toString = () => `${this.start.toString()} => ${this.direction.toString()}`;
}