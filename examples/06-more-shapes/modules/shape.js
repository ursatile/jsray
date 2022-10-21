import { Color } from './color.js';
import { THRESHOLD } from './settings.js';
export class Shape {

    constructor(color) {
        this.color = color;
    }

    intersect = ray => { throw("Classes which extend Shape must implement intersect"); };

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point, scene) => {
        let normal = this.getNormalAt(point);        
        let colorToReturn = Color.Black;
        scene.lights.forEach(light => {
            let lightDirection = light.position.subtract(point);
            let brightness = normal.dot(lightDirection.normalize());
            if (brightness > 0) {
                let illumination = this.color.multiply(light.color).scale(brightness);
                colorToReturn = colorToReturn.add(illumination);
            }
        });
        return colorToReturn;
    }

    getNormalAt = point => { throw("Classes which extend Shape must implement getNormalAt"); }
}
