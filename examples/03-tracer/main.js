import { Renderer, Camera, Scene, Vector, Color } from './modules/renderer.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paintPixel(x, y, color) {  
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

let camera = new Camera(new Vector(-4, 1, -5), Vector.O);
let background = Color.Blue;
let scene = new Scene(camera, background);
renderer.render(scene, paintPixel);
