import { Shape } from '../shape.js';

export class Plane extends Shape {

    constructor(normal, distance, appearance) {
        super(appearance);
        this.normal = normal;
        this.distance = distance;
    }

    intersect = ray => {
        let angle = ray.direction.dot(this.normal);
        // if the dot-product is zero, the ray is perpendicular to the plane's normal,
        // therefore the ray is parallel to the plane and will never intersect.
        if (angle == 0) return [];

        let b = this.normal.dot(ray.start.subtract(this.normal.scale(this.distance)));
        return [-b / angle];
    };

    getNormalAt = _ => this.normal;
}