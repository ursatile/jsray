import { Color } from './color.js';
import { THRESHOLD } from './settings.js';
export class Shape {

    constructor(color) {
        this.color = color;
    }

    findIntersections = ray => { throw("You need to implement findIntersections in derived classes"); };

    closestDistanceAlongRay = (ray) => {
        let distances = this.findIntersections(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point, scene) => {
        let normal = this.getNormalAt(point);        
        let colorToReturn = Color.Black;
        scene.lights.forEach(light => {
            let lightDirection = light.position.subtract(point).normalize();
            let brightness = normal.dot(lightDirection);
            if (brightness > 0) {
                let illumination = this.color.multiply(light.color).scale(brightness);
                colorToReturn = colorToReturn.add(illumination);
            }
        });
        return colorToReturn;
    }

    getNormalAt = point => { throw("You need to implement getNormalAt in derived classes"); }
}
