import { Camera, Scene, Vector, Color } from '../modules/renderer.js';
import { Sphere } from '../modules/shapes/sphere.js';
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