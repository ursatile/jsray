import { Color } from './color.js';

export class Scene {
    constructor(camera, background, shapes, lights) {
        this.camera = camera;
        this.background = background ?? Color.Black;
        this.shapes = shapes ?? [];
        this.lights = lights ?? [];
    }
    trace = (x, y) => this.camera.trace(this, x, y);
}
