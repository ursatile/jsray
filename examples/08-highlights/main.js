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

export function render() {
  let scene = ExampleScenes.AssortedFinishes();
  tracer.trace(scene, callback);
};
render();

export function renderLightsDemo() {
  let scene = ExampleScenes.ColoredLights()
  tracer.trace(scene, callback);
}

document.getElementById('render-finish-demo').addEventListener("click", renderFinishDemo);
document.getElementById('render-lights-demo').addEventListener("click", renderLightsDemo);

