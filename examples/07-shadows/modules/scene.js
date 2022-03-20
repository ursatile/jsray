import { Color } from './material.js';

export class Scene {
    constructor(camera, shapes, lights, background) {
        this.camera = camera;
        this.shapes = shapes ?? [];
        this.lights = lights ?? [];
        this.background = background ?? Color.Black;
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}
