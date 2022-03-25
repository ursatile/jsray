import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);

function paint(x, y, width, height, color) {
    var rgb = `rgb(${color.r},${color.g},${color.b})`;
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, width, height);
}

function render() {
    let scene = ExampleScenes.AssortedFinishes();
    tracer.trace(scene, paint);
};
render();

function renderLightsDemo() {
    let scene = ExampleScenes.ColoredLights()
    tracer.trace(scene, paint);
}

document.getElementById('render-finish-demo').addEventListener("click", render);
document.getElementById('render-lights-demo').addEventListener("click", renderLightsDemo);

