import { Color } from './color.js'; 

export class Finish {
    static Default = new Finish();

    constructor(options = {}) {
        this.ambient = options.ambient ?? 0.1;
        this.diffuse = options.diffuse ?? 0.7;
        this.shiny = options.shiny ?? 0;
        this.reflection = options.reflection ?? 0;
    }

    addHighlight = (reflex, light, lightVector) => {
        if (! this.shiny) return Color.Black;
        let intensity = reflex.dot(lightVector.unit());
        if (intensity <= 0) return Color.Black;
        let exponent = 32 * this.shiny * this.shiny;
        intensity = Math.pow(intensity, exponent);
        return light.color.scale(this.shiny * intensity);
    }    
}

