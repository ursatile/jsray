export class Ray {
    /** Construct a new ray starting from the specified start 
     * point, and pointing in the specified direction */
    constructor(start, direction) {
        this.start = start;
        this.direction = direction.unit();
    }
    /** Trace this ray through the specified scene, and return the resulting color. */
    trace = (scene) => scene.background;

    toString = () => `ray: <${this.start.toString()}> => <${this.direction.toString()}>`;
}