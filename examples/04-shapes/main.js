import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';

let camera = new Camera(new Vector(0, 2, -3), new Vector(0, 1, 0));
let background = new Color(0, 0, 0);
let shapes = [
  new Sphere(new Vector(0, 1, 0), 1, new Color("#fff")),
  new Sphere(new Vector(2, 1, 2), 1, new Color("#0f0")),
  new Sphere(new Vector(4, 1, 4), 1, new Color("#00f")),
  new Sphere(new Vector(-2, 1, 2), 1, new Color("#f00")),
  new Sphere(new Vector(-4, 1, 4), 1, new Color("#fc0")),
];

let scene = new Scene(camera, shapes, background);
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);
tracer.trace(scene, (x, y, color, step) => {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, step, step);
});
