import { Color } from './color.js';
import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';

export class Shape {

    constructor(texture, transformations = []) {
        this.texture = texture;
        this.transformations = transformations;
    }

    findIntersections = ray => [];

    closestDistanceAlongRay = ray => {
        let roo = this.worldToShape(ray);
        var distances = this.findIntersections(roo).filter(distance => distance > THRESHOLD);
        let distance = Math.min.apply(Math, distances);
        return this.shapeToWorld(roo.direction.scale(distance)).length;
    }

    closestPointAlongRay = (ray) => {
        let distance = this.closestDistanceAlongRay(ray);
        return ray.direction.scale(distance);
    }

    reflect = (incident, normal) => {
        let inverse = incident.invert();
        return inverse.add(normal.scale(normal.dot(inverse)).add(incident).scale(2));
    }

    worldToShape = thing => {
        if (thing.start && thing.direction) return new Ray(this.worldToShape(thing.start), this.worldToShape(thing.direction))
        for (var t = this.transformations.length - 1; t >= 0; t--) thing = this.transformations[t].ylppa(thing);
        return thing;
    }

    shapeToWorld = thing => {
        if (thing.start && thing.direction) return new Ray(this.shapeToWorld(thing.start), this.shapeToWorld(thing.direction))
        for (var t = 0; t < this.transformations.length; t++) thing = this.transformations[t].apply(thing);
        return thing;
    }

    getColorAt = (point, ray, scene, depth) => {
        point = this.worldToShape(point);
        let materialColor = this.texture.getColorAt(point);
        let colorToReturn = materialColor.scale(this.texture.finish.ambient);
        let normal = this.getNormalAt(point);
        let reflex = this.reflect(ray.direction, normal);

        let reflectionAmount = this.texture.finish.reflection;
        if (reflectionAmount) {
            let reflectionRay = new Ray(point, reflex);
            let reflectedColor = reflectionRay.trace(scene, depth);
            colorToReturn = colorToReturn.add(reflectedColor.scale(reflectionAmount));
        }

        let otherShapes = scene.shapes.filter(s => s != this);
        scene.lights.forEach(light => {
            let lightDirection = light.position.add(point.invert());
            let brightness = normal.dot(lightDirection.normalize());
            if (brightness > 0) {
                // Trace a ray from this point to the light source. 
                // If that ray hits a shape before it hits the light, then we're in shadow
                let shadowRay = new Ray(point, lightDirection);
                let distanceToLight = lightDirection.length;
                let shadow = otherShapes.some(shape => shape.closestPointAlongRay(shadowRay).length <= distanceToLight);
                if (!shadow) {
                    let illumination = materialColor.multiply(light.color).scale(brightness * this.texture.finish.diffuse);
                    colorToReturn = colorToReturn.add(illumination);

                    let specular = reflex.dot(lightDirection.normalize());
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
