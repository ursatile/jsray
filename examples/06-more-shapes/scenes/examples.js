import { Camera, Scene, Vector, Color } from '../modules/renderer.js';
import { Sphere } from '../modules/shapes/sphere.js';
import { Plane } from '../modules/shapes/plane.js';
import { Box } from '../modules/shapes/box.js';
import { Light } from '../modules/light.js';
import { Appearance } from '../modules/appearance.js';

export function EmptySky() {
    let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
    let background = new Color(120, 150, 255);
    return new Scene(camera, background);
}

export function ColoredSpheres() {
    let camera = new Camera(new Vector(0, 1, -3), Vector.O);
    let background = Color.Black;
    let shapes = [
        new Sphere(Vector.O, 1, new Appearance(Color.White)),
        new Sphere(new Vector(2, 0, 2), 1, new Appearance(Color.Green)),
        new Sphere(new Vector(4, 0, 4), 1, new Appearance(Color.Blue)),
        new Sphere(new Vector(-2, 0, 2), 1, new Appearance(Color.Red)),
        new Sphere(new Vector(-4, 0, 4), 1, new Appearance(Color.Yellow)),
    ];
    let lights = [ new Light(new Vector(5, 10, -5), Color.White) ]; 
    return new Scene(camera, background, shapes, lights);
}

export function AssortedShapes() {
    let camera = new Camera(new Vector(-5, 3.5, -9), new Vector(0, 2, 0), 2, 1.5);
    let background = new Color(0, 0, 0);
    let lights = [new Light(new Vector(-12, 6, -6), Color.White)];
    let shapes = [
        new Plane(Vector.Y, 0, new Appearance(Color.White)),
        new Box(new Vector(-1, 0, -1), new Vector(1, 2, 1), new Appearance(Color.Red)),
        new Sphere(new Vector(3, 1, 0), 1, new Appearance(Color.Magenta)),
        new Sphere(new Vector(3, 0.5, -2), 0.5, new Appearance(Color.Yellow)),
        new Sphere(new Vector(-1, 1, 2), 1, new Appearance(Color.Green)),
        new Sphere(new Vector(-2, 2, 5), 2, new Appearance(Color.Blue)),
    ];
    return new Scene(camera, background, shapes, lights);
}