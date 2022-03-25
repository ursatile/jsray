import { Shape } from '../shape.js';

export class Plane extends Shape {

    constructor(normal, distance, texture) {
        super(texture);
        this.normal = normal;
        this.distance = distance;
    }

    findIntersections = ray => {
        let angle = ray.direction.dot(this.normal);
        // if the dot-product is zero, the ray is perpendicular to the plane's normal,
        // therefore the ray is parallel to the plane and will never intersect.
        if (angle == 0) return [];

        let b = this.normal.dot(ray.start.add(this.normal.scale(this.distance).invert()));
        return [-b / angle];
    };

    getNormalAt = _ => this.normal;
}