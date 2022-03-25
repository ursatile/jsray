import { Camera, Scene, Vector, Color } from '../modules/tracer.js';
import { Sphere } from '../modules/shapes/sphere.js';
import { Plane } from '../modules/shapes/plane.js';
import { Box } from '../modules/shapes/box.js';
import { Light } from '../modules/light.js';

export function EmptySky() {
    let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
    let background = new Color(120, 150, 255);
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

export function ColoredSpheresWithLight() {
    let scene = ColoredSpheres();
    scene.lights = [new Light(new Vector(5, 10, -5), Color.White)];
    return scene;
}

export function AssortedShapes() {
    let camera = new Camera(new Vector(-5, 4, -9), new Vector(0, 2, 0), 2, 1.5);
    let background = new Color(0, 0, 0);
    let lights = [new Light(new Vector(-12, 6, -6), Color.White)];
    let shapes = [
        new Plane(Vector.Y, 0, Color.Gray50),
        new Box(new Vector(-1, 0, -1), new Vector(1, 2, 1), new Color("#09f")),
        new Sphere(new Vector(3, 1, 0), 1, new Color("#0f0")),
        new Sphere(new Vector(3, 0.5, -2), 0.5, new Color("#00f")),
        new Sphere(new Vector(-1, 1, 2), 1, new Color("#f00")),
        new Sphere(new Vector(-2, 2, 5), 2, new Color("#fc0")),
    ];
    return new Scene(camera, background, shapes, lights);
}