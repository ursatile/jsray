import { THRESHOLD } from './settings.js';
import { Vector } from './vector.js';
import { Color } from './color.js';
import { Ray } from './ray.js';
import { Finish } from './finish.js';

export class Shape {

    constructor(appearance) {
        this.appearance = appearance;
        if (! this.appearance.finish) this.appearance.finish = Finish.Default;
    }

    intersect = () => { throw ("Classes which extend Shape must implement intersect"); };

    getNormalAt = () => { throw ("Classes which extend Shape must implement getNormalAt"); }

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    /** return true if the specified light casts a shadow of this shape at the specified point  */
    castsShadowFor = (point, vector) => {
        let distanceToLight = vector.length;
        let ray = new Ray(point, vector);
        return (this.closestDistanceAlongRay(ray) <= distanceToLight);
    }

    getColorAt = (point, ray, scene, depth) => {
        let normal = this.getNormalAt(point);
        let color = this.appearance.getAmbientColorAt(point);
        let reflex = ray.reflect(normal);
        
        let reflection = this.appearance.reflect(point, reflex, scene, depth);
        color = color.add(reflection);

        scene.lights.forEach(light => {
            let v = Vector.from(point).to(light.position);

            // If this point is in shadow, do not add any illumination for this light source
            if (scene.shapes.some(shape => shape.castsShadowFor(point, v))) return;

            let brightness = normal.dot(v.unit());
            if (brightness <= 0) return;            

            let illumination = light.illuminate(this.appearance, point, brightness);
            color = color.add(illumination);

            let highlight = this.appearance.finish.addHighlight(reflex, light, v);
            color = color.add(highlight);            
        });
        return color;
    }
}
