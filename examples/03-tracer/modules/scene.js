export class Scene {
    constructor(camera, background) {
        this.camera = camera;
        this.background = background;
    }
    trace = (x, y) => this.camera.trace(this, x, y).clip();
}
