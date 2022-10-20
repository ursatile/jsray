import { Camera, Scene, Vector, Color } from '../modules/renderer.js';
import { Sphere } from '../modules/shapes/sphere.js';

export function EmptySky() {
    let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
    let background = new Color(0, 0, 25);
    return new Scene(camera, background);
}

export function ColoredSpheres() {
    let camera = new Camera(new Vector(0, 2, -3), new Vector(0, 1, 0));
    let background = new Color(0, 0, 0);
    let shapes = [
        new Sphere(new Vector(0, 1, 0), 1, new Color("#fff")),
        new Sphere(new Vector(2, 1, 2), 1, new Color("#0f0")),
        new Sphere(new Vector(4, 1, 4), 1, new Color("#00f")),
        new Sphere(new Vector(-2, 1, 2), 1, new Color("#f00")),
        new Sphere(new Vector(-4, 1, 4), 1, new Color("#fc0")),
    ];
    return new Scene(camera, background, shapes);
}