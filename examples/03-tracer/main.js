import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';

let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
let background = new Color(120, 150, 255);
let scene = new Scene(camera, background);
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);
tracer.trace(scene, (x, y, color, step) => {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, step, step);
});