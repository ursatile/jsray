import { THRESHOLD } from './settings.js';
import { Vector } from './vector.js';
import { Color } from './color.js';

export class Shape {

    constructor(appearance) {
        this.appearance = appearance;
    }

    intersect = () => { throw ("Classes which extend Shape must implement intersect"); };

    getNormalAt = () => { throw ("Classes which extend Shape must implement getNormalAt"); }

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point, scene) => {
        let normal = this.getNormalAt(point);
        let color = Color.Black;
        scene.lights.forEach(light => {
            let v = Vector.from(point).to(light.position);
            let brightness = normal.dot(v.unit());
            if (brightness <= 0) return;

            let illumination = light.illuminate(this.appearance, point, brightness);
            color = color.add(illumination);
        });
        return color;
    }
}