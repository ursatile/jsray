import { Color } from './color.js';
import { Matrix } from './transformations/matrix.js';
import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';

export class Shape {

    constructor(texture, transformations = []) {
        this.texture = texture;
        this.transform = transformations.reduce((previous, current) => previous.multiply(current), Matrix.identity)
        this.mrofsnart = this.transform.inverse().transpose();
        // console.log(this.constructor.name);
        // console.log(this.transform.toString());
        // console.log(this.mrofsnart.toString());
        // console.log(this.transform.multiply(this.mrofsnart).toString());
        console.log('------------------------------------------------');
    }

    intersect = ray => [];

    closestDistanceAlongRay = ray => {
        let localRay = this.worldToLocal(ray);
        var distances = this.intersect(localRay).filter(distance => distance > THRESHOLD);
        let distance = Math.min.apply(Math, distances);
        if (distance == Infinity) return distance;
        var result = (this.localToWorld(localRay.direction.scale(distance))).length;
        return result;
    }

    closestPointAlongRay = (ray) => {
        let distance = this.closestDistanceAlongRay(ray);
        return ray.direction.scale(distance);
    }

    reflect = (incident, normal) => {
        let inverse = incident.invert();
        return inverse.add(normal.scale(normal.dot(inverse)).add(incident).scale(2));
    }

    worldToLocal = thing => this.mrofsnart.apply(thing);

    localToWorld = thing => this.transform.apply(thing);

    getColorAt = (point, ray, scene, depth) => {
        let localPoint = this.worldToLocal(point);
        let localRay = this.worldToLocal(ray);
        let materialColor = this.texture.getColorAt(localPoint);
        let colorToReturn = materialColor.scale(this.texture.finish.ambient);
        let normal = this.localToWorld(this.getNormalAt(localPoint));
        let reflex = this.reflect(ray.direction, normal);
        let reflectionAmount = this.texture.finish.reflection;
        if (reflectionAmount) {
            // if (this.constructor.name == "Box") console.log(point.toString());            
            let reflectionRay = new Ray(point, reflex); // this.localToWorld(new Ray(localPoint, reflex));
            let reflectedColor = reflectionRay.trace(scene, depth);
            colorToReturn = colorToReturn.add(reflectedColor.scale(reflectionAmount));
        }

        let otherShapes = scene.shapes.filter(s => s != this);
        scene.lights.forEach(light => {
            let lightDirection = light.position.add(point.invert());
            let brightness = this.worldToLocal(normal).dot(lightDirection.unit());
            if (brightness > 0) {
                // Trace a ray from this point to the light source. 
                // If that ray hits a shape before it hits the light, then we're in shadow
                let shadowRay = new Ray(point, lightDirection);
                let distanceToLight = lightDirection.length;
                let shadow = otherShapes.some(shape => shape.closestDistanceAlongRay(shadowRay) <= distanceToLight);
                if (!shadow) {
                    let illumination = materialColor.multiply(light.color).scale(brightness * this.texture.finish.diffuse);
                    colorToReturn = colorToReturn.add(illumination);

                    let specular = reflex.dot(lightDirection.unit());
                    if (specular > 0) {
                        let exponent = 16 * this.texture.finish.specular * this.texture.finish.specular;
                        specular = Math.pow(specular, exponent);
                        colorToReturn = colorToReturn.add(light.color.scale(this.texture.finish.specular * specular));
                    }
                }
            }
        });
        return colorToReturn;
    }

    getNormalAt = point => Vector.O;
}
