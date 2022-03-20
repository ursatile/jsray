export class Ray {
    /** Construct a new ray starting from the specified start 
     * point, and pointing in the specified direction */
    constructor(start, direction) {
        this.start = start;
        this.direction = direction;
    }
    /** Trace this ray through the specified scene, and return the resulting color. */
    trace = (scene) => {
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
        return nearestIntersectingShape.getColorAt(point, scene);
    }
}