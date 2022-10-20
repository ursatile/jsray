import { Renderer, Camera, Scene, Vector, Color } from './modules/renderer.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paint(x, y, color) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, 1, 1);
}

let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
let background = new Color(120, 150, 255);
let scene = new Scene(camera, background);
renderer.render(scene, paint);
