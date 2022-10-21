import { Color } from './color.js';
export class Shape {

    constructor(color) {
        this.color = color;
    }

    intersect = ray => { throw("Classes which extend Shape must implement intersect"); };

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray);
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

    getNormalAt = point => { throw("Classes which extend Shape must implement getNormalAt"); }
}