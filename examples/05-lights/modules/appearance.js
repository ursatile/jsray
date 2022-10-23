/** A shape's Appearance is the material it's made from */
export class Appearance {
    constructor(material) {
        this.material = material;
    }

    getColorAt = point => this.material.getColorAt(point);
}
