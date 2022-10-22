import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paint(x, y, width, height, color) {  
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, width, height);
}

let scene = ExampleScenes.ColoredSpheresWithLight();
renderer.render(scene, paint);
