import { Color } from "./color.js";

/** A shape's appearance is a combination of the material it's made from and the finish applied to it. */
export class Appearance {

    constructor(material, finish) {
        this.material = material ?? Color.Grey;
        this.finish = finish ?? Finish.Default;
    }

    getColorAt = point => this.material.getColorAt(point);
}
