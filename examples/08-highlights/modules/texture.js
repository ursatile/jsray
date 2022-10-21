import { Color } from "./color.js";

export class Texture {
    constructor(material, finish) {
        this.material = material;
        this.finish = finish;
    }

    getColorAt = point => this.material.getColorAt(point);
    getAmbientColorAt = point =>  this.getColorAt(point).scale(this.finish.ambient);

    illuminate = (point, light, brightness) => 
        this.getColorAt(point)
            .multiply(light.color)
            .scale(brightness * this.finish.diffuse);

    highlights = (reflex, light, lightVector) => {
        if (this.finish.specular == 0) return Color.Black;
        let intensity = reflex.dot(lightVector.normalize());
        if (intensity <= 0) return Color.Black;
        let exponent = 100 * this.finish.specular * this.finish.specular;
        intensity = Math.pow(intensity, exponent);
        return light.color.scale(this.finish.specular * intensity);
    }    
}

export class Finish {
    static Default = new Finish();

    constructor(options = {}) {
        this.ambient = options.ambient ?? 0.1;
        this.diffuse = options.diffuse ?? 0.7;
        this.specular = options.specular ?? 0;
    }
}