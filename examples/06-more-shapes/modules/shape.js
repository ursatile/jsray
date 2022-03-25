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
        scene.lights.forEach(light => {
            let lightDirection = light.position.add(point.invert());
            let brightness = normal.dot(lightDirection.normalize());
            if (brightness > 0) {
                let illumination = materialColor.multiply(light.color).scale(brightness);
                colorToReturn = colorToReturn.add(illumination);
            }
        });
        return colorToReturn;
    }

    getNormalAt = point => Vector.O;
}
