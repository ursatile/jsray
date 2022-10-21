import { Color } from './color.js';
import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';
export class Shape {

    constructor(texture) {
        this.texture = texture;
    }

    intersect = ray => { throw("Classes which extend Shape must implement intersect"); };

    closestDistanceAlongRay = (ray) => {
        let distances = this.intersect(ray).filter(d => d > THRESHOLD);
        let shortestDistance = Math.min.apply(Math, distances);
        return shortestDistance;
    }

    getColorAt = (point, ray, scene) => {
        let baseColor = this.texture.getColorAt(point);
        let colorToReturn = baseColor.scale(this.texture.finish.ambient);
        let normal = this.getNormalAt(point);
        let reflex = ray.reflect(normal);
        let otherShapes = scene.shapes.filter(s => s != this);
        scene.lights.forEach(light => {
            let lightVector = light.position.subtract(point);
            let brightness = normal.dot(lightVector.normalize());
            if (brightness > 0) {                
                let shadowRay = new Ray(point, lightVector);
                let distanceToLight = lightVector.length;
                let shadow = otherShapes.some(shape => shape.closestDistanceAlongRay(shadowRay) <= distanceToLight);
                if (shadow) return;
                let illumination = baseColor.multiply(light.color).scale(brightness * this.texture.finish.diffuse);
                colorToReturn = colorToReturn.add(illumination);
                let specular = reflex.dot(lightVector.normalize());
                if (specular > 0) {
                    let exponent = 16 * this.texture.finish.specular * this.texture.finish.specular;
                    specular = Math.pow(specular, exponent);
                    colorToReturn = colorToReturn.add(light.color.scale(this.texture.finish.specular * specular));
                }
            }
        });
        return colorToReturn;
    }

    getNormalAt = point => { throw("Classes which extend Shape must implement getNormalAt"); }
}
