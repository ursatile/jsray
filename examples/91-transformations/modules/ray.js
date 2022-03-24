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
        let intersectionPoint = null;
        scene.shapes.forEach(shape => {
            let shapePoint = shape.closestPointAlongRay(this);
            if (shapePoint.length < distanceToNearestShape) {
                distanceToNearestShape = shapePoint.length;
                nearestIntersectingShape = shape;
                intersectionPoint = this.start.add(shapePoint);
            }
            // let distance = shape.closestDistanceAlongRay(this);
            // if (distance < distanceToNearestShape) {
            //     distanceToNearestShape = distance;
            //     nearestIntersectingShape = shape;
            // }
        });
        if (distanceToNearestShape == Infinity) return scene.background;
        //intersectionPoint = this.start.add(this.direction.scale(distanceToNearestShape));
        return nearestIntersectingShape.getColorAt(intersectionPoint, this, scene, depth + 1);
    }

    toString = () => `${this.start.toString()} => ${this.direction.toString()}`;
}