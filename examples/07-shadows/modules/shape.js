import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';

// How much color do we see from areas that aren't illuminated by any light source?
const AMBIENT = 0.18;

export class Shape {

    constructor(texture) {
        this.texture = texture;
    }

    findIntersections = ray => [];

    closestDistanceAlongRay = (ray) => {
        let distances = this.findIntersections(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point, scene) => {
        let materialColor = this.texture.getColorAt(point);
        let colorToReturn = materialColor.scale(AMBIENT);
        let normal = this.getNormalAt(point);
        let otherShapes = scene.shapes.filter(s => s != this);
        scene.lights.forEach(light => {
            let lightDirection = light.position.add(point.invert());
            let brightness = normal.dot(lightDirection.normalize());
            if (brightness > 0) {
                // Trace a ray from this point to the light source. 
                // If that ray hits a shape before it hits the light, then we're in shadow
                let shadowRay = new Ray(point, lightDirection);
                let distanceToLight = lightDirection.length;
                let shadow = otherShapes.some(shape => shape.closestDistanceAlongRay(shadowRay) <= distanceToLight);
                if (!shadow) {
                    let illumination = materialColor.multiply(light.color).scale(brightness);
                    colorToReturn = colorToReturn.add(illumination);
                }
            }
        });
        return colorToReturn;
    }

    getNormalAt = point => Vector.O;
}
