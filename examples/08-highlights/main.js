import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';
import { Plane } from './modules/shapes/plane.js';
import { Box } from './modules/shapes/box.js';
import { Light } from './modules/light.js';

let camera = new Camera(new Vector(-5, 4, -9), new Vector(0, 2, 0), 2, 1.5);
let background = new Color(0, 0, 0);
let lights = [
  new Light(new Vector(-18, 22, -6), Color.White)
];
let shapes = [
  new Plane(Vector.Y, 0, Color.Gray50),
  new Box(new Vector(-1, 0, -1), new Vector(1, 2, 1), new Color("#09f")),
  new Sphere(new Vector(3, 1, 0), 1, new Color("#0f0")),
  new Sphere(new Vector(3, 0.5, -2), 0.5, new Color("#00f")),
  new Sphere(new Vector(-1, 1, 2), 1, new Color("#f00")),
  new Sphere(new Vector(-2, 2, 5), 2, new Color("#fc0")),
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
