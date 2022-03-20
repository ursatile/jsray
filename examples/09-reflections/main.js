import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';
import { Plane } from './modules/shapes/plane.js';
import { Box } from './modules/shapes/box.js';
import { Light } from './modules/light.js';
import { Finish } from './modules/finish.js';
import { Texture } from './modules/texture.js';

let camera = new Camera(new Vector(-5, 5, -9), new Vector(0, 2, 0), 2, 1.5);
let background = new Color(0, 0, 0);
let lights = [
  new Light(new Vector(-12, 10, -6), Color.White)
];
let shapes = [
  new Plane(Vector.Y, 0, new Texture(Color.Gray50, new Finish({ reflection: 0.5, ambient: 0.1, diffuse: 0.7 }))),
  new Box(new Vector(5, 0, 5), new Vector(1, 4, 3), new Texture(new Color("#09f"), new Finish({ reflection: 0.5, ambient: 0.1, diffuse: 0.7 }))),
  new Sphere(new Vector(3, 1, 0), 1, new Texture(new Color("#0c3"), new Finish({ reflection: 0.5, ambient: 0.1, diffuse: 0.7, specular: 0.5 }))),
  new Sphere(new Vector(3, 0.5, -2), 0.5, new Texture(new Color("#00f"), new Finish({ reflection: 0.5, ambient: 0.1, diffuse: 0.7, specular: 0.5 }))),
  new Sphere(new Vector(-1, 1, 2), 1, new Texture(new Color("#f00"), new Finish({ reflection: 0.5, ambient: 0.1, diffuse: 0.7, specular: 0.5 }))),
  new Sphere(new Vector(-2, 2, 5), 2, new Texture(new Color("#fc0"), new Finish({ reflection: 0.5, ambient: 0.1, diffuse: 0.7, specular: 0.5 }))),
];

let scene = new Scene(camera, shapes, lights, background);
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);
tracer.trace(scene, (x, y, color, step) => {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, step, step);
});
