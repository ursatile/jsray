import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);

function callback(x, y, color, step) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, step, step);
}

export function render(reflection = 0.5, step = 1) {
  let scene = ExampleScenes.ReflectingShapes(reflection);
  tracer.trace(scene, callback, step);
};
render();