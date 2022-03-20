import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';

// How much color do we see from areas that aren't illuminated by any light source?
const AMBIENT = 0.1;

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
