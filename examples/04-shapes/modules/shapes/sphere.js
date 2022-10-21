import { Shape } from '../shape.js';

export class Sphere extends Shape {
    constructor(center, radius, color) {
        super(color);
        this.center = center;
        this.radius = radius;
    }

    findIntersections = ray => {
        let rd = ray.direction;
        // Offset - the position of the sphere relative to the start of the ray
        let os = ray.start.subtract(this.center);

        // Calculate a,b,c so we can plug them into the quadratic formula
        let a = rd.squid;
        let b = 2 * os.dot(rd);
        let c = os.squid - this.radius * this.radius;

        let discriminant = b * b - 4 * a * c;

        // If b^2-4ac is negative, the ray never intersects the sphere.
        // Math nerds: that means the quadratic equation has complex solutions ;)
        if (discriminant < 0) return [];

        // If the root is zero, the ray touches the surface of the sphere
        // but doesn't actually go through it, so there is only one intersection.        
        if (discriminant == 0) return [-b / (2 * a)];

        // Otherwise we have two intersections - one on the way in, one on the way out.
        let root = Math.sqrt(discriminant);

        return [
            (-b - root) / (2 * a),
            (-b + root) / (2 * a)
        ];
    };
}