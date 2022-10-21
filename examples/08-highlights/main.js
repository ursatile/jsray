import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paint(x, y, color) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, 1, 1);
}

function render() {
    let scene = ExampleScenes.AssortedFinishes();
    renderer.render(scene, paint);
};

render();

function renderLightsDemo() {
    let scene = ExampleScenes.ColoredLights()
    renderer.render(scene, paint);
}

document.getElementById('render-finish-demo').addEventListener("click", render);
document.getElementById('render-lights-demo').addEventListener("click", renderLightsDemo);

