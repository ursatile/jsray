import { Color } from "./color.js";

/** A shape's Appearance is the material it's made from */
export class Appearance {

    constructor(material, finish) {
        this.material = material ?? Color.Grey;
    }

    getColorAt = point => this.material.getColorAt(point);
}
