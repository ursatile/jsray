import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';
import { Light } from './modules/light.js';

let camera = new Camera(new Vector(-2, 1, -2), new Vector(0, 1, 0));
let background = new Color(0, 0, 0);
let lights = [
  new Light(new Vector(-5, 5, -10), Color.White)
];
let shapes = [
  new Sphere(new Vector(1, 2, -1), 0.2, Color.White),
  new Sphere(new Vector(0, 1, 0), 1, new Color("#f00")),
  new Sphere(new Vector(2, 1, 0), 1, new Color("#0f0")),
  new Sphere(new Vector(4, 1, 0), 1, new Color("#00f"))
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
