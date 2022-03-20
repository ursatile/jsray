import { Color } from './material.js';

export class Scene {
    constructor(camera, shapes, background) {
        this.camera = camera;
        this.shapes = shapes ?? [];
        this.background = background ?? Color.Black;
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}
