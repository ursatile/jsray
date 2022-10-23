import { Camera, Scene, Vector, Color } from '../modules/renderer.js';
import { Sphere } from '../modules/shapes/sphere.js';
import { Plane } from '../modules/shapes/plane.js';
import { Box } from '../modules/shapes/box.js';
import { Light } from '../modules/light.js';
import { Appearance } from '../modules/appearance.js';
import { Finish } from '../modules/finish.js'; 

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

export function AssortedShapes(reflection = 0.5) {    
    let camera = new Camera(new Vector(-5, 3.5, -9), new Vector(0, 2, 0), 2, 1.5);
    let background = new Color(0, 0, 0);
    let lights = [new Light(new Vector(-12, 9, -6), Color.White)];
    let finish = new Finish({reflection: reflection});
    let shapes = [
        new Plane(Vector.Y, 0, new Appearance(Color.White)),
        new Box(new Vector(-1, 0, -1), new Vector(1, 2, 1), new Appearance(Color.Red, finish)),
        new Sphere(new Vector(3, 1, 0), 1, new Appearance(Color.Magenta, finish)),
        new Sphere(new Vector(3, 0.5, -2), 0.5, new Appearance(Color.Yellow, finish)),
        new Sphere(new Vector(-1, 1, 2), 1, new Appearance(Color.Green, new Finish({shiny: 0.8, reflection: reflection}))),
        new Sphere(new Vector(-2, 2, 5), 2, new Appearance(Color.Blue, new Finish({shiny: 0.5, reflection: reflection}))),
    ];
    return new Scene(camera, background, shapes, lights);
}

const RADIUS = 0.9;
const SPACING = 2.2;

export function AssortedFinishes() {
    let camera = new Camera(new Vector(0, 20, 0), new Vector(0, 0, 0), 1, 0.75);
    let background = new Color(0, 0, 0);
    let lights = [new Light(new Vector(10, 20, 20), Color.White)];
    let color = new Color(120, 180, 240);
    let shapes = [
        new Sphere(new Vector(-SPACING * 1.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 1, diffuse: 0, shiny: 0 }))),
        new Sphere(new Vector(-SPACING * 0.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.6, diffuse: 0.3, shiny: 0 }))),
        new Sphere(new Vector(SPACING * 0.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.3, diffuse: 0.6, shiny: 0 }))),
        new Sphere(new Vector(SPACING * 1.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0, diffuse: 1, shiny: 0 }))),

        new Sphere(new Vector(-SPACING * 1.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 1, diffuse: 0, shiny: 0.5 }))),
        new Sphere(new Vector(-SPACING * 0.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 0.6, diffuse: 0.3, shiny: 0.5 }))),
        new Sphere(new Vector(SPACING * 0.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 0.3, diffuse: 0.6, shiny: 0.5 }))),
        new Sphere(new Vector(SPACING * 1.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 0, diffuse: 1, shiny: 0.5 }))),

        new Sphere(new Vector(-SPACING * 1.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 1, diffuse: 0, shiny: 1 }))),
        new Sphere(new Vector(-SPACING * 0.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.6, diffuse: 0.3, shiny: 1 }))),
        new Sphere(new Vector(SPACING * 0.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.3, diffuse: 0.6, shiny: 1 }))),
        new Sphere(new Vector(SPACING * 1.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0, diffuse: 1, shiny: 1 }))),
    ];
    return new Scene(camera, background, shapes, lights);
}

export function ColoredLights() {
    let camera = new Camera(new Vector(0, 20, 0), new Vector(0, 0, 0), 1, 0.75);
    let background = new Color(0, 0, 0);
    let lights = [
        new Light(new Vector(-17, 20, 10), new Color(150, 20, 20)),
        new Light(new Vector(0, 20, -20), new Color(20, 150, 20)),
        new Light(new Vector(17, 20, 10), new Color(20, 20, 150)),
    ];
    let color = new Color(200, 200, 200);
    let shapes = [
        new Sphere(new Vector(-SPACING * 1.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 1, diffuse: 0, shiny: 0 }))),
        new Sphere(new Vector(-SPACING * 0.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.6, diffuse: 0.3, shiny: 0 }))),
        new Sphere(new Vector(SPACING * 0.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.3, diffuse: 0.6, shiny: 0 }))),
        new Sphere(new Vector(SPACING * 1.5, 1, SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0, diffuse: 1, shiny: 0 }))),

        new Sphere(new Vector(-SPACING * 1.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 1, diffuse: 0, shiny: 0.5 }))),
        new Sphere(new Vector(-SPACING * 0.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 0.6, diffuse: 0.3, shiny: 0.5 }))),
        new Sphere(new Vector(SPACING * 0.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 0.3, diffuse: 0.6, shiny: 0.5 }))),
        new Sphere(new Vector(SPACING * 1.5, 1, 0), RADIUS, new Appearance(color, new Finish({ ambient: 0, diffuse: 1, shiny: 0.5 }))),

        new Sphere(new Vector(-SPACING * 1.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 1, diffuse: 0, shiny: 1 }))),
        new Sphere(new Vector(-SPACING * 0.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.6, diffuse: 0.3, shiny: 1 }))),
        new Sphere(new Vector(SPACING * 0.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0.3, diffuse: 0.6, shiny: 1 }))),
        new Sphere(new Vector(SPACING * 1.5, 1, -SPACING), RADIUS, new Appearance(color, new Finish({ ambient: 0, diffuse: 1, shiny: 1 }))),
    ];
    return new Scene(camera, background, shapes, lights);
}
