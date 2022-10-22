import { Vector } from './vector.js';
import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';
export class Shape {

    constructor(texture) {
        this.texture = texture;
    }

    intersect = ray => { throw("Classes which extend Shape must implement intersect"); };

    getNormalAt = point => { throw("Classes which extend Shape must implement getNormalAt"); }

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }
    /** Returns true if this shape would block a ray of light from point1 to point2 */
    occludes = (origin, target) => {
        let ray = Ray.from(origin).to(target);
        return this.closestDistanceAlongRay(ray) <= ray.length;
    }

    getColorAt = (point, ray, scene, depth) => {
        let color = this.texture.getAmbientColorAt(point);        
        let normal = this.getNormalAt(point);
        let reflex = ray.reflect(normal);

        color = color.add(this.texture.reflect(point, reflex, scene, depth));

        scene.lights.forEach(light => {

            let shadow = scene.shapes.some(shape => shape.occludes(point, light.position));
            if (shadow) return;

            let vector = Vector.from(point).to(light.position);
            let brightness = normal.dot(vector.normalize());
            if (brightness <= 0) return;
            
            color = color
                .add(this.texture.illuminate(point, light, brightness))
                .add(this.texture.highlight(reflex, light, vector));
                      
        });
        return color;
    }
}
