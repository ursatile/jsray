import { Color } from './color.js';

export class Scene {
    constructor(camera, background, shapes, lights) {
        this.camera = camera;
        this.shapes = shapes ?? [];
        this.lights = lights ?? [];
        this.background = background ?? Color.Black;
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}
