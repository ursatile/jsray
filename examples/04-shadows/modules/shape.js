import { THRESHOLD } from './settings.js';
import { Ray } from './ray.js';
import { Color } from './material.js';

export class Shape {
    constructor(material) {
        this.material = material;
    }
    findIntersections = ray => [];
    closestDistanceAlongRay = (ray) => {
        var intersections = this.findIntersections(ray).filter(distance => distance > THRESHOLD);
        return Math.min.apply(Math, intersections);
    }
    getColorAt = (point, scene) => {
        let materialColor = this.material.getColorAt(point);
        let colorToReturn = materialColor.scale(0);
        let normal = this.getNormalAt(point);
        scene.lights.forEach(light => {
            let lightDirection = light.position.add(point.invert()).normalize();
            let brightness = normal.dot(lightDirection);
            if (brightness > 0) {
                let illumination = materialColor.multiply(light.color).scale(brightness);
                colorToReturn = colorToReturn.add(illumination);
            }
        });
        return colorToReturn;
    }
    getNormalAt = point => Vector.O;
}
