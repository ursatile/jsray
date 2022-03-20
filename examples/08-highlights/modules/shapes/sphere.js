import { Shape } from '../shape.js';

export class Sphere extends Shape {
    constructor(center, radius, material) {
        super(material);
        this.center = center;
        this.radius = radius;
    }

    findIntersections = ray => {
        // Sphere intersections are calculated using the quadratic formula. You might remember it from school. :)
        let a = Math.pow(ray.direction.x, 2)
            + Math.pow(ray.direction.y, 2)
            + Math.pow(ray.direction.z, 2);
        let b = 2 * (ray.start.x - this.center.x) * ray.direction.x
            + 2 * (ray.start.y - this.center.y) * ray.direction.y
            + 2 * (ray.start.z - this.center.z) * ray.direction.z;
        let c = Math.pow(ray.start.x - this.center.x, 2)
            + Math.pow(ray.start.y - this.center.y, 2)
            + Math.pow(ray.start.z - this.center.z, 2)
            - Math.pow(this.radius, 2);

        let discriminant = b * b - 4 * a * c;
        // If discriminant is negative, that means the ray never intersects the sphere.
        // (For math nerds: that means the quadratic equation has complex solutions!)
        if (discriminant < 0) return [];
        // If the discriminant is exactly zero, the ray touches the surface of the sphere 
        // but doesn't actually go through it, so there is only a single intersection.
        if (discriminant == 0) return [-b / (2 * a)];
        // Otherwise we have two intersections - one on the way in, one on the way out.
        return [
            (-b - Math.sqrt(discriminant)) / (2 * a),
            (-b + Math.sqrt(discriminant)) / (2 * a)
        ];
    };
    getNormalAt = point => point.add(this.center.invert()).normalize();
}