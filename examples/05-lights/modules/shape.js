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
        colorToReturn = scene.lights
            .map(l => l.illuminate(point, normal, materialColor))
            .reduce((oldColor, newColor) => oldColor.add(newColor), colorToReturn);
        return colorToReturn;
    }
    getNormalAt = point => Vector.O;
}
