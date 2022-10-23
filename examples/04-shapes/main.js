import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paintPixel(x, y, color) {  
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

let scene = ExampleScenes.ColoredSpheres();
renderer.render(scene, paintPixel);
