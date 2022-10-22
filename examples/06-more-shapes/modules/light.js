export class Light {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }

    /** When the specified light hits the specified material with the specified brightness,
    * what color do we need to add to the result? */
    illuminate = (material, point, brightness) => 
         material.getColorAt(point).multiply(this.color).scale(brightness);
}